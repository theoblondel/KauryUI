import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FormComponent } from '../types';
import { useFormStore } from '../store/formStore';
import { ALL_COUNTRIES, Country } from '../data/countries';
import { 
  RatingElement, 
  CountryElement, 
  SignatureElement, 
  ImageUploadElement, 
  DateTimeElement, 
  GeolocationElement 
} from './NewFormElements';
import { RichTextEditorElement } from './RichTextEditorElement';

interface FormElementProps {
  component: FormComponent;
  isSelected?: boolean;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

const getSizeClasses = (size: string) => {
  switch (size) {
    case 'sm': return 'px-3 py-2 text-sm';
    case 'lg': return 'px-5 py-3.5 text-lg';
    default: return 'px-4 py-2.5 text-base';
  }
};

const getBorderClasses = (style: FormComponent['style']) => {
  const radius = style.borderRadius === 'none' ? 'rounded-none' : 
                 style.borderRadius === 'sm' ? 'rounded-sm' :
                 style.borderRadius === 'md' ? 'rounded-md' :
                 style.borderRadius === 'lg' ? 'rounded-lg' : 'rounded-xl';
  
  const borderWidth = style.borderWidth === '1' ? 'border' : 
                     style.borderWidth === '2' ? 'border-2' :
                     style.borderWidth === '4' ? 'border-4' :
                     style.borderWidth === '8' ? 'border-8' : 'border';
  
  const border = `${borderWidth} border-gray-300 dark:border-gray-600`;
  
  return `${radius} ${border}`;
};

const getAnimationProps = (animation: string) => {
  switch (animation) {
    case 'bounce':
      return {
        whileFocus: { scale: 1.02 },
        whileHover: { y: -1 },
        transition: { type: 'spring', stiffness: 400, damping: 17 }
      };
    case 'scale':
      return {
        whileFocus: { scale: 1.05 },
        whileHover: { scale: 1.02 }
      };
    case 'slide':
      return {
        whileFocus: { x: 4 },
        whileHover: { x: 2 }
      };
    case 'fade-in':
      return {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        whileHover: { opacity: 0.9 },
        transition: { duration: 0.3, ease: 'easeOut' }
      };
    case 'pulse':
      return {
        whileHover: { 
          scale: [1, 1.05, 1],
          transition: { duration: 0.6, repeat: Infinity, repeatType: 'reverse' }
        },
        whileFocus: { scale: 1.03 }
      };
    case 'wobble':
      return {
        whileHover: {
          rotate: [0, -1, 1, -1, 0],
          transition: { duration: 0.5, ease: 'easeInOut' }
        },
        whileFocus: { rotate: 1 }
      };
    case 'flip':
      return {
        whileHover: { 
          rotateY: 180,
          transition: { duration: 0.6, ease: 'easeInOut' }
        },
        whileFocus: { rotateX: 5 }
      };
    case 'shake':
      return {
        whileHover: {
          x: [0, -2, 2, -2, 2, 0],
          transition: { duration: 0.4 }
        },
        whileFocus: { x: 1 }
      };
    case 'glow':
      return {
        whileHover: { 
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
          scale: 1.02,
          transition: { duration: 0.3 }
        },
        whileFocus: { 
          boxShadow: '0 0 25px rgba(0, 0, 0, 0.7)',
          scale: 1.01
        }
      };
    case 'float':
      return {
        animate: {
          y: [0, -3, 0],
          transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        },
        whileHover: { y: -5 },
        whileFocus: { y: -2 }
      };
    case 'rotate':
      return {
        whileHover: { 
          rotate: 360,
          transition: { duration: 0.8, ease: 'easeInOut' }
        },
        whileFocus: { rotate: 5 }
      };
    case 'elastic':
      return {
        whileHover: { 
          scale: 1.1,
          transition: { type: 'spring', stiffness: 300, damping: 10 }
        },
        whileFocus: { 
          scale: 1.05,
          transition: { type: 'spring', stiffness: 400, damping: 15 }
        }
      };
    case 'magnetic':
      return {
        whileHover: { 
          scale: 1.02,
          x: 2,
          y: -2,
          transition: { type: 'spring', stiffness: 400, damping: 25 }
        },
        whileFocus: { 
          scale: 1.01,
          x: 1,
          y: -1
        }
      };
    case 'morphing':
      return {
        whileHover: {
          borderRadius: ['8px', '20px', '8px'],
          scale: [1, 1.02, 1],
          transition: { duration: 0.8, ease: 'easeInOut' }
        },
        whileFocus: { borderRadius: '12px', scale: 1.01 }
      };
    case 'ripple':
      return {
        whileHover: {
          scale: [1, 1.05, 1],
          opacity: [1, 0.8, 1],
          transition: { duration: 0.6, ease: 'easeOut' }
        },
        whileFocus: { 
          scale: 1.02,
          boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.3)'
        }
      };
    default:
      return {};
  }
};

export const InputElement: React.FC<FormElementProps> = ({ component, isSelected, onClick }) => {
  const sizeClasses = getSizeClasses(component.style.size);
  const borderClasses = getBorderClasses(component.style);
  const animationProps = getAnimationProps(component.style.animation);

  return (
    <motion.div
      onClick={onClick}
      className={`group cursor-pointer ${isSelected ? 'ring-2 ring-gray-500 ring-offset-2 rounded-lg p-2' : 'p-2'}`}
      layout
    >
      <label className="block text-sm font-semibold text-black dark:text-white mb-3">
        {component.label}
        {component.required && <span className="text-red-500 ml-1 text-base">*</span>}
      </label>
      <motion.input
        type="text"
        placeholder={component.placeholder}
        className={`w-full ${sizeClasses} ${borderClasses} bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md`}
        {...animationProps}
      />
    </motion.div>
  );
};

export const EmailElement: React.FC<FormElementProps> = ({ component, isSelected, onClick }) => {
  const sizeClasses = getSizeClasses(component.style.size);
  const borderClasses = getBorderClasses(component.style);
  const animationProps = getAnimationProps(component.style.animation);

  return (
    <motion.div
      onClick={onClick}
      className={`group cursor-pointer ${isSelected ? 'ring-2 ring-gray-500 ring-offset-2 rounded-lg p-2' : 'p-2'}`}
      layout
    >
      <label className="block text-sm font-semibold text-black dark:text-white mb-3">
        {component.label}
        {component.required && <span className="text-red-500 ml-1 text-base">*</span>}
      </label>
      <motion.input
        type="email"
        placeholder={component.placeholder}
        className={`w-full ${sizeClasses} ${borderClasses} bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md`}
        {...animationProps}
      />
    </motion.div>
  );
};

export const PhoneElement: React.FC<FormElementProps> = ({ component, isSelected, onClick }) => {
  const { t } = useTranslation();
  const sizeClasses = getSizeClasses(component.style.size);
  const borderClasses = getBorderClasses(component.style);
  const animationProps = getAnimationProps(component.style.animation);
  const { formData } = useFormStore();
  
  // Find if there's a country component in the form and get its selected value
  const countryComponent = formData.components.find(c => c.type === 'country');
  let selectedCountry: Country | null = null;
  
  if (countryComponent && countryComponent.value) {
    try {
      selectedCountry = JSON.parse(countryComponent.value);
    } catch (e) {
      // If parsing fails, try to find by name (fallback for old format)
      selectedCountry = ALL_COUNTRIES.find(c => c.name === countryComponent.value) || null;
    }
  }
  
  // Get the dial code prefix
  const dialCodePrefix = selectedCountry ? selectedCountry.dial_code : '';

  return (
    <motion.div
      onClick={onClick}
      className={`group cursor-pointer ${isSelected ? 'ring-2 ring-gray-500 ring-offset-2 rounded-lg p-2' : 'p-2'}`}
      layout
    >
      <label className="block text-sm font-semibold text-black dark:text-white mb-3">
        {component.label}
        {component.required && <span className="text-red-500 ml-1 text-base">*</span>}
      </label>
      
      <div className="relative">
        {dialCodePrefix && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 font-medium z-10 bg-white dark:bg-gray-900 pr-2">
            {selectedCountry?.flag} {dialCodePrefix}
          </div>
        )}
        <motion.input
          type="tel"
          placeholder={dialCodePrefix ? `${dialCodePrefix} ${component.placeholder || '123456789'}` : component.placeholder}
          className={`w-full ${sizeClasses} ${borderClasses} bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md ${
            dialCodePrefix ? 'pl-20' : ''
          }`}
          style={{
            paddingLeft: dialCodePrefix ? `${dialCodePrefix.length * 8 + 40}px` : undefined
          }}
          {...animationProps}
        />
      </div>
      
      {selectedCountry && (
        <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-2 rounded">
          <span className="font-medium">{t('elements.phone.automaticPrefix')}:</span> {selectedCountry.flag} {selectedCountry.name} ({selectedCountry.dial_code})
        </div>
      )}
    </motion.div>
  );
};

export const NumberElement: React.FC<FormElementProps> = ({ component, isSelected, onClick }) => {
  const sizeClasses = getSizeClasses(component.style.size);
  const borderClasses = getBorderClasses(component.style);
  const animationProps = getAnimationProps(component.style.animation);

  return (
    <motion.div
      onClick={onClick}
      className={`group cursor-pointer ${isSelected ? 'ring-2 ring-gray-500 ring-offset-2 rounded-lg p-2' : 'p-2'}`}
      layout
    >
      <label className="block text-sm font-semibold text-black dark:text-white mb-3">
        {component.label}
        {component.required && <span className="text-red-500 ml-1 text-base">*</span>}
      </label>
      <motion.input
        type="number"
        placeholder={component.placeholder}
        min={component.min}
        max={component.max}
        step={component.step}
        className={`w-full ${sizeClasses} ${borderClasses} bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md`}
        {...animationProps}
      />
    </motion.div>
  );
};

export const DateElement: React.FC<FormElementProps> = ({ component, isSelected, onClick }) => {
  const sizeClasses = getSizeClasses(component.style.size);
  const borderClasses = getBorderClasses(component.style);
  const animationProps = getAnimationProps(component.style.animation);

  return (
    <motion.div
      onClick={onClick}
      className={`group cursor-pointer ${isSelected ? 'ring-2 ring-gray-500 ring-offset-2 rounded-lg p-2' : 'p-2'}`}
      layout
    >
      <label className="block text-sm font-semibold text-black dark:text-white mb-3">
        {component.label}
        {component.required && <span className="text-red-500 ml-1 text-base">*</span>}
      </label>
      <motion.input
        type="date"
        className={`w-full ${sizeClasses} ${borderClasses} bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md`}
        {...animationProps}
      />
    </motion.div>
  );
};

export const RangeElement: React.FC<FormElementProps> = ({ component, isSelected, onClick }) => {
  const { t } = useTranslation();
  const animationProps = getAnimationProps(component.style.animation);

  return (
    <motion.div
      onClick={onClick}
      className={`group cursor-pointer ${isSelected ? 'ring-2 ring-gray-500 ring-offset-2 rounded-lg p-2' : 'p-2'}`}
      layout
    >
      <label className="block text-sm font-semibold text-black dark:text-white mb-3">
        {component.label}
        {component.required && <span className="text-red-500 ml-1 text-base">*</span>}
      </label>
      <div className="relative px-2">
        <motion.input
          type="range"
          min={component.min}
          max={component.max}
          step={component.step}
          className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          {...animationProps}
        />
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-2 px-1">
          <span className="font-medium">{component.min}</span>
          <span className="font-medium">{component.max}</span>
        </div>
      </div>
    </motion.div>
  );
};

export const ColorElement: React.FC<FormElementProps> = ({ component, isSelected, onClick }) => {
  const animationProps = getAnimationProps(component.style.animation);

  return (
    <motion.div
      onClick={onClick}
      className={`group cursor-pointer ${isSelected ? 'ring-2 ring-gray-500 ring-offset-2 rounded-lg p-2' : 'p-2'}`}
      layout
    >
      <label className="block text-sm font-semibold text-black dark:text-white mb-3">
        {component.label}
        {component.required && <span className="text-red-500 ml-1 text-base">*</span>}
      </label>
      <motion.input
        type="color"
        className="w-full h-12 border-2 border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer focus:ring-2 focus:ring-gray-500 focus:border-gray-500 shadow-sm hover:shadow-md transition-all duration-200"
        {...animationProps}
      />
    </motion.div>
  );
};

export const FileElement: React.FC<FormElementProps> = ({ component, isSelected, onClick }) => {
  const { t } = useTranslation();
  const animationProps = getAnimationProps(component.style.animation);

  return (
    <motion.div
      onClick={onClick}
      className={`group cursor-pointer ${isSelected ? 'ring-2 ring-gray-500 ring-offset-2 rounded-lg p-2' : 'p-2'}`}
      layout
    >
      <label className="block text-sm font-semibold text-black dark:text-white mb-3">
        {component.label}
        {component.required && <span className="text-red-500 ml-1 text-base">*</span>}
      </label>
      <motion.div
        className="relative"
        {...animationProps}
      >
        <input
          type="file"
          accept={component.accept}
          multiple={component.multiple}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          id={`file-${component.id}`}
        />
        <motion.label
          htmlFor={`file-${component.id}`}
          className={`flex flex-col items-center justify-center w-full px-6 py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 
                     rounded-lg cursor-pointer bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500
                     transition-all duration-300 group-hover:border-gray-400 dark:group-hover:border-gray-500 shadow-sm hover:shadow-md`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="text-center">
            <motion.div 
              className="mx-auto mb-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors"
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </motion.div>
            <p className={`text-base text-gray-700 dark:text-gray-300 font-semibold group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors mb-2`}>
              {t('elements.common.clickToUpload')} {component.multiple ? 'files' : 'a file'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
              {component.accept === '*/*' ? t('elements.common.allFileTypes') : `${t('elements.common.typesAccepted')}: ${component.accept}`}
            </p>
          </div>
        </motion.label>
      </motion.div>
    </motion.div>
  );
};

export const RadioElement: React.FC<FormElementProps> = ({ component, isSelected, onClick }) => {
  const animationProps = getAnimationProps(component.style.animation);
  const isHorizontal = component.orientation === 'horizontal';

  return (
    <motion.div
      onClick={onClick}
      className={`group cursor-pointer ${isSelected ? 'ring-2 ring-gray-500 ring-offset-2 rounded-lg p-2' : 'p-2'}`}
      layout
    >
      <label className="block text-sm font-semibold text-black dark:text-white mb-4">
        {component.label}
        {component.required && <span className="text-red-500 ml-1 text-base">*</span>}
      </label>
      <motion.div 
        className={isHorizontal ? "flex flex-wrap gap-6" : "space-y-4"} 
        {...animationProps}
      >
        {component.options?.map((option, index) => (
          <motion.label 
            key={index} 
            className="flex items-center space-x-3 cursor-pointer group/radio p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="radio"
              name={component.id}
              value={option}
              className="w-5 h-5 text-gray-600 border-2 border-gray-300 dark:border-gray-600 focus:ring-gray-500 focus:ring-2 focus:ring-offset-2
                        transition-all duration-200 group-hover/radio:border-gray-400 dark:group-hover/radio:border-gray-500"
            />
            <span className={`text-gray-700 dark:text-gray-300 font-medium group-hover/radio:text-gray-800 dark:group-hover/radio:text-gray-200 transition-colors`}>
              {option}
            </span>
          </motion.label>
        ))}
      </motion.div>
    </motion.div>
  );
};

export const SelectElement: React.FC<FormElementProps> = ({ component, isSelected, onClick }) => {
  const sizeClasses = getSizeClasses(component.style.size);
  const borderClasses = getBorderClasses(component.style);
  const animationProps = getAnimationProps(component.style.animation);

  return (
    <motion.div
      onClick={onClick}
      className={`group cursor-pointer ${isSelected ? 'ring-2 ring-gray-500 ring-offset-2 rounded-lg p-2' : 'p-2'}`}
      layout
    >
      <label className="block text-sm font-semibold text-black dark:text-white mb-3">
        {component.label}
        {component.required && <span className="text-red-500 ml-1 text-base">*</span>}
      </label>
      <motion.select
        className={`w-full ${sizeClasses} ${borderClasses} bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md`}
        {...animationProps}
      >
        <option value="" className="text-gray-500">{component.placeholder}</option>
        {component.options?.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </motion.select>
    </motion.div>
  );
};

export const TextareaElement: React.FC<FormElementProps> = ({ component, isSelected, onClick }) => {
  const sizeClasses = getSizeClasses(component.style.size);
  const borderClasses = getBorderClasses(component.style);
  const animationProps = getAnimationProps(component.style.animation);

  return (
    <motion.div
      onClick={onClick}
      className={`group cursor-pointer ${isSelected ? 'ring-2 ring-gray-500 ring-offset-2 rounded-lg p-2' : 'p-2'}`}
      layout
    >
      <label className="block text-sm font-semibold text-black dark:text-white mb-3">
        {component.label}
        {component.required && <span className="text-red-500 ml-1 text-base">*</span>}
      </label>
      <motion.textarea
        placeholder={component.placeholder}
        rows={4}
        className={`w-full ${sizeClasses} ${borderClasses} bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 resize-vertical shadow-sm hover:shadow-md`}
        {...animationProps}
      />
    </motion.div>
  );
};

export const CheckboxElement: React.FC<FormElementProps> = ({ component, isSelected, onClick }) => {
  const animationProps = getAnimationProps(component.style.animation);

  return (
    <motion.div
      onClick={onClick}
      className={`group cursor-pointer ${isSelected ? 'ring-2 ring-gray-500 ring-offset-2 rounded-lg p-2' : 'p-2'}`}
      layout
    >
      <motion.label 
        className="flex items-center space-x-4 cursor-pointer group/checkbox p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-700" 
        {...animationProps}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative flex-shrink-0">
          <input
            type="checkbox"
            className="w-6 h-6 text-gray-600 border-2 border-gray-300 dark:border-gray-600 rounded-md focus:ring-gray-500 focus:ring-2 focus:ring-offset-2
                      transition-all duration-200 group-hover/checkbox:border-gray-400 dark:group-hover/checkbox:border-gray-500 group-hover/checkbox:shadow-md"
          />
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={false}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
          />
        </div>
        <span className={`text-gray-700 dark:text-gray-300 font-medium group-hover/checkbox:text-gray-800 dark:group-hover/checkbox:text-gray-200 transition-colors flex-1`}>
          {component.label}
          {component.required && <span className="text-red-500 ml-1 text-base">*</span>}
        </span>
      </motion.label>
    </motion.div>
  );
};

export const PasswordElement: React.FC<FormElementProps> = ({ component, isSelected, onClick }) => {
  const { t } = useTranslation();
  const sizeClasses = getSizeClasses(component.style.size);
  const borderClasses = getBorderClasses(component.style);
  const animationProps = getAnimationProps(component.style.animation);

  return (
    <motion.div
      onClick={onClick}
      className={`group cursor-pointer ${isSelected ? 'ring-2 ring-gray-500 ring-offset-2 rounded-lg p-2' : 'p-2'}`}
      layout
    >
      <label className="block text-sm font-semibold text-black dark:text-white mb-3">
        {component.label}
        {component.required && <span className="text-red-500 ml-1 text-base">*</span>}
      </label>
      <motion.input
        type="password"
        placeholder={component.placeholder}
        minLength={component.minLength}
        maxLength={component.maxLength}
        pattern={component.pattern}
        className={`w-full ${sizeClasses} ${borderClasses} bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md`}
        {...animationProps}
      />
      {(component.minLength || component.maxLength || component.pattern) && (
        <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-2 rounded">
          {component.minLength && <span className="block">{t('elements.password.requirements.minChars', { min: component.minLength })}</span>}
          {component.maxLength && <span className="block">{t('elements.password.requirements.maxChars', { max: component.maxLength })}</span>}
          {component.pattern && <span className="block">{t('elements.password.requirements.specificFormat')}</span>}
        </div>
      )}
    </motion.div>
  );
};

export const HiddenElement: React.FC<FormElementProps> = ({ component, isSelected, onClick }) => {
  const { t } = useTranslation();
  const animationProps = getAnimationProps(component.style.animation);

  return (
    <motion.div
      onClick={onClick}
      className={`group cursor-pointer ${isSelected ? 'ring-2 ring-gray-500 ring-offset-2 rounded-lg p-2' : 'p-2'}`}
      layout
    >
      <motion.div
        className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800"
        {...animationProps}
      >
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 bg-gray-400 dark:bg-gray-500 rounded opacity-60 flex-shrink-0"></div>
          <div className="flex-1">
            <span className="text-sm text-gray-700 dark:text-gray-300 font-semibold block">
              {t('elements.common.hiddenField')}: {component.label}
            </span>
            <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              {t('elements.common.hiddenValue')}: <span className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">{component.placeholder || t('elements.common.notDefined')}</span>
            </div>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-500 italic">
          {t('elements.common.invisible')}
        </div>
      </motion.div>
    </motion.div>
  );
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