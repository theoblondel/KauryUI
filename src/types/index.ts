export interface FormComponent {
  id: string;
  type: 'input' | 'select' | 'textarea' | 'checkbox' | 'date' | 'number' | 'radio' | 'file' | 'email' | 'phone' | 'range' | 'color' | 'password' | 'hidden' | 'rating' | 'country' | 'signature' | 'image-upload' | 'datetime' | 'geolocation' | 'rich-text-editor';
  label: string;
  placeholder?: string;
  required: boolean;
  stepId?: string; // ID de l'étape à laquelle ce composant appartient (undefined = composant global)
  validation?: string;
  validationMessage?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  conditionalLogic?: {
    dependsOn: string;
    condition: 'equals' | 'not-equals' | 'contains' | 'greater-than' | 'less-than';
    value: string | number;
  };
  calculation?: {
    formula: string;
    dependsOn: string[];
  };
  style: {
    borderRadius: string;
    borderWidth: string;
    borderColor: string;
    backgroundColor: string;
    textColor: string;
    size: 'sm' | 'md' | 'lg';
    animation: 'none' | 'bounce' | 'scale' | 'slide' | 'fade-in' | 'pulse' | 'wobble' | 'flip' | 'shake' | 'glow' | 'float' | 'rotate' | 'elastic' | 'magnetic' | 'morphing' | 'ripple';
  };
  layoutColumnSpan?: number; // Number of columns this component should span in grid layout
  customValidationRegex?: string; // Custom regex pattern for validation
  customValidationMessage?: string; // Custom error message for validation
  options?: string[]; // for select
  min?: number; // for number, range
  max?: number; // for number, range
  step?: number; // for number, range
  accept?: string; // for file
  multiple?: boolean; // for file
  orientation?: 'vertical' | 'horizontal'; // for radio, checkbox groups
  value?: string; // for hidden fields
  maxRating?: number; // for rating
  countries?: string[]; // for country selector
  signatureOptions?: {
    width: number;
    height: number;
    backgroundColor: string;
  };
  imageOptions?: {
    maxSize: number;
    allowedTypes: string[];
    maxFiles: number;
  };
  geolocationOptions?: {
    enableHighAccuracy: boolean;
    timeout: number;
    maximumAge: number;
  };
  richTextOptions?: {
    toolbar: string[];
    height: number;
    placeholder: string;
  };
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  tableName?: string;
}

export interface FormData {
  id: string;
  name: string;
  components: FormComponent[];
  theme: 'light' | 'dark' | 'auto';
  globalStyle: 'minimal' | 'glass' | 'neumorphism' | 'outline';
  formColumns?: number;
  customStyles?: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    fontSize: string;
    spacing: string;
    borderRadius: string;
    shadows: boolean;
    submitButtonColor: string;
    submitButtonTextColor: string;
  };
  supabaseConfig?: SupabaseConfig;
  steps?: FormStep[];
  currentStep?: number;
  webhooks?: WebhookConfig[];
  integrations?: IntegrationConfig[];
  analytics?: {
    createdAt: Date;
    lastModified: Date;
    buildTime: number;
    componentUsage: Record<string, number>;
  };
  version: number;
  collaborators?: string[];
  comments?: Array<{
    id: string;
    componentId: string;
    author: string;
    message: string;
    timestamp: Date;
  }>;
}

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  componentIds: string[];
  validation?: ValidationRule[];
  conditionalLogic?: ConditionalLogic;
}

export interface WebhookConfig {
  id: string;
  url: string;
  method: 'POST' | 'PUT';
  headers?: Record<string, string>;
  events: ('submit' | 'validate' | 'step-change')[];
  active: boolean;
}

export interface IntegrationConfig {
  id: string;
  type: 'netlify-forms' | 'formspree' | 'google-sheets' | 'zapier';
  config: Record<string, any>;
  active: boolean;
}

export interface ConditionalLogic {
  dependsOn: string;
  condition: 'equals' | 'not-equals' | 'contains' | 'greater-than' | 'less-than';
  value: string | number;
  action: 'show' | 'hide' | 'require' | 'disable';
}

export interface ResponsivePreview {
  device: 'mobile' | 'tablet' | 'desktop';
  width: number;
  height: number;
}

export interface ComponentTemplate {
  type: FormComponent['type'];
  label: string;
  icon: string;
  defaultProps: Partial<FormComponent>;
  category: 'basic' | 'advanced' | 'media' | 'location' | 'validation';
}
export interface FormHistory {
  id: string;
  timestamp: Date;
  action: 'add' | 'update' | 'delete' | 'reorder' | 'paste';
  componentId?: string;
  previousState: FormData;
  currentState: FormData;
}

export interface ValidationRule {
  type: 'required' | 'email' | 'phone' | 'url' | 'pattern' | 'min' | 'max' | 'custom';
  value?: string | number;
  message: string;
}

export interface ExportOptions {
  format: 'jsx' | 'vue' | 'angular' | 'html' | 'pdf' | 'figma' | 'json';
  includeValidation: boolean;
  includeStyles: boolean;
  framework?: 'react' | 'vue3' | 'angular15';
}

export interface AnalyticsData {
  totalForms: number;
  averageBuildTime: number;
  mostUsedComponents: Array<{ type: string; count: number }>;
  conversionRates: Record<string, number>;
  userEngagement: {
    dailyActiveUsers: number;
    monthlyActiveUsers: number;
    averageSessionTime: number;
  };
}