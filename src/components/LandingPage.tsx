import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, Code, Palette, MousePointer, Download, Users, Shield, Rocket, Star, Heart, Github, CheckCircle, MessageSquare, HelpCircle, ChevronDown, ChevronUp, FileText, ShoppingCart, Calendar, UserPlus, BarChart3, Globe, Clock, Smartphone, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import MagicBento from './MagicBento';
import ShinyText from './ShinyText';
import BlurText from './BlurText';
import CountUp from './CountUp';
import Ballpit from './Ballpit';
import DarkVeil from './DarkVeil';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const { t, i18n } = useTranslation();
  const containerRef = React.useRef(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const steps = [
    {
      icon: MousePointer,
      title: t('howItWorks.steps.dragDrop.title'),
      description: t('howItWorks.steps.dragDrop.description'),
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: Palette,
      title: t('howItWorks.steps.customize.title'),
      description: t('howItWorks.steps.customize.description'),
      color: "from-purple-600 to-violet-600"
    },
    {
      icon: Code,
      title: t('howItWorks.steps.export.title'),
      description: t('howItWorks.steps.export.description'),
      color: "from-green-600 to-emerald-600"
    },
    {
      icon: Rocket,
      title: t('howItWorks.steps.deploy.title'),
      description: t('howItWorks.steps.deploy.description'),
      color: "from-orange-600 to-red-600"
    }
  ];

  const features = [
    {
      icon: Zap,
      title: t('features.ultraFast.title'),
      description: t('features.ultraFast.description'),
      details: t('features.ultraFast.details', { returnObjects: true }) as string[]
    },
    {
      icon: Shield,
      title: t('features.secure.title'),
      description: t('features.secure.description'),
      details: t('features.secure.details', { returnObjects: true }) as string[]
    },
    {
      icon: Users,
      title: t('features.collaboration.title'),
      description: t('features.collaboration.description'),
      details: t('features.collaboration.details', { returnObjects: true }) as string[]
    },
    {
      icon: Star,
      title: t('features.openSource.title'),
      description: t('features.openSource.description'),
      details: t('features.openSource.details', { returnObjects: true }) as string[]
    }
  ];

  const useCases = [
    {
      icon: FileText,
      title: t('useCases.contact.title'),
      description: t('useCases.contact.description'),
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: ShoppingCart,
      title: t('useCases.ecommerce.title'),
      description: t('useCases.ecommerce.description'),
      color: "from-green-600 to-emerald-600"
    },
    {
      icon: Calendar,
      title: t('useCases.events.title'),
      description: t('useCases.events.description'),
      color: "from-purple-600 to-violet-600"
    },
    {
      icon: BarChart3,
      title: t('useCases.surveys.title'),
      description: t('useCases.surveys.description'),
      color: "from-orange-600 to-red-600"
    },
    {
      icon: UserPlus,
      title: t('useCases.registration.title'),
      description: t('useCases.registration.description'),
      color: "from-indigo-600 to-blue-600"
    },
    {
      icon: Globe,
      title: t('useCases.multilingual.title'),
      description: t('useCases.multilingual.description'),
      color: "from-teal-600 to-cyan-600"
    }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Lead Developer at TechCorp",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "KauryUI revolutionized our form creation process. What used to take days now only takes a few hours! The drag & drop interface is intuitive and the generated code is of exceptional quality."
    },
    {
      name: "Thomas Martin",
      role: "Freelance Full-Stack Developer",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "As a freelancer, KauryUI saves me valuable time. My clients love the speed of delivery and the quality of the forms. It has become an indispensable tool in my daily workflow."
    },
    {
      name: "Sophie Laurent",
      role: "UX Designer at StartupXYZ",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "Finally a tool that allows designers to create forms without depending on developers! The interface is beautiful and the customization possibilities are endless. A real game-changer!"
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Enhanced Fixed Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-2xl border-b border-white/10 shadow-md"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div>
                <motion.h1 
                  className="text-3xl font-bold text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  KauryUI
                </motion.h1>
                <motion.p 
                  className="text-sm text-gray-400 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Form Builder Pro
                </motion.p>
              </div>
            </motion.div>
            
            {/* Enhanced Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { name: t('header.nav.howItWorks'), href: '#how-it-works' },
                { name: t('header.nav.useCases'), href: '#use-cases' },
                { name: t('header.nav.features'), href: '#features' },
                { name: t('header.nav.testimonials'), href: '#testimonials' },
                { name: t('header.nav.faq'), href: '#faq' },
                { name: t('header.nav.support'), href: '#support' }
              ].map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors relative group font-medium text-sm"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -2, scale: 1.05 }}
                >
                  {item.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-white to-gray-300 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
              {/* Language Selector */}
            </nav>

            {/* Enhanced CTA Button */}
            <motion.button
              onClick={onGetStarted}
              className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-gray-200 transition-all duration-300 shadow-xl border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('header.getStarted')}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Enhanced Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-8 relative" ref={containerRef}>
        {/* DarkVeil Background */}
        <div className="absolute inset-0 z-0">
          <DarkVeil />
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">

            {/* Enhanced Main Title with VariableProximity */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
              className="mb-10"
            >
              <BlurText
                text={t('hero.title')}
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white"
                delay={150}
                animateBy="words"
                direction="top"
              />
            </motion.div>

            {/* Enhanced Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
              className="mb-16"
            >
              <ShinyText
                text={t('hero.subtitle')}
                className="text-2xl md:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed block"
                speed={3}
              />
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            >
              <motion.button
                onClick={onGetStarted}
                className="group flex items-center space-x-4 bg-white text-black px-16 py-8 rounded-full font-bold text-2xl hover:bg-gray-200 transition-all duration-300 shadow-strong border border-white/20"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{t('hero.getStartedFree')}</span>
                <motion.div
                  className="group-hover:translate-x-2 transition-transform duration-300"
                  whileHover={{ rotate: 45 }}
                >
                  <ArrowRight className="w-7 h-7" />
                </motion.div>
              </motion.button>
              
              <motion.button 
                className="flex items-center space-x-4 border-2 border-white/30 text-white px-16 py-8 rounded-full font-bold text-2xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                onClick={onGetStarted}
                whileHover={{ scale: 1.05, y: -3, borderColor: "rgba(255,255,255,0.6)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Code className="w-7 h-7" />
                <span>{t('hero.seeDemo')}</span>
              </motion.button>
            </motion.div>

            {/* Enhanced Features Grid */}
            <motion.div
              className="max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
            >
              <MagicBento
                textAutoHide={true}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                spotlightRadius={300}
                particleCount={15}
                glowColor="255, 255, 255"
              />
            </motion.div>
          </div>
      </section>

        {/* Enhanced How It Works Section */}
        <motion.section 
          id="how-it-works"
          className="py-32 px-6 md:px-8 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-24"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {t('howItWorks.title')}
              </h2>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {t('howItWorks.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    className="text-center group relative"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    whileHover={{ y: -15, scale: 1.02 }}
                  >
                    <motion.div 
                      className="w-28 h-28 bg-gradient-to-br from-gray-700 to-gray-900 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:shadow-2xl transition-all duration-500 relative overflow-hidden border border-white/10"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0, rotate: 45 }}
                        whileHover={{ scale: 1.5, rotate: 0 }}
                        transition={{ duration: 0.6 }}
                      />
                      <Icon className="w-14 h-14 text-white relative z-10" />
                    </motion.div>
                    <motion.div
                      className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-xl"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.2 + 0.5, type: "spring", stiffness: 300 }}
                      viewport={{ once: true }}
                    >
                      {index + 1}
                    </motion.div>
                    <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-gray-200 transition-colors">{step.title}</h3>
                    <p className="text-gray-300 leading-relaxed text-lg group-hover:text-gray-200 transition-colors">{step.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* New Use Cases Section */}
        <motion.section 
          id="use-cases"
          className="py-32 px-6 md:px-8 bg-white/5 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-24"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {t('useCases.title')}
              </h2>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {t('useCases.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {useCases.map((useCase, index) => {
                const Icon = useCase.icon;
                return (
                  <motion.div
                    key={index}
                    className="group relative overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10, scale: 1.03 }}
                  >
                    <div className="bg-gradient-to-br from-gray-700 to-gray-900 p-10 rounded-3xl h-full relative overflow-hidden border border-white/10 shadow-2xl">
                      <motion.div
                        className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        initial={{ scale: 0, rotate: 45 }}
                        whileHover={{ scale: 1.5, rotate: 0 }}
                        transition={{ duration: 0.8 }}
                      />
                      <div className="relative z-10">
                        <motion.div
                          whileHover={{ rotate: 15, scale: 1.2 }}
                          transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                        >
                          <Icon className="w-16 h-16 text-white mb-8" />
                        </motion.div>
                        <h3 className="text-3xl font-bold text-white mb-6 group-hover:scale-105 transition-transform duration-300">{useCase.title}</h3>
                        <p className="text-white/90 leading-relaxed text-lg">{useCase.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Enhanced Features Section */}
        <motion.section 
          id="features"
          className="py-32 px-6 md:px-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-24"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {t('features.title')}
              </h2>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {t('features.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 hover:bg-white/10 transition-all duration-500 group relative overflow-hidden"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <motion.div
                      className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-20 translate-x-20 group-hover:scale-150 transition-transform duration-700"
                    />
                    <div className="relative z-10">
                      <motion.div 
                        className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-white/20 transition-all duration-500 border border-white/10"
                        whileHover={{ rotate: 15, scale: 1.15 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="w-12 h-12 text-white" />
                      </motion.div>
                      <h3 className="text-4xl font-bold mb-8 text-white group-hover:text-gray-200 transition-colors">{feature.title}</h3>
                      <p className="text-gray-300 leading-relaxed text-xl mb-8 group-hover:text-gray-200 transition-colors">{feature.description}</p>
                      <ul className="space-y-3">
                        {feature.details.map((detail, detailIndex) => (
                          <motion.li
                            key={detailIndex}
                            className="text-gray-400 text-base group-hover:text-gray-300 transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.2 + detailIndex * 0.1, ease: "easeOut" }}
                            viewport={{ once: true }}
                          >
                            {detail}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* New Testimonials Section */}
        <motion.section 
          id="témoignages"
          className="py-32 px-6 md:px-8 bg-white/5 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-24"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {t('testimonials.title')}
              </h2>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {t('testimonials.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:bg-white/10 transition-all duration-500 group relative overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.03 }}
                >
                  <motion.div
                    className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"
                  />
                  <div className="relative z-10">
                    <div className="flex items-center mb-8">
                      <motion.img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full mr-6 border-2 border-white/20"
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <div>
                        <h4 className="text-white font-bold text-xl mb-1">{testimonial.name}</h4>
                        <p className="text-gray-400 text-base">{testimonial.role}</p>
                      </div>
                    </div>
                    <motion.div
                      className="flex mb-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.2 + 0.4 + i * 0.1, type: "spring", stiffness: 300 }}
                          viewport={{ once: true }}
                        >
                          <Star className="w-6 h-6 text-gray-400 fill-gray-400" />
                        </motion.div>
                      ))}
                    </motion.div>
                    <p className="text-gray-300 leading-relaxed italic text-lg group-hover:text-gray-200 transition-colors">"{testimonial.quote}"</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* New FAQ Section */}
        <motion.section 
          id="faq"
          className="py-32 px-6 md:px-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-24"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {t('faq.title')}
              </h2>
              <p className="text-2xl text-gray-300 leading-relaxed">
                {t('faq.subtitle')}
              </p>
            </motion.div>

            <div className="space-y-6">
              {t('faq.questions', { returnObjects: true }).map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <motion.button
                    className="w-full p-8 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-300"
                    onClick={() => toggleFAQ(index)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span className="text-white font-semibold text-xl pr-6">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openFAQ === index ? 180 : 0 }}
                      transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                    >
                      <ChevronDown className="w-7 h-7 text-gray-400" />
                    </motion.div>
                  </motion.button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFAQ === index ? 'auto' : 0,
                      opacity: openFAQ === index ? 1 : 0
                    }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-8 pt-0 text-gray-300 leading-relaxed text-lg">
                      {faq.answer}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Enhanced Support Section */}
        <motion.section 
          id="soutenir"
          className="py-32 px-6 md:px-8 bg-white/5 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.15, rotate: 10 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
              >
                <Heart className="w-24 h-24 text-gray-400 mx-auto mb-10" />
              </motion.div>
              <h2 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {t('support.title')}
              </h2>
              <p className="text-2xl text-gray-300 mb-16 leading-relaxed">
                {t('support.subtitle')}
              </p>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-sm border border-gray-500/30 rounded-3xl p-16 mb-10"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                >
                  <CountUp 
                    to={12345} 
                    duration={2.5} 
                    separator=" " 
                    className="text-6xl font-bold text-gray-300" 
                  />
                </motion.div>
                <span className="text-4xl text-gray-400 ml-6">{t('support.formsCreated')}</span>
              </div>
              
              <p className="text-gray-300 mb-10 text-xl">
                {t('support.joinDevelopers')}
              </p>

              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <motion.button
                  onClick={() => window.open('https://buy.stripe.com/5kAaIo03wgAb2S4aEW', '_blank')}
                  className="flex items-center space-x-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white px-12 py-6 rounded-2xl hover:from-gray-800 hover:to-black transition-all duration-300 shadow-2xl font-bold text-xl"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <Heart className="w-7 h-7" />
                  <span>{t('support.donate')}</span>
                </motion.button>

                <motion.button
                  onClick={() => window.open('https://github.com/theoblondel/KauryUI', '_blank')}
                  className="flex items-center justify-center space-x-4 bg-gray-800 text-white px-12 py-6 rounded-2xl hover:bg-gray-700 transition-all duration-300 shadow-2xl font-bold text-xl border border-gray-600"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <Star className="w-7 h-7" />
                  <span>{t('support.starGithub')}</span>
                </motion.button>
              </div>

              <p className="text-sm text-gray-400 mt-8">
                {t('support.securePayment')}
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Enhanced Final CTA Section */}
        <motion.section 
          className="py-32 px-6 md:px-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl md:text-7xl font-bold mb-10 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {t('finalCta.title')}
              </h2>
              <p className="text-2xl text-gray-300 mb-16 leading-relaxed">
                {t('finalCta.subtitle')}
              </p>
              
              <motion.button
                onClick={onGetStarted}
                className="group flex items-center space-x-6 bg-white text-black px-20 py-10 rounded-full font-bold text-3xl hover:bg-gray-200 transition-all duration-300 shadow-strong mx-auto border border-white/20"
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <span>{t('finalCta.getStarted')}</span>
                <motion.div
                  className="group-hover:translate-x-3 transition-transform duration-300"
                  whileHover={{ rotate: 45 }}
                >
                  <ArrowRight className="w-10 h-10" />
                </motion.div>
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* Enhanced Footer */}
        <motion.footer 
          className="relative overflow-hidden min-h-[600px] py-24 px-6 md:px-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Ballpit Background */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: '600px', width: '100%' }}>
              <Ballpit
                count={150}
                gravity={0.5}
                friction={0.99}
                wallBounce={0.95}
                followCursor={true}
              />
            </div>
          </div>

          {/* Footer Content */}
          <div className="relative z-10 text-white max-w-6xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <motion.div 
                  className="flex items-center space-x-6 mb-8"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div>
                    <h3 className="font-bold text-white text-3xl">{t('header.title')} {t('header.subtitle')}</h3>
                    <p className="text-lg text-gray-300 font-medium">{t('footer.tagline')}</p>
                  </div>
                </motion.div>
                <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                  {t('footer.description')}
                </p>
              </div>

              {/* Product Links */}
              <div>
                <h4 className="font-bold text-white text-xl mb-6">{t('footer.product')}</h4>
                <ul className="space-y-4">
                  <li>
                    <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors text-lg">
                      {t('footer.howItWorks')}
                    </a>
                  </li>
                  <li>
                    <a href="#features" className="text-gray-300 hover:text-white transition-colors text-lg">
                      {t('footer.features')}
                    </a>
                  </li>
                  <li>
                    <a href="#use-cases" className="text-gray-300 hover:text-white transition-colors text-lg">
                      {t('footer.useCases')}
                    </a>
                  </li>
                  <li>
                    <button 
                      onClick={onGetStarted}
                      className="text-gray-300 hover:text-white transition-colors text-lg"
                    >
                      {t('footer.tryFree')}
                    </button>
                  </li>
                </ul>
              </div>

              {/* Resources Links */}
              <div>
                <h4 className="font-bold text-white text-xl mb-6">{t('footer.resources')}</h4>
                <ul className="space-y-4">
                  <li>
                    <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors text-lg">
                      {t('footer.testimonials')}
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="text-gray-300 hover:text-white transition-colors text-lg">
                      {t('footer.faq')}
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://github.com/theoblondel/KauryUI" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors text-lg"
                    >
                      {t('footer.documentation')}
                    </a>
                  </li>
                  <li>
                    <a href="#support" className="text-gray-300 hover:text-white transition-colors text-lg">
                      {t('footer.supportProject')}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="pt-8 border-t border-white/20">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-6 mb-6 md:mb-0">
                  <p className="text-gray-300 text-lg">
                    {t('footer.copyright')}
                  </p>
                </div>
                
                <div className="flex items-center space-x-8">
                  <p className="text-gray-300 text-lg">
                    {t('footer.createdBy')}{' '}
                    <motion.a 
                      href="https://theoblondel.ch/"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:underline font-semibold"
                      whileHover={{ scale: 1.05 }}
                    >
                      Théo Blondel
                    </motion.a>
                  </p>
                  <motion.a 
                    href="https://github.com/theoblondel/KauryUI" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
                    whileHover={{ scale: 1.3, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Github className="w-8 h-8" />
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </motion.footer>
    </div>
  );
};