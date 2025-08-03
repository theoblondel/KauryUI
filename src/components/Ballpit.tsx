import { useRef, useEffect } from 'react';
import {
  Clock,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  SRGBColorSpace,
  MathUtils,
  Vector2,
  Vector3,
  MeshPhysicalMaterial,
  ShaderChunk,
  Color,
  Object3D,
  InstancedMesh,
  PMREMGenerator,
  SphereGeometry,
  AmbientLight,
  PointLight,
  ACESFilmicToneMapping,
  Raycaster,
  Plane,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

class Ball {
  constructor(position, velocity, radius, color) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.color = color;
    this.mass = radius * radius;
  }

  update(gravity, friction, bounds) {
    // Apply gravity
    this.velocity.y -= gravity;
    
    // Apply friction
    this.velocity.multiplyScalar(friction);
    
    // Update position
    this.position.add(this.velocity);
    
    // Bounce off walls
    if (this.position.x - this.radius < bounds.left) {
      this.position.x = bounds.left + this.radius;
      this.velocity.x *= -0.8;
    }
    if (this.position.x + this.radius > bounds.right) {
      this.position.x = bounds.right - this.radius;
      this.velocity.x *= -0.8;
    }
    if (this.position.y - this.radius < bounds.bottom) {
      this.position.y = bounds.bottom + this.radius;
      this.velocity.y *= -0.8;
    }
    if (this.position.y + this.radius > bounds.top) {
      this.position.y = bounds.top - this.radius;
      this.velocity.y *= -0.8;
    }
  }
}

class BallPhysics {
  constructor(count = 100) {
    this.balls = [];
    this.bounds = { left: -10, right: 10, bottom: -10, top: 10 };
    
    // Create balls
    for (let i = 0; i < count; i++) {
      const position = new Vector3(
        MathUtils.randFloat(this.bounds.left + 1, this.bounds.right - 1),
        MathUtils.randFloat(this.bounds.bottom + 1, this.bounds.top - 1),
        0
      );
      const velocity = new Vector3(
        MathUtils.randFloat(-0.1, 0.1),
        MathUtils.randFloat(-0.1, 0.1),
        0
      );
      const radius = MathUtils.randFloat(0.1, 0.3);
      const color = new Color().setHSL(0, 0, Math.random() * 0.5 + 0.3);
      
      this.balls.push(new Ball(position, velocity, radius, color));
    }
  }

  update(gravity, friction, wallBounce, mousePosition) {
    // Update each ball
    this.balls.forEach(ball => {
      ball.update(gravity * 0.01, friction, this.bounds);
      
      // Mouse interaction
      if (mousePosition) {
        const distance = ball.position.distanceTo(mousePosition);
        if (distance < 2) {
          const force = new Vector3()
            .subVectors(ball.position, mousePosition)
            .normalize()
            .multiplyScalar(0.1);
          ball.velocity.add(force);
        }
      }
    });

    // Ball-to-ball collisions
    for (let i = 0; i < this.balls.length; i++) {
      for (let j = i + 1; j < this.balls.length; j++) {
        const ball1 = this.balls[i];
        const ball2 = this.balls[j];
        const distance = ball1.position.distanceTo(ball2.position);
        const minDistance = ball1.radius + ball2.radius;

        if (distance < minDistance) {
          // Separate balls
          const overlap = minDistance - distance;
          const direction = new Vector3()
            .subVectors(ball1.position, ball2.position)
            .normalize();
          
          ball1.position.add(direction.clone().multiplyScalar(overlap * 0.5));
          ball2.position.sub(direction.clone().multiplyScalar(overlap * 0.5));

          // Exchange velocities (simplified collision)
          const tempVel = ball1.velocity.clone();
          ball1.velocity.copy(ball2.velocity);
          ball2.velocity.copy(tempVel);
        }
      }
    }
  }
}

interface BallpitProps {
  count?: number;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  followCursor?: boolean;
}

const Ballpit: React.FC<BallpitProps> = ({
  count = 100,
  gravity = 0.7,
  friction = 0.98,
  wallBounce = 0.8,
  followCursor = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<Scene>();
  const rendererRef = useRef<WebGLRenderer>();
  const cameraRef = useRef<PerspectiveCamera>();
  const ballsRef = useRef<InstancedMesh>();
  const physicsRef = useRef<BallPhysics>();
  const mouseRef = useRef<Vector3>(new Vector3());
  const clockRef = useRef<Clock>(new Clock());

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 15;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    rendererRef.current = renderer;

    containerRef.current.appendChild(renderer.domElement);

    // Environment
    const pmremGenerator = new PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

    // Lighting
    const ambientLight = new AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Physics
    const physics = new BallPhysics(count);
    physicsRef.current = physics;

    // Instanced mesh for balls
    const geometry = new SphereGeometry(1, 16, 16);
    const material = new MeshPhysicalMaterial({
      roughness: 0.1,
      metalness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });

    const instancedMesh = new InstancedMesh(geometry, material, count);
    ballsRef.current = instancedMesh;
    scene.add(instancedMesh);

    // Mouse interaction
    const raycaster = new Raycaster();
    const mouse = new Vector2();
    const plane = new Plane(new Vector3(0, 0, 1), 0);

    const handleMouseMove = (event: MouseEvent) => {
      if (!followCursor) return;

      const rect = containerRef.current!.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersectPoint = new Vector3();
      raycaster.ray.intersectPlane(plane, intersectPoint);
      mouseRef.current.copy(intersectPoint);
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      const deltaTime = clockRef.current.getDelta();

      // Update physics
      physics.update(
        gravity,
        friction,
        wallBounce,
        followCursor ? mouseRef.current : null
      );

      // Update instanced mesh
      const dummy = new Object3D();
      physics.balls.forEach((ball, i) => {
        dummy.position.copy(ball.position);
        dummy.scale.setScalar(ball.radius);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
        instancedMesh.setColorAt(i, ball.color);
      });
      instancedMesh.instanceMatrix.needsUpdate = true;
      if (instancedMesh.instanceColor) {
        instancedMesh.instanceColor.needsUpdate = true;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      pmremGenerator.dispose();
    };
  }, [count, gravity, friction, wallBounce, followCursor]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default Ballpit;