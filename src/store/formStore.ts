import { create } from 'zustand';
import { FormComponent, FormData, FormHistory, ValidationRule, ExportOptions, AnalyticsData } from '../types';

interface FormStore {
  formData: FormData;
  selectedComponent: string | null;
  draggedComponent: ComponentTemplate | null;
  history: FormHistory[];
  historyIndex: number;
  clipboard: FormComponent | null;
  isAutoSaving: boolean;
  analytics: AnalyticsData;
  validationErrors: Record<string, string[]>;
  setFormData: (data: Partial<FormData>) => void;
  addComponent: (component: FormComponent) => void;
  updateComponent: (id: string, updates: Partial<FormComponent>) => void;
  removeComponent: (id: string) => void;
  reorderComponents: (startIndex: number, endIndex: number) => void;
  duplicateComponent: (id: string) => void;
  copyComponent: (id: string) => void;
  pasteComponent: () => void;
  setSelectedComponent: (id: string | null) => void;
  setDraggedComponent: (component: ComponentTemplate | null) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  addToHistory: (action: FormHistory['action'], componentId?: string) => void;
  validateForm: () => boolean;
  validateComponent: (component: FormComponent) => string[];
  exportForm: (options: ExportOptions) => string;
  importForm: (data: FormData) => void;
  autoSave: () => void;
  loadTemplate: (templateName: string) => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  resetForm: () => void;
  updateAnalytics: (data: Partial<AnalyticsData>) => void;
  assignComponentToStep: (componentId: string, stepId: string | null) => void;
}

interface ComponentTemplate {
  type: FormComponent['type'];
  label: string;
  icon: string;
  defaultProps: Partial<FormComponent>;
  category: 'basic' | 'advanced' | 'media' | 'location' | 'validation';
  isPremium?: boolean;
}

const defaultFormData: FormData = {
  id: 'form-1',
  name: 'My Form',
  components: [],
  theme: 'light',
  globalStyle: 'minimal',
  formColumns: 1,
  version: 1,
  analytics: {
    createdAt: new Date(),
    lastModified: new Date(),
    buildTime: 0,
    componentUsage: {}
  }
};

const defaultAnalytics: AnalyticsData = {
  totalForms: 0,
  averageBuildTime: 0,
  mostUsedComponents: [],
  conversionRates: {},
  userEngagement: {
    dailyActiveUsers: 0,
    monthlyActiveUsers: 0,
    averageSessionTime: 0
  }
};

export const useFormStore = create<FormStore>((set, get) => ({
  formData: defaultFormData,
  selectedComponent: null,
  draggedComponent: null,
  history: [],
  historyIndex: -1,
  clipboard: null,
  isAutoSaving: false,
  analytics: defaultAnalytics,
  validationErrors: {},

  setFormData: (data) => 
    set((state) => ({
      formData: { ...state.formData, ...data }
    }), false, 'setFormData'),

  addComponent: (component) => {
    const state = get();
    state.addToHistory('add', component.id);
    set((state) => ({
      formData: {
        ...state.formData,
        components: [...state.formData.components, component]
      }
    }));
    get().autoSave();
  },

  updateComponent: (id, updates) => {
    const state = get();
    state.addToHistory('update', id);
    set((state) => ({
      formData: {
        ...state.formData,
        components: state.formData.components.map(comp =>
          comp.id === id ? { ...comp, ...updates } : comp
        )
      }
    }));
    get().autoSave();
  },

  removeComponent: (id) => {
    const state = get();
    state.addToHistory('delete', id);
    
    // Supprimer le composant du tableau des composants
    set((state) => ({
      formData: {
        ...state.formData,
        components: state.formData.components.filter(comp => comp.id !== id)
      },
      selectedComponent: state.selectedComponent === id ? null : state.selectedComponent
    }));
    
    // Supprimer l'ID du composant de toutes les étapes où il pourrait être assigné
    if (state.formData.steps) {
      const updatedSteps = state.formData.steps.map(step => ({
        ...step,
        componentIds: step.componentIds.filter(compId => compId !== id)
      }));
      
      set((state) => ({
        formData: {
          ...state.formData,
          steps: updatedSteps
        }
      }));
    }
    
    get().autoSave();
  },

  reorderComponents: (startIndex, endIndex) => {
    const state = get();
    state.addToHistory('reorder');
    set((state) => {
      const components = [...state.formData.components];
      const [removed] = components.splice(startIndex, 1);
      components.splice(endIndex, 0, removed);
      return {
        formData: {
          ...state.formData,
          components
        }
      };
    });
    get().autoSave();
  },

  duplicateComponent: (id) => {
    const state = get();
    const component = state.formData.components.find(c => c.id === id);
    if (component) {
      const duplicated = {
        ...component,
        id: `${component.id}-copy-${Date.now()}`,
        label: `${component.label} (Copy)`
      };
      state.addComponent(duplicated);
    }
  },

  copyComponent: (id) => {
    const state = get();
    const component = state.formData.components.find(c => c.id === id);
    if (component) {
      set({ clipboard: component });
    }
  },

  pasteComponent: () => {
    const state = get();
    if (state.clipboard) {
      const pasted = {
        ...state.clipboard,
        id: `${state.clipboard.id}-paste-${Date.now()}`,
        label: `${state.clipboard.label} (Pasted)`
      };
      state.addComponent(pasted);
    }
  },
  setSelectedComponent: (id) => set({ selectedComponent: id }),
  setDraggedComponent: (component) => set({ draggedComponent: component }),

  addToHistory: (action, componentId) => {
    const state = get();
    const historyEntry: FormHistory = {
      id: `history-${Date.now()}`,
      timestamp: new Date(),
      action,
      componentId,
      previousState: { ...state.formData },
      currentState: { ...state.formData }
    };
    
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(historyEntry);
    
    set({
      history: newHistory.slice(-50), // Keep only last 50 actions
      historyIndex: Math.min(newHistory.length - 1, 49)
    });
  },

  undo: () => {
    const state = get();
    if (state.canUndo()) {
      const previousEntry = state.history[state.historyIndex];
      set({
        formData: previousEntry.previousState,
        historyIndex: state.historyIndex - 1
      });
    }
  },

  redo: () => {
    const state = get();
    if (state.canRedo()) {
      const nextEntry = state.history[state.historyIndex + 1];
      set({
        formData: nextEntry.currentState,
        historyIndex: state.historyIndex + 1
      });
    }
  },

  canUndo: () => {
    const state = get();
    return state.historyIndex >= 0;
  },

  canRedo: () => {
    const state = get();
    return state.historyIndex < state.history.length - 1;
  },

  validateComponent: (component) => {
    const errors: string[] = [];
    
    if (component.required && !component.value && !component.placeholder) {
      errors.push(component.validationMessage || 'This field is required');
    }
    
    if (component.type === 'email' && component.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(component.value)) {
        errors.push('Invalid email format');
      }
    }
    
    if (component.minLength && component.value && component.value.length < component.minLength) {
      errors.push(`Minimum ${component.minLength} characters required`);
    }
    
    if (component.maxLength && component.value && component.value.length > component.maxLength) {
      errors.push(`Maximum ${component.maxLength} characters allowed`);
    }
    
    // Custom regex validation
    if (component.customValidationRegex && component.value) {
      try {
        const regex = new RegExp(component.customValidationRegex);
        if (!regex.test(component.value)) {
          errors.push(component.customValidationMessage || 'Invalid format');
        }
      } catch (e) {
        errors.push('Custom validation error');
      }
    }

    return errors;
  },

  validateForm: () => {
    const state = get();
    const errors: Record<string, string[]> = {};
    
    state.formData.components.forEach(component => {
      const componentErrors = state.validateComponent(component);
      if (componentErrors.length > 0) {
        errors[component.id] = componentErrors;
      }
    });
    
    set({ validationErrors: errors });
    return Object.keys(errors).length === 0;
  },

  exportForm: (options) => {
    const state = get();
    
    switch (options.format) {
      case 'vue':
        return generateVueCode(state.formData, options);
      case 'angular':
        return generateAngularCode(state.formData, options);
      case 'html':
        return generateHTMLCode(state.formData, options);
      case 'json':
        return JSON.stringify(state.formData, null, 2);
      default:
        return generateJSXCode(state.formData, options);
    }
  },

  importForm: (data) => {
    set({ formData: data });
    get().autoSave();
  },

  autoSave: () => {
    const state = get();
    if (!state.isAutoSaving) {
      set({ isAutoSaving: true });
      setTimeout(() => {
        state.saveToLocalStorage();
        set({ isAutoSaving: false });
      }, 1000);
    }
  },

  loadTemplate: (templateName) => {
    const templates = getFormTemplates();
    const template = templates[templateName];
    if (template) {
      set({ formData: template });
      get().autoSave();
    }
  },
  saveToLocalStorage: () => {
    const { formData } = get();
    
    // Ensure analytics object exists before setting properties
    if (!formData.analytics) {
      formData.analytics = {
        createdAt: new Date(),
        lastModified: new Date(),
        buildTime: 0,
        componentUsage: {}
      };
    } else {
      formData.analytics.lastModified = new Date();
    }
    
    localStorage.setItem('kauryui-form-builder', JSON.stringify(formData));
    localStorage.setItem('kauryui-form-history', JSON.stringify(get().history));
  },

  loadFromLocalStorage: () => {
    const saved = localStorage.getItem('kauryui-form-builder');
    const savedHistory = localStorage.getItem('kauryui-form-history');
    if (saved) {
      set({ formData: JSON.parse(saved) });
    }
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      set({ history, historyIndex: history.length - 1 });
    }
  },

  resetForm: () => set({ 
    formData: { ...defaultFormData, id: `form-${Date.now()}` },
    selectedComponent: null,
    history: [],
    historyIndex: -1
  }),

  updateAnalytics: (data) => {
    set((state) => ({
      analytics: { ...state.analytics, ...data }
    }));
  },

  assignComponentToStep: (componentId, stepId) => {
    const state = get();
    
    // Mettre à jour la propriété stepId du composant
    const updatedComponents = state.formData.components.map(comp =>
      comp.id === componentId ? { ...comp, stepId } : comp
    );
    
    // Supprimer l'ID du composant de toutes les étapes existantes
    let updatedSteps = state.formData.steps ? state.formData.steps.map(step => ({
      ...step,
      componentIds: step.componentIds.filter(id => id !== componentId)
    })) : [];
    
    // Si stepId n'est pas null, ajouter l'ID du composant à l'étape correspondante
    if (stepId && updatedSteps.length > 0) {
      updatedSteps = updatedSteps.map(step =>
        step.id === stepId 
          ? { ...step, componentIds: [...step.componentIds, componentId] }
          : step
      );
    }
    
    set((state) => ({
      formData: {
        ...state.formData,
        components: updatedComponents,
        steps: updatedSteps
      }
    }));
    
    get().autoSave();
  }
}));

// Helper functions for code generation
const generateVueCode = (formData: FormData, options: ExportOptions): string => {
  const supabaseSetup = formData.supabaseConfig ? `
// Configuration Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = '${formData.supabaseConfig.url}'
const supabaseKey = '${formData.supabaseConfig.anonKey}'
const supabase = createClient(supabaseUrl, supabaseKey)
` : '';

  return `<template>
  <form @submit.prevent="handleSubmit" class="max-w-2xl mx-auto p-8">
    <h2 class="text-2xl font-bold mb-8">${formData.name}</h2>
    ${formData.components.map(comp => generateVueComponent(comp)).join('\n    ')}
    <button type="submit" class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg">
      Envoyer
    </button>
  </form>
</template>

<script setup>
${supabaseSetup}
import { ref } from 'vue'

const formData = ref({})

const handleSubmit = async () => {
  console.log('Form submitted:', formData.value)
  ${formData.supabaseConfig ? `
  // Sauvegarder dans Supabase
  try {
    const { data, error } = await supabase
      .from('${formData.supabaseConfig.tableName || 'form_submissions'}')
      .insert([formData.value])
    
    if (error) throw error
    console.log('Données sauvegardées:', data)
  } catch (error) {
    console.error('Erreur:', error)
  }` : ''}
}
</script>`;
};

const generateAngularCode = (formData: FormData, options: ExportOptions): string => {
  const supabaseSetup = formData.supabaseConfig ? `
// Configuration Supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = '${formData.supabaseConfig.url}';
const supabaseKey = '${formData.supabaseConfig.anonKey}';
const supabase = createClient(supabaseUrl, supabaseKey);
` : '';

  return `import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
${supabaseSetup}

@Component({
  selector: 'app-form',
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="max-w-2xl mx-auto p-8">
      <h2 class="text-2xl font-bold mb-8">${formData.name}</h2>
      ${formData.components.map(comp => generateAngularComponent(comp)).join('\n      ')}
      <button type="submit" class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg">
        Envoyer
      </button>
    </form>
  \`
})
export class FormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      ${formData.components.map(comp => `${comp.id}: ['', ${comp.required ? 'Validators.required' : ''}]`).join(',\n      ')}
    });
  }

  async onSubmit() {
    console.log('Form submitted:', this.form.value);
    ${formData.supabaseConfig ? `
    // Sauvegarder dans Supabase
    try {
      const { data, error } = await supabase
        .from('${formData.supabaseConfig.tableName || 'form_submissions'}')
        .insert([this.form.value]);
      
      if (error) throw error;
      console.log('Données sauvegardées:', data);
    } catch (error) {
      console.error('Erreur:', error);
    }` : ''}
  }
}`;
};

const generateHTMLCode = (formData: FormData, options: ExportOptions): string => {
  const supabaseSetup = formData.supabaseConfig ? `
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script>
    const { createClient } = supabase;
    const supabaseUrl = '${formData.supabaseConfig.url}';
    const supabaseKey = '${formData.supabaseConfig.anonKey}';
    const supabaseClient = createClient(supabaseUrl, supabaseKey);
  </script>` : '';

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formData.name}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  ${supabaseSetup}
</head>
<body class="bg-gray-100">
  <form class="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
    <h2 class="text-2xl font-bold mb-8">${formData.name}</h2>
    ${formData.components.map(comp => generateHTMLComponent(comp)).join('\n    ')}
    <button type="submit" class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg">
      Envoyer
    </button>
  </form>
  
  <script>
    document.querySelector('form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      console.log('Form submitted:', data);
      
      ${formData.supabaseConfig ? `
      // Sauvegarder dans Supabase
      try {
        const { data: result, error } = await supabaseClient
          .from('${formData.supabaseConfig.tableName || 'form_submissions'}')
          .insert([data]);
        
        if (error) throw error;
        console.log('Données sauvegardées:', result);
        alert('Formulaire envoyé avec succès !');
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l\\'envoi du formulaire');
      }` : 'alert("Formulaire envoyé !");'}
    });
  </script>
</body>
</html>`;
};

const generateJSXCode = (formData: FormData, options: ExportOptions): string => {
  const supabaseSetup = formData.supabaseConfig ? `
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = '${formData.supabaseConfig.url}';
const supabaseKey = '${formData.supabaseConfig.anonKey}';
const supabase = createClient(supabaseUrl, supabaseKey);
` : '';

  return `import React, { useState } from 'react';
${supabaseSetup}

const ${formData.name.replace(/\s+/g, '')}Form = () => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Form submitted:', formData);
      
      ${formData.supabaseConfig ? `
      // Save to Supabase
      const { data, error } = await supabase
        .from('${formData.supabaseConfig.tableName || 'form_submissions'}')
        .insert([formData]);
      
      if (error) throw error;
      console.log('Data saved:', data);
      alert('Form submitted successfully!');
      setFormData({});` : 'alert("Form submitted!");'}
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">${formData.name}</h2>
      
      {/* Form components will be generated here */}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-violet-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default ${formData.name.replace(/\s+/g, '')}Form;`;
};

const generateVueComponent = (component: FormComponent): string => {
  return `<div class="mb-6">
      <label class="block text-sm font-medium mb-2">${component.label}</label>
      <input v-model="formData.${component.id}" type="${component.type}" class="w-full px-4 py-2 border rounded-lg" />
    </div>`;
};

const generateAngularComponent = (component: FormComponent): string => {
  return `<div class="mb-6">
        <label class="block text-sm font-medium mb-2">${component.label}</label>
        <input formControlName="${component.id}" type="${component.type}" class="w-full px-4 py-2 border rounded-lg" />
      </div>`;
};

const generateHTMLComponent = (component: FormComponent): string => {
  return `<div class="mb-6">
      <label class="block text-sm font-medium mb-2">${component.label}</label>
      <input name="${component.id}" type="${component.type}" class="w-full px-4 py-2 border rounded-lg" ${component.required ? 'required' : ''} />
    </div>`;
};

const getFormTemplates = (): Record<string, FormData> => {
  return {
    'contact-advanced': {
      id: 'template-contact-advanced',
      name: 'Advanced Contact Form',
      components: [
        {
          id: 'name',
          type: 'input',
          label: 'Full name',
          placeholder: 'Your name...',
          required: true,
          style: { borderRadius: 'md', borderWidth: '1', borderColor: 'gray-300', backgroundColor: 'white', textColor: 'gray-900', size: 'md', animation: 'none' }
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email',
          placeholder: 'your@email.com',
          required: true,
          style: { borderRadius: 'md', borderWidth: '1', borderColor: 'gray-300', backgroundColor: 'white', textColor: 'gray-900', size: 'md', animation: 'none' }
        },
        {
          id: 'phone',
          type: 'phone',
          label: 'Phone',
          placeholder: '+33 1 23 45 67 89',
          required: false,
          style: { borderRadius: 'md', borderWidth: '1', borderColor: 'gray-300', backgroundColor: 'white', textColor: 'gray-900', size: 'md', animation: 'none' }
        },
        {
          id: 'country',
          type: 'country',
          label: 'Country',
          required: true,
          style: { borderRadius: 'md', borderWidth: '1', borderColor: 'gray-300', backgroundColor: 'white', textColor: 'gray-900', size: 'md', animation: 'none' }
        },
        {
          id: 'rating',
          type: 'rating',
          label: 'Rate our service',
          maxRating: 5,
          required: false,
          style: { borderRadius: 'md', borderWidth: '1', borderColor: 'gray-300', backgroundColor: 'white', textColor: 'gray-900', size: 'md', animation: 'none' }
        },
        {
          id: 'message',
          type: 'textarea',
          label: 'Message',
          placeholder: 'Your message...',
          required: true,
          style: { borderRadius: 'md', borderWidth: '1', borderColor: 'gray-300', backgroundColor: 'white', textColor: 'gray-900', size: 'md', animation: 'none' }
        }
      ],
      theme: 'light',
      globalStyle: 'minimal',
      version: 1
    },
    'ecommerce': {
      id: 'template-ecommerce',
      name: 'E-commerce Order Form',
      components: [
        {
          id: 'product-rating',
          type: 'rating',
          label: 'Rate this product',
          maxRating: 5,
          required: true,
          style: { borderRadius: 'md', borderWidth: '1', borderColor: 'gray-300', backgroundColor: 'white', textColor: 'gray-900', size: 'md', animation: 'none' }
        },
        {
          id: 'quantity',
          type: 'number',
          label: 'Quantity',
          min: 1,
          max: 10,
          required: true,
          calculation: {
            formula: 'quantity * 29.99',
            dependsOn: ['quantity']
          },
          style: { borderRadius: 'md', borderWidth: '1', borderColor: 'gray-300', backgroundColor: 'white', textColor: 'gray-900', size: 'md', animation: 'none' }
        },
        {
          id: 'shipping-country',
          type: 'country',
          label: 'Shipping country',
          required: true,
          style: { borderRadius: 'md', borderWidth: '1', borderColor: 'gray-300', backgroundColor: 'white', textColor: 'gray-900', size: 'md', animation: 'none' }
        },
        {
          id: 'signature',
          type: 'signature',
          label: 'Electronic signature',
          required: true,
          signatureOptions: {
            width: 400,
            height: 200,
            backgroundColor: '#ffffff'
          },
          style: { borderRadius: 'md', borderWidth: '1', borderColor: 'gray-300', backgroundColor: 'white', textColor: 'gray-900', size: 'md', animation: 'none' }
        }
      ],
      theme: 'light',
      globalStyle: 'glass',
      version: 1,
      customStyles: {
        shadows: true,
        submitButtonColor: '#8B5CF6',
        submitButtonTextColor: '#FFFFFF'
      }
    }
  };
};