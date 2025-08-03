import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Check, Plus, Trash2 } from 'lucide-react';
import { useFormStore } from '../store/formStore';
import { FormStep } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const MultiStepForm: React.FC = () => {
  const { t } = useTranslation();
  const { formData, setFormData, assignComponentToStep } = useFormStore();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = formData.steps || [];
  const totalSteps = steps.length;

  const addStep = () => {
    const newStep: FormStep = {
      id: uuidv4(),
      title: `${t('steps.stepTitle', { number: steps.length + 1 })}`,
      description: t('steps.stepDescription'),
      componentIds: []
    };

    setFormData({
      steps: [...steps, newStep]
    });
  };

  const updateStep = (stepId: string, updates: Partial<FormStep>) => {
    const updatedSteps = steps.map(step =>
      step.id === stepId ? { ...step, ...updates } : step
    );
    setFormData({ steps: updatedSteps });
  };

  const removeStep = (stepId: string) => {
    const updatedSteps = steps.filter(step => step.id !== stepId);
    setFormData({ steps: updatedSteps });
    if (currentStep >= updatedSteps.length) {
      setCurrentStep(Math.max(0, updatedSteps.length - 1));
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  // Drop zone for components
  const [{ isOver }, drop] = useDrop({
    accept: 'formComponent',
    drop: (item: { id: string; type: string }) => {
      if (steps[currentStep]) {
        assignComponentToStep(item.id, steps[currentStep].id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  if (steps.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">📋</div>
        <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
          {t('steps.title')}
        </h3>
        <p className="text-black/60 dark:text-white/60 mb-4">
          {t('steps.description')}
        </p>
        <button
          onClick={addStep}
          className="flex items-center space-x-2 px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all duration-200 mx-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t('steps.createFirst')}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Step Progress */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-black dark:text-white">
          {t('steps.title')}
        </h3>
        <button
          onClick={addStep}
          className="flex items-center space-x-2 px-3 py-2 bg-black/5 dark:bg-white/5 text-black dark:text-white rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>{t('steps.addStep')}</span>
        </button>
      </div>

      {/* Step Navigation */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => goToStep(index)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
              currentStep === index
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'bg-black/5 dark:bg-white/5 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10'
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              currentStep === index
                ? 'bg-white text-black dark:bg-black dark:text-white'
                : 'bg-black/10 dark:bg-white/10'
            }`}>
              {index < currentStep ? <Check className="w-3 h-3" /> : index + 1}
            </div>
            <span className="text-sm">{step.title}</span>
          </button>
        ))}
      </div>

      {/* Current Step Content */}
      <AnimatePresence mode="wait">
        {steps[currentStep] && (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-lg p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={steps[currentStep].title}
                  onChange={(e) => updateStep(steps[currentStep].id, { title: e.target.value })}
                  className="text-xl font-semibold bg-transparent border-none outline-none text-black dark:text-white w-full"
                />
                <textarea
                  value={steps[currentStep].description || ''}
                  onChange={(e) => updateStep(steps[currentStep].id, { description: e.target.value })}
                  placeholder="Step description..."
                  className="mt-2 w-full bg-transparent border-none outline-none text-black/60 dark:text-white/60 resize-none"
                  rows={2}
                />
              </div>
              <button
                onClick={() => removeStep(steps[currentStep].id)}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Components in this step */}
            <div className="space-y-4">
              <h4 className="font-medium text-black dark:text-white">
                {t('steps.componentsInStep', { count: formData.components.filter(c => c.stepId === steps[currentStep].id).length })}
              </h4>
              
              <div 
                ref={drop}
                className={`text-center py-8 border-2 border-dashed rounded-lg transition-all duration-200 ${
                  isOver 
                    ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-black/10 dark:border-white/10'
                }`}
              >
                {formData.components.filter(c => c.stepId === steps[currentStep].id).length === 0 ? (
                  <p className="text-black/60 dark:text-white/60">
                    {isOver ? t('steps.releaseToAssign') : t('steps.dragComponents')}
                  </p>
                ) : (
                  <div className="space-y-2">
                    {formData.components
                      .filter(c => c.stepId === steps[currentStep].id)
                      .map(component => (
                        <div
                          key={component.id}
                          className="flex items-center justify-between p-3 bg-black/5 dark:bg-white/5 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-black dark:text-white font-medium">{component.label}</span>
                            <span className="text-xs text-black/50 dark:text-white/50 bg-black/10 dark:bg-white/10 px-2 py-1 rounded">
                              {component.type}
                            </span>
                          </div>
                          <button
                            onClick={() => assignComponentToStep(component.id, null)}
                            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded transition-colors"
                            title={t('steps.removeFromStep')}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    {isOver && (
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded-lg">
                        <p className="text-blue-700 dark:text-blue-300 text-sm font-medium">
                          {t('steps.addComponentToStep')}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step Navigation Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center space-x-2 px-4 py-2 bg-black/5 dark:bg-white/5 text-black dark:text-white rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t('steps.previous')}</span>
        </button>

        <div className="text-sm text-black/60 dark:text-white/60">
          {t('steps.step')} {currentStep + 1} {t('steps.of')} {totalSteps}
        </div>

        <button
          onClick={nextStep}
          disabled={currentStep === totalSteps - 1}
          className="flex items-center space-x-2 px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{t('steps.next')}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};