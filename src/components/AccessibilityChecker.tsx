import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Shield, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useFormStore } from '../store/formStore';
import { FormComponent } from '../types';

interface AccessibilityIssue {
  id: string;
  componentId: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  suggestion: string;
}

export const AccessibilityChecker: React.FC = () => {
  const { t } = useTranslation();
  const { formData } = useFormStore();
  const [issues, setIssues] = useState<AccessibilityIssue[]>([]);

  const checkAccessibility = () => {
    const newIssues: AccessibilityIssue[] = [];

    formData.components.forEach(component => {
      // Check for missing labels
      if (!component.label || component.label.trim() === '') {
        newIssues.push({
          id: `${component.id}-no-label`,
          componentId: component.id,
          type: 'error',
          message: t('accessibility.issues.noLabel'),
          suggestion: t('accessibility.suggestions.addLabel')
        });
      }

      // Check for placeholder-only inputs
      if ((component.type === 'input' || component.type === 'email' || component.type === 'password') 
          && component.placeholder && (!component.label || component.label.trim() === '')) {
        newIssues.push({
          id: `${component.id}-placeholder-only`,
          componentId: component.id,
          type: 'warning',
          message: t('accessibility.issues.placeholderOnly'),
          suggestion: t('accessibility.suggestions.usePermanentLabel')
        });
      }

      // Check for required fields without indication
      if (component.required && component.label && !component.label.includes('*') && !component.label.toLowerCase().includes('requis')) {
        newIssues.push({
          id: `${component.id}-required-indication`,
          componentId: component.id,
          type: 'warning',
          message: t('accessibility.issues.requiredIndication'),
          suggestion: t('accessibility.suggestions.addAsterisk')
        });
      }

      // Check for color contrast (basic check)
      if (component.style.backgroundColor === component.style.textColor) {
        newIssues.push({
          id: `${component.id}-contrast`,
          componentId: component.id,
          type: 'error',
          message: t('accessibility.issues.insufficientContrast'),
          suggestion: t('accessibility.suggestions.ensureReadability')
        });
      }

      // Check for select without default option
      if (component.type === 'select' && (!component.placeholder || component.placeholder.trim() === '')) {
        newIssues.push({
          id: `${component.id}-select-default`,
          componentId: component.id,
          type: 'info',
          message: t('accessibility.issues.selectDefault'),
          suggestion: t('accessibility.suggestions.addDefaultOption')
        });
      }

      // Check for radio groups with insufficient options
      if (component.type === 'radio' && (!component.options || component.options.length < 2)) {
        newIssues.push({
          id: `${component.id}-radio-options`,
          componentId: component.id,
          type: 'warning',
          message: t('accessibility.issues.radioOptions'),
          suggestion: t('accessibility.suggestions.addMoreOptions')
        });
      }
    });

    // Check form-level issues
    if (formData.components.length === 0) {
      newIssues.push({
        id: 'form-empty',
        componentId: '',
        type: 'info',
        message: t('accessibility.issues.emptyForm'),
        suggestion: t('accessibility.suggestions.addComponents')
      });
    }

    // Check for form without submit button (this would be added in the preview)
    const hasSubmitButton = formData.components.some(c => c.type === 'submit');
    if (!hasSubmitButton && formData.components.length > 0) {
      newIssues.push({
        id: 'form-no-submit',
        componentId: '',
        type: 'warning',
        message: t('accessibility.issues.noSubmit'),
        suggestion: t('accessibility.suggestions.submitAutoAdded')
      });
    }

    setIssues(newIssues);
  };

  useEffect(() => {
    checkAccessibility();
  }, [formData]);

  const getIssueIcon = (type: AccessibilityIssue['type']) => {
    switch (type) {
      case 'error': return AlertTriangle;
      case 'warning': return Info;
      case 'info': return CheckCircle;
      default: return Info;
    }
  };

  const getIssueColor = (type: AccessibilityIssue['type']) => {
    switch (type) {
      case 'error': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      case 'info': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const errorCount = issues.filter(i => i.type === 'error').length;
  const warningCount = issues.filter(i => i.type === 'warning').length;
  const infoCount = issues.filter(i => i.type === 'info').length;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Shield className="w-5 h-5 text-black dark:text-white" />
        <h3 className="text-lg font-semibold text-black dark:text-white">
          {t('accessibility.title')}
        </h3>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-red-700 dark:text-red-300">{t('accessibility.errors')}</span>
          </div>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">{errorCount}</div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">{t('accessibility.warnings')}</span>
          </div>
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{warningCount}</div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{t('accessibility.info')}</span>
          </div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{infoCount}</div>
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {issues.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
            <p className="text-green-600 dark:text-green-400 font-medium">
              {t('accessibility.noIssues')}
            </p>
            <p className="text-sm text-black/60 dark:text-white/60 mt-1">
              {t('accessibility.respectsStandards')}
            </p>
          </div>
        ) : (
          issues.map(issue => {
            const Icon = getIssueIcon(issue.type);
            const component = formData.components.find(c => c.id === issue.componentId);
            
            return (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 border border-black/10 dark:border-white/10 rounded-lg bg-white dark:bg-black"
              >
                <div className="flex items-start space-x-3">
                  <Icon className={`w-5 h-5 mt-0.5 ${getIssueColor(issue.type)}`} />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-black dark:text-white">
                        {issue.message}
                      </span>
                      {component && (
                        <span className="text-xs bg-black/10 dark:bg-white/10 px-2 py-1 rounded">
                          {component.label || component.type}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-black/60 dark:text-white/60">
                      {issue.suggestion}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Accessibility Tips */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
          {t('accessibility.tips.title')}
        </h4>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          {t('accessibility.tips.items', { returnObjects: true }).map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
        
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
            {t('accessibility.note.title')}
          </h5>
          <p className="text-xs text-yellow-700 dark:text-yellow-300">
            {t('accessibility.note.description')}
          </p>
        </div>
      </div>
    </div>
  );
};