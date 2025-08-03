import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Palette, Type, Space as Spacing, Layers, Zap } from 'lucide-react';
import { useFormStore } from '../store/formStore';

const fontFamilies = [
  { name: 'Inter', value: 'Inter, sans-serif' },
  { name: 'Roboto', value: 'Roboto, sans-serif' },
  { name: 'Open Sans', value: 'Open Sans, sans-serif' },
  { name: 'Poppins', value: 'Poppins, sans-serif' },
  { name: 'Montserrat', value: 'Montserrat, sans-serif' },
  { name: 'Lato', value: 'Lato, sans-serif' }
];

const colorPalettes = [
  {
    name: 'Modern',
    primary: '#333333',
    secondary: '#666666',
    accent: '#999999'
  },
  {
    name: 'Elegant',
    primary: '#1F2937',
    secondary: '#6B7280',
    accent: '#9CA3AF'
  },
  {
    name: 'Vibrant',
    primary: '#000000',
    secondary: '#404040',
    accent: '#808080'
  },
  {
    name: 'Ocean',
    primary: '#1F1F1F',
    secondary: '#4F4F4F',
    accent: '#7F7F7F'
  }
];

export const StyleCustomizer: React.FC = () => {
  const { t } = useTranslation();
  const { formData, setFormData } = useFormStore();
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'spacing' | 'effects'>('colors');

  const customStyles = formData.customStyles || {
    primaryColor: '#000000',
    secondaryColor: '#666666',
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
    spacing: '1rem',
    borderRadius: '0.5rem',
    shadows: true
  };

  const updateCustomStyles = (updates: Partial<typeof customStyles>) => {
    setFormData({
      customStyles: { ...customStyles, ...updates }
    });
  };

  const applyPalette = (palette: typeof colorPalettes[0]) => {
    updateCustomStyles({
      primaryColor: palette.primary,
      secondaryColor: palette.secondary
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Palette className="w-5 h-5 text-black dark:text-white" />
        <h3 className="text-lg font-semibold text-black dark:text-white">
          {t('style.title')}
        </h3>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-2 bg-black/5 dark:bg-white/5 p-2 rounded-lg">
        {[
          { id: 'colors', label: t('style.tabs.colors'), icon: Palette },
          { id: 'typography', label: t('style.tabs.typography'), icon: Type },
          { id: 'spacing', label: t('style.tabs.spacing'), icon: Spacing },
          { id: 'effects', label: t('style.tabs.effects'), icon: Layers }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center justify-center py-3 px-3 rounded-md text-xs font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-black text-black dark:text-white shadow-md'
                  : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 mr-1" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Colors Tab */}
      {activeTab === 'colors' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              {t('style.colors.predefinedPalettes')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {colorPalettes.map((palette, index) => (
                <button
                  key={index}
                  onClick={() => applyPalette(palette)}
                  className="p-3 rounded-lg border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-all duration-200"
                >
                  <div className="flex space-x-1 mb-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: palette.primary }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: palette.secondary }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: palette.accent }}
                    />
                  </div>
                  <span className="text-xs text-black dark:text-white">{palette.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              {t('style.colors.primaryColor')}
            </label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={customStyles.primaryColor}
                onChange={(e) => updateCustomStyles({ primaryColor: e.target.value })}
                className="w-12 h-10 rounded border border-black/10 dark:border-white/10"
              />
              <input
                type="text"
                value={customStyles.primaryColor}
                onChange={(e) => updateCustomStyles({ primaryColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              {t('style.colors.secondaryColor')}
            </label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={customStyles.secondaryColor}
                onChange={(e) => updateCustomStyles({ secondaryColor: e.target.value })}
                className="w-12 h-10 rounded border border-black/10 dark:border-white/10"
              />
              <input
                type="text"
                value={customStyles.secondaryColor}
                onChange={(e) => updateCustomStyles({ secondaryColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              {t('style.colors.submitButtonColor')}
            </label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={customStyles.submitButtonColor}
                onChange={(e) => updateCustomStyles({ submitButtonColor: e.target.value })}
                className="w-12 h-10 rounded border border-black/10 dark:border-white/10"
              />
              <input
                type="text"
                value={customStyles.submitButtonColor}
                onChange={(e) => updateCustomStyles({ submitButtonColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              {t('style.colors.submitButtonTextColor')}
            </label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={customStyles.submitButtonTextColor}
                onChange={(e) => updateCustomStyles({ submitButtonTextColor: e.target.value })}
                className="w-12 h-10 rounded border border-black/10 dark:border-white/10"
              />
              <input
                type="text"
                value={customStyles.submitButtonTextColor}
                onChange={(e) => updateCustomStyles({ submitButtonTextColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Typography Tab */}
      {activeTab === 'typography' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              {t('style.typography.fontFamily')}
            </label>
            <select
              value={customStyles.fontFamily}
              onChange={(e) => updateCustomStyles({ fontFamily: e.target.value })}
              className="w-full px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white"
            >
              {fontFamilies.map(font => (
                <option key={font.value} value={font.value}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              {t('style.typography.fontSize')}
            </label>
            <select
              value={customStyles.fontSize}
              onChange={(e) => updateCustomStyles({ fontSize: e.target.value })}
              className="w-full px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white"
            >
              <option value="14px">{t('style.typography.sizeOptions.small')}</option>
              <option value="16px">{t('style.typography.sizeOptions.normal')}</option>
              <option value="18px">{t('style.typography.sizeOptions.large')}</option>
              <option value="20px">{t('style.typography.sizeOptions.veryLarge')}</option>
            </select>
          </div>
        </motion.div>
      )}

      {/* Spacing Tab */}
      {activeTab === 'spacing' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              {t('style.spacing.general')}
            </label>
            <select
              value={customStyles.spacing}
              onChange={(e) => updateCustomStyles({ spacing: e.target.value })}
              className="w-full px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white"
            >
              <option value="0.5rem">{t('style.spacing.spacingOptions.compact')}</option>
              <option value="1rem">{t('style.spacing.spacingOptions.normal')}</option>
              <option value="1.5rem">{t('style.spacing.spacingOptions.comfortable')}</option>
              <option value="2rem">{t('style.spacing.spacingOptions.large')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              {t('style.spacing.borderRadius')}
            </label>
            <select
              value={customStyles.borderRadius}
              onChange={(e) => updateCustomStyles({ borderRadius: e.target.value })}
              className="w-full px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white"
            >
              <option value="0">{t('style.spacing.radiusOptions.none')}</option>
              <option value="0.25rem">{t('style.spacing.radiusOptions.small')}</option>
              <option value="0.5rem">{t('style.spacing.radiusOptions.normal')}</option>
              <option value="1rem">{t('style.spacing.radiusOptions.large')}</option>
              <option value="1.5rem">{t('style.spacing.radiusOptions.veryLarge')}</option>
            </select>
          </div>
        </motion.div>
      )}

      {/* Effects Tab */}
      {activeTab === 'effects' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-black dark:text-white">
              {t('style.effects.dropShadows')}
            </label>
            <button
              onClick={() => updateCustomStyles({ shadows: !customStyles.shadows })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                customStyles.shadows ? 'bg-black dark:bg-white' : 'bg-black/20 dark:bg-white/20'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-black transition-transform ${
                  customStyles.shadows ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};