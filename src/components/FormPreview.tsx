import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrag, useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { Trash2, ArrowUp, ArrowDown, Copy, MoreVertical } from 'lucide-react';
import { useFormStore } from '../store/formStore';
import { 
  InputElement, 
  SelectElement, 
  TextareaElement, 
  CheckboxElement,
  EmailElement,
  PhoneElement,
  NumberElement,
  DateElement,
  RangeElement,
  ColorElement,
  FileElement,
  RadioElement,
  PasswordElement,
  HiddenElement
} from './FormElements';
import {
  RatingElement,
  CountryElement,
  SignatureElement,
  ImageUploadElement,
  DateTimeElement,
  GeolocationElement
} from './NewFormElements';
import { RichTextEditorElement } from './RichTextEditorElement';
import { FormComponent } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface FormPreviewItemProps {
  component: FormComponent;
  index: number;
  isPreviewMode: boolean;
  selectedComponent: string | null;
  setSelectedComponent: (id: string) => void;
  removeComponent: (id: string) => void;
  reorderComponents: (fromIndex: number, toIndex: number) => void;
  duplicateComponent: (id: string) => void;
  copyComponent: (id: string) => void;
  validationErrors: Record<string, string[]>;
  totalComponents: number;
}

const FormPreviewItem: React.FC<FormPreviewItemProps> = ({
  component,
  index,
  isPreviewMode,
  selectedComponent,
  setSelectedComponent,
  removeComponent,
  reorderComponents,
  duplicateComponent,
  copyComponent,
  validationErrors,
  totalComponents
}) => {
  const { t } = useTranslation();
  const [{ isDragging }, drag] = useDrag({
    type: 'formComponent',
    item: { id: component.id, type: component.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const Component = componentMap[component.type];
  const hasErrors = validationErrors[component.id]?.length > 0;
  
  return (
    <motion.div
      ref={drag}
      key={component.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className={`relative group cursor-move ${hasErrors ? 'ring-2 ring-red-500 ring-offset-2 rounded-lg' : ''} ${isDragging ? 'opacity-50' : ''}`}
    >
      <Component
        component={component}
        isSelected={selectedComponent === component.id && !isPreviewMode}
        onClick={() => !isPreviewMode && setSelectedComponent(component.id)}
      />
      
      {/* Validation errors */}
      {hasErrors && !isPreviewMode && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-2 left-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded z-20"
        >
          {validationErrors[component.id][0]}
        </motion.div>
      )}
      
      {/* Controls overlay */}
      <AnimatePresence>
        {selectedComponent === component.id && !isPreviewMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -top-2 -right-2 flex space-x-1 z-10"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                copyComponent(component.id);
              }}
              className="p-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-110"
              title={t('formBuilder.controls.moveDown')}
            >
              <Copy className="w-3 h-3" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                duplicateComponent(component.id);
              }}
              className="p-1.5 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-110"
             title={t('formBuilder.controls.duplicate')}
            >
              <MoreVertical className="w-3 h-3" />
            </button>
            
            {index > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  reorderComponents(index, index - 1);
                }}
                className="p-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-110"
                title="Monter"
              >
                <ArrowUp className="w-3 h-3" />
              </button>
            )}
            
            {index < totalComponents - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  reorderComponents(index, index + 1);
                }}
                className="p-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-110"
                title="Descendre"
              >
                <ArrowDown className="w-3 h-3" />
              </button>
            )}
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeComponent(component.id);
              }}
              className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-110"
              title={t('formBuilder.controls.delete')}
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const getGlobalStyleClasses = (globalStyle: string, isDark: boolean, shadowsEnabled: boolean = true) => {
  const baseClasses = "rounded-2xl shadow-xl p-8 transition-all duration-300";
  const shadowClass = shadowsEnabled ? "shadow-xl" : "shadow-none";
  
  switch (globalStyle) {
    case 'glass':
      return `rounded-2xl ${shadowClass} p-8 transition-all duration-300 bg-white/80 dark:bg-black/80 backdrop-blur-lg border border-black/20 dark:border-white/20`;
    
    case 'neumorphism':
      return isDark 
        ? `rounded-2xl p-8 transition-all duration-300 bg-black shadow-[inset_-12px_-8px_40px_#ffffff20,inset_12px_8px_40px_#ffffff,inset_-12px_-8px_40px_#ffffff50,inset_12px_8px_40px_#ffffff] border-0`
        : `rounded-2xl p-8 transition-all duration-300 bg-white shadow-[inset_-12px_-8px_40px_#00000020,inset_12px_8px_40px_#000000,inset_-12px_-8px_40px_#00000050,inset_12px_8px_40px_#000000] border-0`;
    
    case 'outline':
      return `rounded-2xl ${shadowClass} p-8 transition-all duration-300 bg-transparent border-2 border-black/10 dark:border-white/10 hover:shadow-black/25 dark:hover:shadow-white/25`;
    
    case 'minimal':
    default:
      return `rounded-2xl ${shadowClass} p-8 transition-all duration-300 bg-white dark:bg-black border border-black/10 dark:border-white/10`;
  }
};

const componentMap = {
  input: InputElement,
  password: PasswordElement,
  hidden: HiddenElement,
  select: SelectElement,
  textarea: TextareaElement,
  checkbox: CheckboxElement,
  email: EmailElement,
  phone: PhoneElement,
  number: NumberElement,
  date: DateElement,
  range: RangeElement,
  color: ColorElement,
  file: FileElement,
  radio: RadioElement,
  rating: RatingElement,
  country: CountryElement,
  signature: SignatureElement,
  'image-upload': ImageUploadElement,
  datetime: DateTimeElement,
  geolocation: GeolocationElement,
  'rich-text-editor': RichTextEditorElement
};

interface FormPreviewProps {
  isPreviewMode?: boolean;
  currentStepId?: string | null;
}

export const FormPreview: React.FC<FormPreviewProps> = ({ isPreviewMode = false, currentStepId = null }) => {
  const { t } = useTranslation();
  const { 
    formData, 
    selectedComponent, 
    setSelectedComponent, 
    removeComponent, 
    reorderComponents,
    duplicateComponent,
    copyComponent,
    validationErrors,
    addComponent,
    draggedComponent
  } = useFormStore();
  
  // Initialize customStyles with default values to prevent undefined errors
  const customStyles = formData.customStyles || {
    submitButtonColor: '#8B5CF6',
    submitButtonTextColor: '#FFFFFF'
  };
  
  // Detect current theme for neumorphism style
  const isDark = document.documentElement.classList.contains('dark');

  // Get spacing class based on custom styles
  const getSpacingClass = (spacing: string) => {
    switch (spacing) {
      case '0.5rem': return 'space-y-2';
      case '1rem': return 'space-y-4';
      case '1.5rem': return 'space-y-6';
      case '2rem': return 'space-y-8';
      default: return 'space-y-4';
    }
  };

  const spacingClass = getSpacingClass(customStyles.spacing || '1rem');

  // Get grid columns class based on form columns setting
  const getGridColumnsClass = (columns: number) => {
    switch (columns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      default: return 'grid-cols-1 md:grid-cols-2';
    }
  };

  const gridColumnsClass = getGridColumnsClass(formData.formColumns || 1);
  // Filter components based on current step
  const filteredComponents = formData.components.filter(component => {
    if (isPreviewMode) {
      // In preview mode, show all components
      return true;
    }
    
    if (currentStepId === null) {
      // Show global components (no stepId) when no step is selected
      return !component.stepId;
    }
    
    // Show components that belong to the current step or are global
    return !component.stepId || component.stepId === currentStepId;
  });

  // Get grid column span for a component
  const getGridColumnSpan = (component: FormComponent) => {
    const span = component.layoutColumnSpan || 1;
    return `col-span-${Math.min(span, 2)}`; // Limit to max 2 columns for now
  };

  // Drop zone for adding new components
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'componentTemplate',
    drop: (item: { type: string; template: any }) => {
      const newComponent: FormComponent = {
        id: uuidv4(),
        type: item.template.type,
        ...item.template.defaultProps,
        style: item.template.defaultProps.style!,
        stepId: currentStepId || undefined
      } as FormComponent;
      
      addComponent(newComponent);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  return (
    <div 
      ref={drop}
      className={`flex-1 p-4 md:p-8 bg-white dark:bg-black overflow-y-auto h-full scrollbar-hide transition-all duration-300 ${
        isOver && canDrop ? 'bg-blue-50 dark:bg-blue-900/20' : ''
      }`}
    >
      <div className={`${isPreviewMode ? 'max-w-4xl' : 'max-w-2xl'} mx-auto transition-all duration-300`}>
        <div className="mb-8">
          {isPreviewMode && (
            <div className="mb-4 p-3 bg-black/5 dark:bg-white/5 rounded-lg border border-black/10 dark:border-white/10">
              <p className="text-sm text-black dark:text-white text-center">
                {t('formBuilder.preview.previewMode')}
              </p>
            </div>
          )}
          {isOver && canDrop && !isPreviewMode && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-blue-100 dark:bg-blue-900/30 border-2 border-dashed border-blue-400 dark:border-blue-600 rounded-lg"
            >
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">+</span>
                </div>
                <p className="text-blue-700 dark:text-blue-300 font-medium">
                  {t('formBuilder.preview.dropZone.release', { component: draggedComponent?.label })}
                </p>
              </div>
            </motion.div>
          )}
          <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
            {formData.name}
            {currentStepId && !isPreviewMode && (
              <span className="text-sm font-normal text-black/60 dark:text-white/60 ml-2">
                - Step being edited
              </span>
            )}
          </h2>
          {!isPreviewMode && (
            <p className="text-black dark:text-white">
              {t('formBuilder.preview.title')} • {filteredComponents.length} {t('formBuilder.preview.elementsCount')}
              {Object.keys(validationErrors).length > 0 && (
                <span className="ml-2 text-red-500">
                  • {Object.keys(validationErrors).length} {t('formBuilder.preview.errors')}
                </span>
              )}
            </p>
          )}
        </div>

        <motion.div 
          className={getGlobalStyleClasses(formData.globalStyle, isDark, customStyles.shadows)}
          style={{
            fontFamily: customStyles.fontFamily,
            fontSize: customStyles.fontSize,
            borderRadius: customStyles.borderRadius
          }}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredComponents.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                  {currentStepId ? t('formBuilder.preview.emptyStep.title') : t('formBuilder.preview.emptyForm.title')}
                </h3>
                <p className="text-black dark:text-white">
                  {currentStepId 
                    ? t('formBuilder.preview.emptyStep.description')
                    : t('formBuilder.preview.emptyForm.description')
                  }
                </p>
                <div className="mt-4 text-sm text-black/60 dark:text-white/60">
                  {t('formBuilder.preview.emptyForm.tip')}
                </div>
                {isOver && canDrop && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-6 p-4 bg-blue-100 dark:bg-blue-900/30 border-2 border-dashed border-blue-400 dark:border-blue-600 rounded-lg"
                  >
                    <p className="text-blue-700 dark:text-blue-300 font-medium">
                      {t('formBuilder.preview.dropZone.perfect')}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <div className={`grid ${gridColumnsClass} gap-6`}>
                {filteredComponents.map((component, index) => 
                  <div
                    key={component.id}
                    className={getGridColumnSpan(component)}
                  >
                    <FormPreviewItem
                      component={component}
                      index={index}
                      isPreviewMode={isPreviewMode}
                      selectedComponent={selectedComponent}
                      setSelectedComponent={setSelectedComponent}
                      removeComponent={removeComponent}
                      reorderComponents={reorderComponents}
                      duplicateComponent={duplicateComponent}
                      copyComponent={copyComponent}
                      validationErrors={validationErrors}
                      totalComponents={filteredComponents.length}
                    />
                  </div>
                )}
                
                <div className={`col-span-full`}>
                  <motion.button
                    type="submit"
                    className="w-full font-semibold py-4 px-8 rounded-xl transform hover:scale-[1.02] transition-all duration-300 shadow-medium hover:shadow-strong"
                    style={{
                      backgroundColor: customStyles.submitButtonColor,
                      color: customStyles.submitButtonTextColor,
                    }}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    onMouseEnter={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.filter = 'brightness(0.9)';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.filter = 'brightness(1)';
                    }}
                  >
                    {t('formBuilder.preview.submitButton')}
                  </motion.button>
                </div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};