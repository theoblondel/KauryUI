import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Settings, Palette, Code, Copy, Check, Download, Sun, Moon, Monitor, Smartphone, Shield, Layers, Database, Heart } from 'lucide-react';
import { useFormStore } from '../store/formStore';
import { useTheme } from '../contexts/ThemeContext';
import { StyleCustomizer } from './StyleCustomizer';
import { ResponsivePreview } from './ResponsivePreview';
import { MultiStepForm } from './MultiStepForm';
import { AccessibilityChecker } from './AccessibilityChecker';

const colorOptions = [
  { name: 'White', value: 'white', preview: '#ffffff' },
  { name: 'Black', value: 'black', preview: '#000000' },
];

const borderColors = [
  { name: 'Black', value: 'black', preview: '#000000' },
  { name: 'White', value: 'white', preview: '#ffffff' },
];

interface PropertiesPanelProps {
  onStepChange?: (stepId: string | null) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ onStepChange }) => {
  const { t } = useTranslation();
  const { 
    formData, 
    selectedComponent, 
    updateComponent, 
    setFormData, 
    saveToLocalStorage, 
    resetForm 
  } = useFormStore();
  
  const { theme, setTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'component' | 'style' | 'responsive' | 'steps' | 'accessibility' | 'integrations' | 'export'>('form');

  const selectedComp = formData.components.find(c => c.id === selectedComponent);

  const generateJSX = () => {
    const jsxComponents = formData.components.map(comp => {
      const sizeClass = comp.style.size === 'sm' ? 'px-3 py-2 text-sm' : 
                       comp.style.size === 'lg' ? 'px-4 py-3 text-lg' : 'px-4 py-2.5';
      
      const borderClass = `rounded-${comp.style.borderRadius} border-${comp.style.borderWidth} border-${comp.style.borderColor}`;
      
      switch (comp.type) {
        case 'input':
          return `        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ${comp.label}${comp.required ? ' <span className="text-red-500">*</span>' : ''}
          </label>
          <input
            type="text"
            placeholder="${comp.placeholder}"
            ${comp.minLength ? `minLength={${comp.minLength}}` : ''}
            ${comp.maxLength ? `maxLength={${comp.maxLength}}` : ''}
            ${comp.pattern ? `pattern="${comp.pattern}"` : ''}
            className="w-full ${sizeClass} ${borderClass} bg-${comp.style.backgroundColor} text-${comp.style.textColor} focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
            ${comp.required ? 'required' : ''}
          />
        </div>`;

        case 'password':
          return `        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ${comp.label}${comp.required ? ' <span className="text-red-500">*</span>' : ''}
          </label>
          <input
            type="password"
            placeholder="${comp.placeholder}"
            ${comp.minLength ? `minLength={${comp.minLength}}` : ''}
            ${comp.maxLength ? `maxLength={${comp.maxLength}}` : ''}
            ${comp.pattern ? `pattern="${comp.pattern}"` : ''}
            className="w-full ${sizeClass} ${borderClass} bg-${comp.style.backgroundColor} text-${comp.style.textColor} focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
            ${comp.required ? 'required' : ''}
          />
        </div>`;

        case 'hidden':
          return `        <input type="hidden" name="${comp.id}" value="${comp.value || ''}" />`;

        case 'email':
          return `        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ${comp.label}${comp.required ? ' <span className="text-red-500">*</span>' : ''}
          </label>
          <input
            type="email"
            placeholder="${comp.placeholder}"
            ${comp.minLength ? `minLength={${comp.minLength}}` : ''}
            ${comp.maxLength ? `maxLength={${comp.maxLength}}` : ''}
            ${comp.pattern ? `pattern="${comp.pattern}"` : ''}
            className="w-full ${sizeClass} ${borderClass} bg-${comp.style.backgroundColor} text-${comp.style.textColor} focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
            ${comp.required ? 'required' : ''}
          />
        </div>`;

        case 'phone':
          return `        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ${comp.label}${comp.required ? ' <span className="text-red-500">*</span>' : ''}
          </label>
          <input
            type="tel"
            placeholder="${comp.placeholder}"
            ${comp.minLength ? `minLength={${comp.minLength}}` : ''}
            ${comp.maxLength ? `maxLength={${comp.maxLength}}` : ''}
            ${comp.pattern ? `pattern="${comp.pattern}"` : ''}
            className="w-full ${sizeClass} ${borderClass} bg-${comp.style.backgroundColor} text-${comp.style.textColor} focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
            ${comp.required ? 'required' : ''}
          />
        </div>`;

        case 'select':
          return `        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ${comp.label}${comp.required ? ' <span className="text-red-500">*</span>' : ''}
          </label>
          <select className="w-full ${sizeClass} ${borderClass} bg-${comp.style.backgroundColor} text-${comp.style.textColor} focus:ring-2 focus:ring-violet-500 focus:border-violet-500" ${comp.required ? 'required' : ''}>
            <option value="">${comp.placeholder}</option>
${comp.options?.map(opt => `            <option value="${opt}">${opt}</option>`).join('\n')}
          </select>
        </div>`;

        case 'textarea':
          return `        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ${comp.label}${comp.required ? ' <span className="text-red-500">*</span>' : ''}
          </label>
          <textarea
            placeholder="${comp.placeholder}"
            rows={4}
            className="w-full ${sizeClass} ${borderClass} bg-${comp.style.backgroundColor} text-${comp.style.textColor} focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
            ${comp.required ? 'required' : ''}
          />
        </div>`;

        case 'checkbox':
          return `        <div className="mb-6">
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="w-5 h-5 text-violet-600 border-2 border-gray-300 rounded focus:ring-violet-500 focus:ring-2" ${comp.required ? 'required' : ''} />
            <span className="text-${comp.style.textColor} font-medium">
              ${comp.label}${comp.required ? ' <span className="text-red-500">*</span>' : ''}
            </span>
          </label>
        </div>`;

        case 'radio':
          return `        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ${comp.label}${comp.required ? ' <span className="text-red-500">*</span>' : ''}
          </label>
          <div className="${comp.orientation === 'horizontal' ? 'flex flex-wrap gap-4' : 'space-y-3'}">
${comp.options?.map(opt => `            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="radio" name="${comp.id}" value="${opt}" className="w-5 h-5 text-violet-600 border-2 border-gray-300 focus:ring-violet-500 focus:ring-2" ${comp.required ? 'required' : ''} />
              <span className="text-${comp.style.textColor} font-medium">${opt}</span>
            </label>`).join('\n')}
          </div>
        </div>`;
      }
    }).join('\n');

    return `import React from 'react';

const ${formData.name.replace(/\s+/g, '')}Form = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gérer la soumission du formulaire
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">${formData.name}</h2>
      
${jsxComponents}
      
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-violet-700 hover:to-blue-700 transition-all duration-200"
      >
        Envoyer
      </button>
    </form>
  );
};

export default ${formData.name.replace(/\s+/g, '')}Form;`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateJSX());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const downloadCode = () => {
    const jsx = generateJSX();
    const blob = new Blob([jsx], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.name.replace(/\s+/g, '')}.jsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    const jsonData = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.name.replace(/\s+/g, '')}-form.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyJSONToClipboard = async () => {
    try {
      const jsonData = JSON.stringify(formData, null, 2);
      await navigator.clipboard.writeText(jsonData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie JSON:', err);
    }
  };

  const themeIcons = {
    light: Sun,
    dark: Moon,
    auto: Monitor
  };

  return (
    <div className="w-full lg:w-96 xl:w-[28rem] bg-white dark:bg-black border-l border-black/10 dark:border-white/10 overflow-y-auto h-full scrollbar-hide">
      {/* Header */}
      <div className="py-4 px-6 border-b border-black/10 dark:border-white/10">
        <h2 className="text-lg font-semibold text-black dark:text-white flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          {t('formBuilder.properties.title')}
        </h2>
        <p className="text-sm text-black/60 dark:text-white/60 mt-1">
          {t('formBuilder.properties.subtitle')}
        </p>
      </div>

      {/* Tabs */}
      <div className="py-3 px-4 border-b border-black/10 dark:border-white/10">
        <div className="grid grid-cols-2 gap-3">
        {[
          { id: 'form', label: t('formBuilder.properties.tabs.form'), icon: Settings },
          { id: 'component', label: t('formBuilder.properties.tabs.component'), icon: Palette },
          { id: 'style', label: t('formBuilder.properties.tabs.style'), icon: Layers },
          { id: 'steps', label: t('formBuilder.properties.tabs.steps'), icon: Layers },
          { id: 'accessibility', label: t('formBuilder.properties.tabs.accessibility'), icon: Shield },
          { id: 'integrations', label: t('formBuilder.properties.tabs.integrations'), icon: Database },
          { id: 'export', label: t('formBuilder.properties.tabs.export'), icon: Code }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center justify-center py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg transform scale-105'
                  : 'text-black/70 dark:text-white/70 bg-black/5 dark:bg-white/5 hover:text-gray-600 dark:hover:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/20 hover:scale-102'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              <span>{tab.label}</span>
            </button>
          );
        })}
        </div>
      </div>

      {/* Content */}
      <div className="py-4 px-6">
      {/* Form Settings Tab */}
      {activeTab === 'form' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              {t('formBuilder.properties.form.name')}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ name: e.target.value })}
              className="w-full px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-3">
              {t('formBuilder.properties.form.theme')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['light', 'dark', 'auto'] as const).map(t => {
                const Icon = themeIcons[t];
                return (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300 ${
                      theme === t
                        ? 'border-gray-500 bg-gray-50 dark:border-gray-400 dark:bg-gray-900/20 shadow-lg transform scale-105'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900/10 hover:shadow-sm'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-1 ${theme === t ? 'text-gray-600 dark:text-gray-400' : 'text-gray-600 dark:text-gray-400'}`} />
                    <span className={`text-xs capitalize font-medium ${theme === t ? 'text-gray-600 dark:text-gray-400' : 'text-gray-600 dark:text-gray-400'}`}>
                      {t}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-3">
              {t('formBuilder.properties.form.globalStyle')}
            </label>
            <select
              value={formData.globalStyle}
              onChange={(e) => setFormData({ globalStyle: e.target.value as any })}
              className="w-full px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
            >
              <option value="minimal">Minimal</option>
              <option value="glass">Glass</option>
              <option value="neumorphism">Neumorphism</option>
              <option value="outline">Outline</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-3">
              {t('formBuilder.properties.form.columns')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map(cols => (
                <button
                 onClick={() => window.open('https://buy.stripe.com/5kAaIo03wgAb2S4aEW', '_blank')}
                  key={cols}
                  onClick={() => setFormData({ formColumns: cols })}
                  className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300 ${
                    (formData.formColumns || 1) === cols
                      ? 'border-gray-500 bg-gray-50 dark:border-gray-400 dark:bg-gray-900/20 shadow-lg transform scale-105'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900/10 hover:shadow-sm'
                  }`}
                >
                  <div className="flex space-x-1 mb-2">
                    {Array.from({ length: cols }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-6 rounded-sm ${
                          (formData.formColumns || 1) === cols
                            ? 'bg-gray-600 dark:bg-gray-400'
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`text-xs font-medium ${
                    (formData.formColumns || 1) === cols
                      ? 'text-gray-600 dark:text-gray-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {cols} column{cols > 1 ? 's' : ''}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs text-black/60 dark:text-white/60 mt-2">
              {t('formBuilder.properties.form.columnsDescription')}
            </p>
          </div>
        </motion.div>
      )}

      {/* Component Settings Tab */}
      {activeTab === 'component' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {selectedComp ? (
            <>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  {t('formBuilder.properties.component.label')}
                </label>
                <input
                  type="text"
                  value={selectedComp.label}
                  onChange={(e) => updateComponent(selectedComp.id, { label: e.target.value })}
                  className="w-full px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>

              {selectedComp.type !== 'checkbox' && (
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    {t('formBuilder.properties.component.placeholder')}
                  </label>
                  <input
                    type="text"
                    value={selectedComp.placeholder || ''}
                    onChange={(e) => updateComponent(selectedComp.id, { placeholder: e.target.value })}
                    className="w-full px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>
              )}

              {/* Layout Section */}
              <div className="border-t border-black/10 dark:border-white/10 pt-6">
                <h4 className="text-sm font-semibold text-black dark:text-white mb-4">{t('formBuilder.properties.component.layout')}</h4>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    {t('formBuilder.properties.component.width')}
                  </label>
                  <select
                    value={selectedComp.layoutColumnSpan || 1}
                    onChange={(e) => updateComponent(selectedComp.id, { layoutColumnSpan: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                  >
                    <option value={1}>{t('formBuilder.properties.component.widthOptions.one')}</option>
                    <option value={2}>{t('formBuilder.properties.component.widthOptions.two')}</option>
                  </select>
                  <p className="text-xs text-black/60 dark:text-white/60 mt-1">
                    Defines the component width in the grid
                  </p>
                </div>
              </div>

              <div className="border-t border-black/10 dark:border-white/10 pt-6">
                <h4 className="text-sm font-semibold text-black dark:text-white mb-4">{t('formBuilder.properties.component.advanced')}</h4>
              {(selectedComp.type === 'number' || selectedComp.type === 'range') && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">
                      {t('formBuilder.properties.validation.minValue')}
                    </label>
                    <input
                      type="number"
                      value={selectedComp.min || 0}
                      onChange={(e) => updateComponent(selectedComp.id, { min: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">
                      {t('formBuilder.properties.validation.maxValue')}
                    </label>
                    <input
                      type="number"
                      value={selectedComp.max || 100}
                      onChange={(e) => updateComponent(selectedComp.id, { max: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">
                      {t('formBuilder.properties.validation.step')}
                    </label>
                    <input
                      type="number"
                      value={selectedComp.step || 1}
                      onChange={(e) => updateComponent(selectedComp.id, { step: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                  </div>
                </>
              )}
              </div>

              {selectedComp.type === 'file' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">
                      {t('formBuilder.properties.file.acceptedTypes')}
                    </label>
                    <input
                      type="text"
                      value={selectedComp.accept || '*/*'}
                      onChange={(e) => updateComponent(selectedComp.id, { accept: e.target.value })}
                      placeholder="image/*,.pdf,.doc"
                      className="w-full px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="multiple"
                      checked={selectedComp.multiple || false}
                      onChange={(e) => updateComponent(selectedComp.id, { multiple: e.target.checked })}
                      className="w-4 h-4 text-black dark:text-white border-black/10 dark:border-white/10 rounded focus:ring-black dark:focus:ring-white"
                    />
                    <label htmlFor="multiple" className="ml-2 text-sm text-black dark:text-white">
                      {t('formBuilder.properties.file.multipleFiles')}
                    </label>
                  </div>
                </>
              )}

              <div className="border-t border-black/10 dark:border-white/10 pt-6">
                <h4 className="text-sm font-semibold text-black dark:text-white mb-4">{t('formBuilder.properties.component.validation')}</h4>
              {(selectedComp.type === 'input' || selectedComp.type === 'email' || selectedComp.type === 'phone' || selectedComp.type === 'password') && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">
                      {t('formBuilder.properties.validation.minLength')}
                    </label>
                    <input
                      type="number"
                      value={selectedComp.minLength || ''}
                      onChange={(e) => updateComponent(selectedComp.id, { 
                        minLength: e.target.value ? parseInt(e.target.value) : undefined 
                      })}
                      className="w-full px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                      placeholder="Ex: 3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">
                      {t('formBuilder.properties.validation.maxLength')}
                    </label>
                    <input
                      type="number"
                      value={selectedComp.maxLength || ''}
                      onChange={(e) => updateComponent(selectedComp.id, { 
                        maxLength: e.target.value ? parseInt(e.target.value) : undefined 
                      })}
                      className="w-full px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                      placeholder="Ex: 50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">
                      {t('formBuilder.properties.validation.pattern')}
                    </label>
                    <input
                      type="text"
                      value={selectedComp.pattern || ''}
                      onChange={(e) => updateComponent(selectedComp.id, { pattern: e.target.value })}
                      className="w-full px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                      placeholder="Ex: [A-Za-z0-9]+"
                    />
                  </div>

                  {/* Advanced Validation */}
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">
                      {t('formBuilder.properties.validation.customRegex')}
                    </label>
                    <input
                      type="text"
                      value={selectedComp.customValidationRegex || ''}
                      onChange={(e) => updateComponent(selectedComp.id, { customValidationRegex: e.target.value })}
                      className="w-full px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                      placeholder="Ex: ^[A-Z]{2}[0-9]{4}$"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">
                      {t('formBuilder.properties.validation.customMessage')}
                    </label>
                    <input
                      type="text"
                      value={selectedComp.customValidationMessage || ''}
                      onChange={(e) => updateComponent(selectedComp.id, { customValidationMessage: e.target.value })}
                      className="w-full px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                      placeholder="Ex: Le format doit être XX0000"
                    />
                  </div>
                </>
              )}
              </div>

              {selectedComp.type === 'hidden' && (
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    {t('formBuilder.properties.hidden.value')}
                  </label>
                  <input
                    type="text"
                    value={selectedComp.value || ''}
                    onChange={(e) => updateComponent(selectedComp.id, { value: e.target.value })}
                    className="w-full px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                    placeholder="Hidden field value"
                  />
                </div>
              )}

              <div className="border-t border-black/10 dark:border-white/10 pt-6">
                <h4 className="text-sm font-semibold text-black dark:text-white mb-4">Options</h4>
                <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="required"
                  checked={selectedComp.required}
                  onChange={(e) => updateComponent(selectedComp.id, { required: e.target.checked })}
                  className="w-4 h-4 text-black dark:text-white border-black/10 dark:border-white/10 rounded focus:ring-black dark:focus:ring-white"
                />
                <label htmlFor="required" className="ml-2 text-sm text-black dark:text-white">
                  {t('formBuilder.properties.component.required')}
                </label>
              </div>
              </div>

              {selectedComp.type === 'radio' && (
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-3">
                    {t('formBuilder.properties.component.orientation')}
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`orientation-${selectedComp.id}`}
                        value="vertical"
                        checked={selectedComp.orientation === 'vertical'}
                        onChange={(e) => updateComponent(selectedComp.id, { orientation: 'vertical' })}
                        className="w-4 h-4 text-black dark:text-white border-black/10 dark:border-white/10 focus:ring-black dark:focus:ring-white"
                      />
                      <span className="ml-2 text-sm text-black dark:text-white">{t('formBuilder.properties.component.vertical')}</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`orientation-${selectedComp.id}`}
                        value="horizontal"
                        checked={selectedComp.orientation === 'horizontal'}
                        onChange={(e) => updateComponent(selectedComp.id, { orientation: 'horizontal' })}
                        className="w-4 h-4 text-black dark:text-white border-black/10 dark:border-white/10 focus:ring-black dark:focus:ring-white"
                      />
                      <span className="ml-2 text-sm text-black dark:text-white">{t('formBuilder.properties.component.horizontal')}</span>
                    </label>
                  </div>
                </div>
              )}

              <div className="border-t border-black/10 dark:border-white/10 pt-6">
                <h4 className="text-sm font-semibold text-black dark:text-white mb-4">{t('formBuilder.properties.component.appearance')}</h4>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  {t('formBuilder.properties.component.size')}
                </label>
                <select
                  value={selectedComp.style.size}
                  onChange={(e) => updateComponent(selectedComp.id, { 
                    style: { ...selectedComp.style, size: e.target.value as any } 
                  })}
                  className="w-full px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                >
                  <option value="sm">{t('formBuilder.properties.component.sizeOptions.small')}</option>
                  <option value="md">{t('formBuilder.properties.component.sizeOptions.medium')}</option>
                  <option value="lg">{t('formBuilder.properties.component.sizeOptions.large')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-3">
                  {t('formBuilder.properties.component.backgroundColor')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {colorOptions.map(color => (
                    <button
                      key={color.value}
                      onClick={() => updateComponent(selectedComp.id, { 
                        style: { ...selectedComp.style, backgroundColor: color.value } 
                      })}
                      className={`flex items-center p-2 rounded-md border-2 transition-all duration-200 ${
                        selectedComp.style.backgroundColor === color.value
                          ? 'border-gray-500 shadow-md transform scale-105'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm'
                      }`}
                    >
                      <div 
                        className="w-4 h-4 rounded mr-2 border"
                        style={{ backgroundColor: color.preview }}
                      />
                      <span className="text-xs text-black dark:text-white">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-3">
                  {t('formBuilder.properties.component.borderColor')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {borderColors.map(color => (
                    <button
                      key={color.value}
                      onClick={() => updateComponent(selectedComp.id, { 
                        style: { ...selectedComp.style, borderColor: color.value } 
                      })}
                      className={`flex items-center p-2 rounded-md border-2 transition-all duration-200 ${
                        selectedComp.style.borderColor === color.value
                          ? 'border-gray-500 shadow-md transform scale-105'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm'
                      }`}
                    >
                      <div 
                        className="w-4 h-4 rounded mr-2 border-2"
                        style={{ borderColor: color.preview }}
                      />
                      <span className="text-xs text-black dark:text-white">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  {t('formBuilder.properties.component.animation')}
                </label>
                <select
                  value={selectedComp.style.animation}
                  onChange={(e) => updateComponent(selectedComp.id, { 
                    style: { ...selectedComp.style, animation: e.target.value as any } 
                  })}
                  className="w-full px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                >
                  <option value="none">{t('formBuilder.properties.component.animationOptions.none')}</option>
                  <option value="bounce">{t('formBuilder.properties.component.animationOptions.bounce')}</option>
                  <option value="scale">{t('formBuilder.properties.component.animationOptions.scale')}</option>
                  <option value="slide">{t('formBuilder.properties.component.animationOptions.slide')}</option>
                  <option value="fade-in">{t('formBuilder.properties.component.animationOptions.fadeIn')}</option>
                  <option value="pulse">{t('formBuilder.properties.component.animationOptions.pulse')}</option>
                  <option value="wobble">{t('formBuilder.properties.component.animationOptions.wobble')}</option>
                  <option value="flip">{t('formBuilder.properties.component.animationOptions.flip')}</option>
                  <option value="shake">{t('formBuilder.properties.component.animationOptions.shake')}</option>
                  <option value="glow">{t('formBuilder.properties.component.animationOptions.glow')}</option>
                  <option value="float">{t('formBuilder.properties.component.animationOptions.float')}</option>
                  <option value="rotate">{t('formBuilder.properties.component.animationOptions.rotate')}</option>
                  <option value="elastic">{t('formBuilder.properties.component.animationOptions.elastic')}</option>
                  <option value="magnetic">{t('formBuilder.properties.component.animationOptions.magnetic')}</option>
                  <option value="morphing">{t('formBuilder.properties.component.animationOptions.morphing')}</option>
                  <option value="ripple">{t('formBuilder.properties.component.animationOptions.ripple')}</option>
                </select>
              </div>
              </div>

              {(selectedComp.type === 'select' || selectedComp.type === 'radio') && (
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    Options (one per line)
                  </label>
                  <textarea
                    value={selectedComp.options?.join('\n') || ''}
                    onChange={(e) => updateComponent(selectedComp.id, { 
                      options: e.target.value.split('\n').filter(o => o.trim()) 
                    })}
                    rows={4}
                    className="w-full px-3 py-2 border border-black/10 dark:border-white/10 rounded-md bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <Palette className="w-16 h-16 text-black/30 dark:text-white/30 mx-auto mb-4" />
              <p className="text-black dark:text-white">
                {t('formBuilder.properties.selectComponent')}
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Style Customization Tab */}
      {activeTab === 'style' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <StyleCustomizer />
        </motion.div>
      )}

      {/* Multi-Step Form Tab */}
      {activeTab === 'steps' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <MultiStepFormWithStepChange onStepChange={onStepChange} />
        </motion.div>
      )}

      {/* Accessibility Tab */}
      {activeTab === 'accessibility' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AccessibilityChecker />
        </motion.div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-black dark:text-white" />
            <h3 className="text-lg font-semibold text-black dark:text-white">
              {t('formBuilder.properties.tabs.integrations')}
            </h3>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2" />
              {t('integrations.supabase.title')}
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                  {t('integrations.supabase.url')}
                </label>
                <input
                  type="url"
                  value={formData.supabaseConfig?.url || ''}
                  onChange={(e) => setFormData({
                    supabaseConfig: {
                      ...formData.supabaseConfig,
                      url: e.target.value
                    }
                  })}
                  placeholder="https://votre-projet.supabase.co"
                  className="w-full px-3 py-2 border border-green-300 dark:border-green-700 rounded-md bg-white dark:bg-green-900/20 text-green-900 dark:text-green-100 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                  {t('integrations.supabase.anonKey')}
                </label>
                <input
                  type="password"
                  value={formData.supabaseConfig?.anonKey || ''}
                  onChange={(e) => setFormData({
                    supabaseConfig: {
                      ...formData.supabaseConfig,
                      anonKey: e.target.value
                    }
                  })}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full px-3 py-2 border border-green-300 dark:border-green-700 rounded-md bg-white dark:bg-green-900/20 text-green-900 dark:text-green-100 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                  {t('integrations.supabase.tableName')}
                </label>
                <input
                  type="text"
                  value={formData.supabaseConfig?.tableName || ''}
                  onChange={(e) => setFormData({
                    supabaseConfig: {
                      ...formData.supabaseConfig,
                      tableName: e.target.value
                    }
                  })}
                  placeholder="form_submissions"
                  className="w-full px-3 py-2 border border-green-300 dark:border-green-700 rounded-md bg-white dark:bg-green-900/20 text-green-900 dark:text-green-100 focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg">
              <p className="text-sm text-green-700 dark:text-green-300">
                <strong>{t('integrations.supabase.howToSetup')}</strong>
              </p>
              <ol className="text-xs text-green-600 dark:text-green-400 mt-2 space-y-1 list-decimal list-inside">
                {t('integrations.supabase.steps', { returnObjects: true }).map((step, index) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: step }} />
                ))}
              </ol>
            </div>

            {formData.supabaseConfig?.url && formData.supabaseConfig?.anonKey && (
              <div className="mt-4 p-3 bg-green-200 dark:bg-green-800/30 border border-green-300 dark:border-green-600 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200 font-medium">
                  {t('integrations.supabase.active')}
                </p>
                <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                  {t('integrations.supabase.activeDescription')}
                </p>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              {t('integrations.comingSoon.title')}
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              {t('integrations.comingSoon.items', { returnObjects: true }).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Responsive Preview Tab */}
      {activeTab === 'responsive' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5 text-black dark:text-white" />
            <h3 className="text-lg font-semibold text-black dark:text-white">
              {t('responsive.title')}
            </h3>
          </div>
          <p className="text-sm text-black/60 dark:text-white/60">
            {t('responsive.description')}
          </p>
        </motion.div>
      )}

      {/* Export Tab */}
      {activeTab === 'export' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
              {t('export.title')}
            </h3>
            <p className="text-sm text-black dark:text-white mb-4">
              {t('export.description')}
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">{t('export.jsx.title')}</h4>
            <div className="space-y-3">
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center justify-center py-3 px-4 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition-colors duration-200"
            >
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? t('export.jsx.copied') : t('export.jsx.copy')}
            </button>

            <button
              onClick={downloadCode}
              className="w-full flex items-center justify-center py-3 px-4 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors duration-200"
            >
              <Download className="w-4 h-4 mr-2" />
              {t('export.jsx.download')}
            </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-xl p-6 border border-pink-200 dark:border-pink-800">
            <h4 className="font-semibold text-pink-800 dark:text-pink-200 mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2" />
              {t('export.support.title')}
            </h4>
            <p className="text-sm text-pink-700 dark:text-pink-300 mb-4">
              {t('export.support.description')}
            </p>
            <button
              onClick={() => window.open('https://buy.stripe.com/5kAaIo03wgAb2S4aEW', '_blank')}
              className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Heart className="w-4 h-4 mr-2" />
              {t('export.support.donate')}
            </button>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
              {t('export.support.securePayment')}
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{t('export.cdn.title')}</h4>
            <p className="text-xs text-gray-700 dark:text-gray-300 mb-2">
              {t('export.cdn.description')}
            </p>
            <code className="text-xs bg-gray-100 dark:bg-gray-900/50 text-gray-800 dark:text-gray-200 p-3 rounded-lg block font-mono break-all">
              https://cdn.kauryui.org/form-builder.js
            </code>

            <div className="text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-4">
                {t('export.cdn.poweredBy')}{' '}
                <a 
                  href="https://github.com/theoblondel/KauryUI" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 font-semibold transition-colors underline"
                >
                  KauryUI Framework
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      )}
      </div>
    </div>
  );
};

// Wrapper component to handle step change communication
const MultiStepFormWithStepChange: React.FC<{ onStepChange?: (stepId: string | null) => void }> = ({ onStepChange }) => {
  const { formData } = useFormStore();
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    const steps = formData.steps || [];
    const stepId = steps[currentStep]?.id || null;
    onStepChange?.(stepId);
  }, [currentStep, formData.steps, onStepChange]);
  
  return <MultiStepForm />;
};