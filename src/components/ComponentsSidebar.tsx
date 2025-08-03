import React from 'react';
import { motion } from 'framer-motion';
import { useDrag } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { 
  Type, 
  Mail, 
  Phone, 
  Lock, 
  EyeOff, 
  Hash, 
  Calendar, 
  Sliders, 
  Palette, 
  Paperclip, 
  Circle, 
  ChevronDown, 
  FileText, 
  CheckSquare, 
  Star, 
  Globe, 
  PenTool, 
  Image, 
  Clock, 
  MapPin,
  Undo, 
  Redo, 
  Copy, 
  Clipboard 
} from 'lucide-react';
import { useFormStore } from '../store/formStore';
import { FormComponent } from '../types';
import { v4 as uuidv4 } from 'uuid';

const componentTemplates = [
  // Basic Components
  {
    type: 'input' as const,
    label: 'Text',
    icon: Type,
    category: 'basic' as const,
    defaultProps: {
      label: 'New field',
      placeholder: 'Enter your text...',
      required: false,
      minLength: undefined,
      maxLength: undefined,
      pattern: undefined,
      layoutColumnSpan: 1,
      style: {
        borderRadius: 'md',
        borderWidth: '1',
        borderColor: 'gray-300',
        backgroundColor: 'white',
        textColor: 'gray-900',
        size: 'md' as const,
        animation: 'none' as const
      }
    }
  },
  {
    type: 'email' as const,
    label: 'Email',
    icon: Mail,
    category: 'basic' as const,
    defaultProps: {
      label: 'Email address',
      placeholder: 'votre@email.com',
      required: false,
      minLength: undefined,
      maxLength: undefined,
      pattern: undefined,
      layoutColumnSpan: 1,
      style: {
        borderRadius: 'md',
        borderWidth: '1',
        borderColor: 'gray-300',
        backgroundColor: 'white',
        textColor: 'gray-900',
        size: 'md' as const,
        animation: 'none' as const
      }
    }
  },
  {
    type: 'phone' as const,
    label: 'Phone',
    icon: Phone,
    category: 'basic' as const,
    defaultProps: {
      label: 'Phone number',
      placeholder: '123456789',
      required: false,
      minLength: undefined,
      maxLength: undefined,
      pattern: undefined,
      layoutColumnSpan: 1,
      style: {
        borderRadius: 'md',
        borderWidth: '1',
        borderColor: 'gray-300',
        backgroundColor: 'white',
        textColor: 'gray-900',
        size: 'md' as const,
        animation: 'none' as const
      }
    }
  },
  {
    type: 'password' as const,
    label: 'Password',
    icon: Lock,
    category: 'basic' as const,
    defaultProps: {
      label: 'Password',
      placeholder: '••••••••',
      required: false,
      minLength: 8,
      maxLength: undefined,
      pattern: undefined,
      layoutColumnSpan: 1,
      style: {
        borderRadius: 'md',
        borderWidth: '1',
        borderColor: 'gray-300',
        backgroundColor: 'white',
        textColor: 'gray-900',
        size: 'md' as const,
        animation: 'none' as const
      }
    }
  },
  {
    type: 'hidden' as const,
    label: 'Hidden Field',
    icon: EyeOff,
    category: 'basic' as const,
    defaultProps: {
      label: 'Hidden field',
      value: '',
      required: false,
      layoutColumnSpan: 1,
      style: {
        borderRadius: 'md',
        borderWidth: '1',
        borderColor: 'gray-300',
        backgroundColor: 'white',
        textColor: 'gray-900',
        size: 'md' as const,
        animation: 'none' as const
      }
    }
  },
  {
    type: 'number' as const,
    label: 'Number',
    icon: Hash,
    category: 'basic' as const,
    defaultProps: {
      label: 'Number',
      placeholder: '0',
      required: false,
      min: 0,
      max: 100,
      step: 1,
      layoutColumnSpan: 1,
      style: {
        borderRadius: 'md',
        borderWidth: '1',
        borderColor: 'gray-300',
        backgroundColor: 'white',
        textColor: 'gray-900',
        size: 'md' as const,
        animation: 'none' as const
      }
    }
  },
  {
    type: 'date' as const,
    label: 'Date',
    icon: Calendar,
    category: 'basic' as const,
    defaultProps: {
      label: 'Date',
      required: false,
      layoutColumnSpan: 1,
      style: {
        borderRadius: 'md',
        borderWidth: '1',
        borderColor: 'gray-300',
        backgroundColor: 'white',
        textColor: 'gray-900',
        size: 'md' as const,
        animation: 'none' as const
      }
    }
  },
  {
    type: 'range' as const,
    label: 'Slider',
    icon: Sliders,
    category: 'basic' as const,
    defaultProps: {
      label: 'Value',
      required: false,
      min: 0,
      max: 100,
      step: 1,
      layoutColumnSpan: 1,
      style: {
        borderRadius: 'md',
        borderWidth: '1',
        borderColor: 'gray-300',
        backgroundColor: 'white',
        textColor: 'gray-900',
        size: 'md' as const,
        animation: 'none' as const
      }
    }
  },
  {
    type: 'color' as const,
    label: 'Color',
    icon: Palette,
    category: 'basic' as const,
    defaultProps: {
      label: 'Choose a color',
      required: false,
      layoutColumnSpan: 1,
      style: {
        borderRadius: 'md',
        borderWidth: '1',
        borderColor: 'gray-300',
        backgroundColor: 'white',
        textColor: 'gray-900',
        size: 'md' as const,
        animation: 'none' as const
      }
    }
  },
  {
    type: 'file' as const,
    label: 'File',
    icon: Paperclip,
    category: 'media' as const,
    defaultProps: {
      label: 'Upload a file',
      required: false,
      accept: '*/*',
      multiple: false,
      layoutColumnSpan: 2,
      style: {
        borderRadius: 'md',
        borderWidth: '1',
        borderColor: 'gray-300',
        backgroundColor: 'white',
        textColor: 'gray-900',
        size: 'md' as const,
        animation: 'none' as const
      }
    }
  },
  {
    type: 'radio' as const,
    label: 'Single Choice',
    icon: Circle,
    category: 'basic' as const,
    defaultProps: {
      label: 'Choose an option',
      required: false,
      options: ['Option 1', 'Option 2', 'Option 3'],
      orientation: 'vertical' as const,
      layoutColumnSpan: 1,
      style: {
        borderRadius: 'md',
        borderWidth: '1',
        borderColor: 'gray-300',
        backgroundColor: 'white',
        textColor: 'gray-900',
        size: 'md' as const,
        animation: 'none' as const
      }
    }
  },
  {
    type: 'select' as const,
    label: 'Dropdown',
    icon: ChevronDown,
    category: 'basic' as const,
    defaultProps: {
      label: 'New selection',
      placeholder: 'Choose an option...',
      required: false,
      options: ['Option 1', 'Option 2', 'Option 3'],
      layoutColumnSpan: 1,
      style: {
        borderRadius: 'md',
        borderWidth: '1',
        borderColor: 'gray-300',
        backgroundColor: 'white',
        textColor: 'gray-900',
        size: 'md' as const,
        animation: 'none' as const
      }
    }
  },
  {
    type: 'textarea' as const,
    label: 'Text Area',
    icon: FileText,
    category: 'basic' as const,
    defaultProps: {
      label: 'Text area',
      placeholder: 'Enter your message...',
      required: false,
      layoutColumnSpan: 2,
      style: {
        borderRadius: 'md',
        borderWidth: '1',
        borderColor: 'gray-300',
        backgroundColor: 'white',
        textColor: 'gray-900',
        size: 'md' as const,
        animation: 'none' as const
      }
    }
  },
  {
    type: 'checkbox' as const,
    label: 'Checkbox',
    icon: CheckSquare,
    category: 'basic' as const,
    defaultProps: {
      label: 'New checkbox',
      required: false,
      layoutColumnSpan: 1,
      style: {
        borderRadius: 'md',
        borderWidth: '1',
        borderColor: 'gray-300',
        backgroundColor: 'white',
        textColor: 'gray-900',
        size: 'md' as const,
        animation: 'none' as const
      }
    }
  },
  {
    type: 'rich-text-editor' as const,
    label: 'Rich Text Editor',
    icon: FileText,
    category: 'advanced' as const,
    defaultProps: {
      label: 'Rich text editor',
      placeholder: 'Enter your formatted content...',
      required: false,
      layoutColumnSpan: 2,
      richTextOptions: {
        toolbar: ['bold', 'italic', 'underline', 'link'],
        height: 200,
        placeholder: 'Enter your formatted content...'
      },
      style: {
        borderRadius: 'md',
        borderWidth: '1',
        borderColor: 'gray-300',
        backgroundColor: 'white',
        textColor: 'gray-900',
        size: 'md' as const,
        animation: 'none' as const
      }
    }
  },
  // Advanced Components
  {
    type: 'rating' as const,
    label: 'Rating',
    icon: Star,
    category: 'advanced' as const,
    defaultProps: {
      label: 'Rate this service',
      required: false,
      maxRating: 5,
      layoutColumnSpan: 1,
      style: {
        borderRadius: 'md',
        borderWidth: '1',
        borderColor: 'gray-300',
        backgroundColor: 'white',
        textColor: 'gray-900',
        size: 'md' as const,
        animation: 'none' as const
      }
    }
  },
  {
    type: 'country' as const,
    label: 'Country',
    icon: Globe,
    category: 'advanced' as const,
    defaultProps: {
      label: 'Country',
      required: false,
      value: '',
      layoutColumnSpan: 1,
      style: {
        borderRadius: 'md',
        borderWidth: '1',
        borderColor: 'gray-300',
        backgroundColor: 'white',
        textColor: 'gray-900',
        size: 'md' as const,
        animation: 'none' as const
      }
    }
  },
  {
    type: 'signature' as const,
    label: 'Signature',
    icon: PenTool,
    category: 'advanced' as const,
    defaultProps: {
      label: 'Electronic signature',
      required: false,
      layoutColumnSpan: 2,
      signatureOptions: {
        width: 400,
        height: 150,
        backgroundColor: '#ffffff'
      },
      style: {
        borderRadius: 'md',
        borderWidth: '1',
        borderColor: 'gray-300',
        backgroundColor: 'white',
        textColor: 'gray-900',
        size: 'md' as const,
        animation: 'none' as const
      }
    }
  },
  {
    type: 'image-upload' as const,
    label: 'Images',
    icon: Image,
    category: 'media' as const,
    defaultProps: {
      label: 'Upload images',
      required: false,
      layoutColumnSpan: 2,
      imageOptions: {
        maxSize: 10,
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
        maxFiles: 5
      },
      style: {
        borderRadius: 'md',
        borderWidth: '1',
        borderColor: 'gray-300',
        backgroundColor: 'white',
        textColor: 'gray-900',
        size: 'md' as const,
        animation: 'none' as const
      }
    }
  },
  {
    type: 'datetime' as const,
    label: 'Date & Time',
    icon: Clock,
    category: 'advanced' as const,
    defaultProps: {
      label: 'Date and time',
      required: false,
      layoutColumnSpan: 1,
      style: {
        borderRadius: 'md',
        borderWidth: '1',
        borderColor: 'gray-300',
        backgroundColor: 'white',
        textColor: 'gray-900',
        size: 'md' as const,
        animation: 'none' as const
      }
    }
  },
  {
    type: 'geolocation' as const,
    label: 'Location',
    icon: MapPin,
    category: 'location' as const,
    defaultProps: {
      label: 'My location',
      required: false,
      layoutColumnSpan: 2,
      geolocationOptions: {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      },
      style: {
        borderRadius: 'md',
        borderWidth: '1',
        borderColor: 'gray-300',
        backgroundColor: 'white',
        textColor: 'gray-900',
        size: 'md' as const,
        animation: 'none' as const
      }
    }
  }
];

const presets = [
  {
    name: 'Contact Form',
    category: 'basic',
    components: [
      { type: 'input', label: 'Full name', placeholder: 'Your name...', required: true },
      { type: 'input', label: 'Email', placeholder: 'your@email.com', required: true },
      { type: 'select', label: 'Subject', options: ['General question', 'Support', 'Partnership'] },
      { type: 'textarea', label: 'Message', placeholder: 'Your message...', required: true }
    ]
  },
  {
    name: 'Login Form',
    category: 'basic',
    components: [
      { type: 'input', label: 'Email', placeholder: 'your@email.com', required: true },
      { type: 'input', label: 'Password', placeholder: '••••••••', required: true },
      { type: 'checkbox', label: 'Remember me' }
    ]
  },
  {
    name: 'Customer Support',
    category: 'basic',
    components: [
      { type: 'input', label: 'Ticket number', placeholder: '#12345', required: true },
      { type: 'select', label: 'Priority', options: ['Low', 'Medium', 'High', 'Urgent'] },
      { type: 'textarea', label: 'Problem description', required: true }
    ]
  },
  {
    name: 'Service Evaluation',
    category: 'advanced',
    components: [
      { type: 'rating', label: 'Rate our service', maxRating: 5, required: true },
      { type: 'country', label: 'Your country', required: true },
      { type: 'textarea', label: 'Comments', placeholder: 'Your comments...', required: false }
    ]
  },
  {
    name: 'E-commerce Order',
    category: 'advanced',
    components: [
      { type: 'image-upload', label: 'Product photos', required: false },
      { type: 'rating', label: 'Product rating', maxRating: 5, required: true },
      { type: 'signature', label: 'Confirmation signature', required: true },
      { type: 'geolocation', label: 'Delivery address', required: true }
    ]
  }
];

export const ComponentsSidebar: React.FC = () => {
  const { t } = useTranslation();
  const { 
    addComponent, 
    setFormData, 
    formData, 
    undo, 
    redo, 
    canUndo, 
    canRedo,
    clipboard,
    pasteComponent,
    loadTemplate,
    setDraggedComponent
  } = useFormStore();

  const handleAddComponent = (template: typeof componentTemplates[0]) => {
    const newComponent: FormComponent = {
      id: uuidv4(),
      type: template.type,
      ...template.defaultProps,
      style: template.defaultProps.style!
    } as FormComponent;
    
    addComponent(newComponent);
  };

  const handleLoadPreset = (preset: typeof presets[0]) => {
    const components = preset.components.map(comp => ({
      id: uuidv4(),
      type: comp.type as FormComponent['type'],
      label: comp.label,
      placeholder: comp.placeholder,
      required: comp.required || false,
      options: 'options' in comp ? comp.options : undefined,
      maxRating: 'maxRating' in comp ? comp.maxRating : undefined,
      style: {
        borderRadius: 'md',
        borderWidth: '1',
        borderColor: 'gray-300',
        backgroundColor: 'white',
        textColor: 'gray-900',
        size: 'md' as const,
        animation: 'none' as const
      }
    })) as FormComponent[];

    setFormData({ 
      ...formData,
      components,
      name: preset.name
    });
  };

  const groupedComponents = componentTemplates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, typeof componentTemplates>);

  const categoryLabels = {
    basic: t('formBuilder.sidebar.categories.basic'),
    advanced: t('formBuilder.sidebar.categories.advanced'),
    media: t('formBuilder.sidebar.categories.media'),
    location: t('formBuilder.sidebar.categories.location'),
    validation: t('formBuilder.sidebar.categories.validation')
  };

  // Draggable Component Item
  const DraggableComponentItem: React.FC<{ template: typeof componentTemplates[0] }> = ({ template }) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'componentTemplate',
      item: () => {
        setDraggedComponent(template);
        return {
          type: 'componentTemplate',
          template: template
        };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: () => {
        setDraggedComponent(null);
      }
    });

    const Icon = template.icon;

    return (
      <motion.button
        ref={drag}
        onClick={() => handleAddComponent(template)}
        className={`w-full p-4 bg-white dark:bg-black rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 text-center group shadow-sm hover:shadow-md relative cursor-move ${
          isDragging ? 'opacity-50 scale-95' : ''
        }`}
        whileHover={{ scale: isDragging ? 0.95 : 1.02, y: isDragging ? 0 : -2 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center space-y-2">
          <motion.div
            whileHover={{ scale: isDragging ? 1 : 1.1, rotate: isDragging ? 0 : 5 }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="w-8 h-8 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors" />
          </motion.div>
          <div className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors leading-tight">
            {template.label}
          </div>
        </div>
        {isDragging && (
          <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-400 dark:border-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-blue-600 dark:text-blue-400 text-xs font-medium">
              Glissez vers le formulaire
            </span>
          </div>
        )}
      </motion.button>
    );
  };
  return (
    <div className="w-full md:w-96 bg-white dark:bg-black border-r border-black/10 dark:border-white/10 p-4 md:py-4 md:px-6 overflow-y-auto flex-shrink-0 h-full scrollbar-hide">
      <div className="mb-8">
        <h2 className="hidden md:block text-xl font-bold text-black dark:text-white mb-2">
          🎨 {t('formBuilder.title')}
        </h2>
        <p className="text-sm text-black/70 dark:text-white/70">
          {t('formBuilder.sidebar.description')}
        </p>
      </div>

      {/* Undo/Redo Controls */}
      <div className="mb-8">
        <div className="flex space-x-2">
          <button
            onClick={undo}
            disabled={!canUndo()}
            className="flex-1 flex items-center justify-center py-3 px-3 bg-white dark:bg-black text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700"
            title="Annuler (Ctrl+Z)"
            title={t('formBuilder.sidebar.actions.undo') + " (Ctrl+Z)"}
          >
            <Undo className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">{t('formBuilder.sidebar.actions.undo')}</span>
          </button>
          <button
            onClick={redo}
            disabled={!canRedo()}
            className="flex-1 flex items-center justify-center py-3 px-3 bg-white dark:bg-black text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700"
            title={t('formBuilder.sidebar.actions.redo') + " (Ctrl+Y)"}
          >
            <Redo className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">{t('formBuilder.sidebar.actions.redo')}</span>
          </button>
          <button
            onClick={pasteComponent}
            disabled={!clipboard}
            className="flex-1 flex items-center justify-center py-3 px-3 bg-white dark:bg-black text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700"
            title={t('formBuilder.sidebar.actions.paste') + " (Ctrl+V)"}
          >
            <Clipboard className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">{t('formBuilder.sidebar.actions.paste')}</span>
          </button>
        </div>
      </div>

      {/* Available components */}
      <div className="mb-8">
        {Object.entries(groupedComponents).map(([category, templates]) => (
          <div key={category} className="mb-8">
            <h3 className="text-lg font-bold text-black dark:text-white mb-4 flex items-center">
              {categoryLabels[category as keyof typeof categoryLabels]}
            </h3> 
            <div className="grid grid-cols-2 gap-3">
              {templates.map((template) => (
                <DraggableComponentItem key={template.type} template={template} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Presets */}
      <div>
        <h3 className="text-lg font-bold text-black dark:text-white mb-4 flex items-center">
          <CheckSquare className="w-5 h-5 mr-2" />
          {t('formBuilder.sidebar.presets.title')}
        </h3>
        <div className="space-y-3">
          {presets.map((preset, index) => (
            <motion.button
              key={index}
              onClick={() => handleLoadPreset(preset)}
              className="w-full p-5 bg-white dark:bg-black text-black dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 text-left shadow-md hover:shadow-lg transform hover:scale-[1.02] relative border border-gray-200 dark:border-gray-700"
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="font-bold text-lg mb-2">{preset.name}</div>
              <div className="text-sm opacity-90">
                {preset.components.length} components included
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};