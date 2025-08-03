import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FormComponent } from '../types';

interface FormElementProps {
  component: FormComponent;
  isSelected?: boolean;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

export const RichTextEditorElement: React.FC<FormElementProps> = ({ 
  component, 
  isSelected, 
  onClick 
}) => {
  const { t } = useTranslation();
  const [content, setContent] = useState('');
  const height = component.richTextOptions?.height || 200;
  const placeholder = component.richTextOptions?.placeholder || component.placeholder || 'Entrez votre texte...';

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
      
      <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
        {/* Toolbar placeholder */}
        <div className="border-b border-gray-200 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800">
          <div className="flex space-x-2">
            <button className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm font-bold">
              B
            </button>
            <button className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm italic">
              I
            </button>
            <button className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm underline">
              U
            </button>
            <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>
            <button className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm">
              📝
            </button>
            <button className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm">
              🔗
            </button>
          </div>
        </div>
        
        {/* Editor area */}
        <motion.textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className="w-full p-4 border-none outline-none resize-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-0"
          style={{ height: `${height}px` }}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Status bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800">
          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <span>{t('elements.richTextEditor.characters', { count: content.length })}</span>
            <span>📝 Rich text editor</span>
          </div>
        </div>
      </div>
      
      <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
        {t('elements.richTextEditor.demo')}
      </div>
    </motion.div>
  );
};