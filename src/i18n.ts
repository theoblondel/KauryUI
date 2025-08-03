import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Header
      header: {
        title: "KauryUI",
        subtitle: "Form Builder Pro",
        description: "Next-Generation Form Generator",
        nav: {
          howItWorks: "How it Works",
          useCases: "Use Cases",
          features: "Features",
          testimonials: "Testimonials",
          faq: "FAQ",
          support: "Support"
        },
        getStarted: "Get Started"
      },
      // Hero Section
      hero: {
        title: "Create forms visually with the power of drag & drop",
        subtitle: "The ultimate tool to build interactive forms without code. Drag, customize, export to JSX and deploy instantly.",
        getStartedFree: "Get Started for Free",
        seeDemo: "See Demo"
      },
      // How It Works
      howItWorks: {
        title: "How it Works",
        subtitle: "Create professional forms in 4 simple and intuitive steps",
        steps: {
          dragDrop: {
            title: "Drag & Drop",
            description: "Intuitive interface to create complex forms without code. Simply drag components from the sidebar to your form."
          },
          customize: {
            title: "Customize",
            description: "Fully customizable themes, colors, animations and styles. More than 15 different animations and predefined styles."
          },
          export: {
            title: "Export",
            description: "Clean and optimized JSX code, ready for production. Compatible with React, Vue, Angular and vanilla HTML."
          },
          deploy: {
            title: "Deploy",
            description: "Easily integrate your form into your application. CDN support and NPM packages available."
          }
        }
      },
      // Use Cases
      useCases: {
        title: "Use Cases",
        subtitle: "Forms adapted to all your business needs and use cases",
        contact: {
          title: "Contact Forms",
          description: "Create professional contact forms with advanced validation, automatic email integrations and personalized responses."
        },
        ecommerce: {
          title: "E-commerce Orders",
          description: "Order forms with automatic calculations, electronic signatures, geolocation and payment integration."
        },
        events: {
          title: "Event Registrations",
          description: "Registration management with date selection, integrated payments, automatic confirmations and email reminders."
        },
        surveys: {
          title: "Surveys & Polls",
          description: "Create interactive surveys with star ratings, multiple choice, integrated analytics and data export."
        },
        registration: {
          title: "User Registrations",
          description: "Secure registration forms with email validation, photo uploads, verifications and automatic onboarding."
        },
        multilingual: {
          title: "Multilingual Forms",
          description: "Full support for international forms with country selection, currencies, time zones and translations."
        }
      },
      // Features
      features: {
        title: "Detailed Features",
        subtitle: "The complete solution for all your form creation needs",
        ultraFast: {
          title: "Ultra Fast",
          description: "Create complex forms in minutes instead of hours. Intuitive drag & drop interface with real-time preview.",
          details: [
            "Instant real-time preview",
            "Automatic auto-save every 30 seconds",
            "Keyboard shortcuts for maximum productivity",
            "Ready-to-use templates to get started quickly",
            "Unlimited undo/redo modification history"
          ]
        },
        secure: {
          title: "Secure & Accessible",
          description: "Code generated following React's best security practices and WCAG 2.1 AA accessibility standards.",
          details: [
            "Integrated client and server-side validation",
            "Full ARIA support for screen readers",
            "Automatic contrast and optimized colors",
            "Complete and intuitive keyboard navigation",
            "XSS protection and data sanitization"
          ]
        },
        collaboration: {
          title: "Advanced Collaboration",
          description: "Work as a team on your forms with comments, version history and real-time sharing.",
          details: [
            "Real-time comments on each component",
            "Full modification history with authors",
            "Secure sharing with private or public links",
            "Granular roles and permissions per project",
            "Push notifications for important updates"
          ]
        },
        openSource: {
          title: "Open Source & Free",
          description: "Free, transparent and constantly improved by an active community of passionate developers worldwide.",
          details: [
            "Open source code on GitHub with MIT license",
            "Active community of 10,000+ developers",
            "Regular updates with new features",
            "Community support via Discord and forums",
            "Contributions welcome and documented"
          ]
        }
      },
      // FAQ Section
      faq: {
        title: "Frequently Asked Questions",
        subtitle: "Everything you need to know about KauryUI",
        questions: [
          {
            question: "Is KauryUI really free?",
            answer: "Yes, KauryUI Form Builder is entirely free and open source under the MIT license. You can use it without limitation for your personal and commercial projects. No premium account required, no restrictions on the number of forms. Donations are optional and help us maintain and improve the tool."
          },
          {
            question: "Which frameworks are supported?",
            answer: "KauryUI generates code compatible with React, Vue.js 3, Angular 15+, and vanilla HTML with pure JavaScript. The exported code follows the best practices of each framework and can be easily integrated into your existing projects. We are also working on Svelte and Next.js support."
          },
          {
            question: "Can I customize the generated code?",
            answer: "Absolutely! The generated code is clean, well-structured, commented and fully customizable. You can modify it according to your specific needs after export. It uses standard CSS classes and modular components for easy maintenance."
          },
          {
            question: "Are there limitations on the number of forms?",
            answer: "No limitations! You can create as many forms as you want. All your forms are saved locally in your browser with encryption. You can also export your configurations to save or share them."
          },
          {
            question: "Is the generated code accessible and SEO-friendly?",
            answer: "Yes, we attach great importance to accessibility and SEO. The generated code complies with WCAG 2.1 AA standards with full ARIA support, optimized keyboard navigation, automatically checked contrasts, and semantic HTML structure for excellent SEO."
          }
        ]
      },
      // Support Section
      support: {
        title: "Support the Project",
        subtitle: "KauryUI Form Builder is free and open source. Your support helps us continue development and add new features!",
        formsCreated: "forms created",
        joinDevelopers: "Join thousands of developers who trust KauryUI",
        donate: "Make a Donation",
        starGithub: "Star on GitHub",
        securePayment: "Secure payment via Stripe • Amount of your choice"
      },
      // Testimonials
      testimonials: {
        title: "Testimonials",
        subtitle: "What our satisfied users say"
      },
      // Final CTA
      finalCta: {
        title: "Ready to revolutionize your forms?",
        subtitle: "Join thousands of developers who create exceptional forms with KauryUI",
        getStarted: "Get Started Now"
      },
      // Footer
      footer: {
        tagline: "Created with ❤️ for developers",
        description: "The ultimate tool to create interactive forms without code. Drag, customize, export and deploy in a few clicks.",
        product: "Product",
        resources: "Resources",
        howItWorks: "How it Works",
        features: "Features",
        useCases: "Use Cases",
        tryFree: "Try for Free",
        testimonials: "Testimonials",
        faq: "FAQ",
        documentation: "Documentation",
        supportProject: "Support the Project",
        copyright: "© 2025 KauryUI Form Builder. Open Source & Free.",
        createdBy: "By"
      },
      // Form Builder Interface
      formBuilder: {
        title: "KauryUI Form Builder",
        sidebar: {
          title: "Components",
          description: "Drag components to build your form",
          categories: {
            basic: "Basic Components",
            advanced: "Advanced Components",
            media: "Media & Files",
            location: "Location",
            validation: "Validation"
          },
          components: {
            input: "Text",
            email: "Email",
            phone: "Phone",
            password: "Password",
            hidden: "Hidden Field",
            number: "Number",
            date: "Date",
            range: "Slider",
            color: "Color",
            file: "File",
            radio: "Single Choice",
            select: "Dropdown",
            textarea: "Text Area",
            checkbox: "Checkbox",
            rating: "Rating",
            country: "Country",
            signature: "Signature",
            imageUpload: "Images",
            datetime: "Date & Time",
            geolocation: "Location",
            richTextEditor: "Rich Text Editor"
          },
          presets: {
            title: "Ready-to-use Templates",
            contact: "Contact Form",
            login: "Login Form",
            support: "Customer Support",
            evaluation: "Service Evaluation",
            ecommerce: "E-commerce Order"
          },
          actions: {
            undo: "Undo",
            redo: "Redo",
            paste: "Paste"
          }
        },
        properties: {
          title: "Properties",
          subtitle: "Customize your form",
          tabs: {
            form: "Form",
            component: "Component",
            style: "Style",
            responsive: "Responsive",
            steps: "Steps",
            accessibility: "A11y",
            integrations: "Integrations",
            export: "Export"
          },
          form: {
            name: "Form name",
            theme: "Theme",
            globalStyle: "Global style",
            columns: "Number of columns",
            columnsDescription: "Defines the global form layout"
          },
          component: {
            label: "Label",
            placeholder: "Placeholder",
            layout: "Layout",
            width: "Width (columns)",
            widthOptions: {
              one: "1 column (50%)",
              two: "2 columns (100%)"
            },
            advanced: "Advanced Configuration",
            validation: "Validation",
            options: "Options",
            required: "Required field",
            orientation: "Orientation",
            vertical: "Vertical",
            horizontal: "Horizontal",
            appearance: "Appearance",
            size: "Size",
            sizeOptions: {
              small: "Small",
              medium: "Medium",
              large: "Large"
            },
            backgroundColor: "Background color",
            borderColor: "Border color",
            animation: "Animation",
            animationOptions: {
              none: "None",
              bounce: "Bounce",
              scale: "Scale",
              slide: "Slide",
              fadeIn: "Fade in",
              pulse: "Pulse",
              wobble: "Wobble",
              flip: "Flip",
              shake: "Shake",
              glow: "Glow",
              float: "Float",
              rotate: "Rotate",
              elastic: "Elastic",
              magnetic: "Magnetic",
              morphing: "Morphing",
              ripple: "Ripple"
            }
          },
          validation: {
            minLength: "Minimum length",
            maxLength: "Maximum length",
            pattern: "Pattern (RegEx)",
            customRegex: "Custom validation (RegEx)",
            customMessage: "Custom error message",
            minValue: "Minimum value",
            maxValue: "Maximum value",
            step: "Step"
          },
          file: {
            acceptedTypes: "Accepted file types",
            multipleFiles: "Multiple files"
          },
          hidden: {
            value: "Value"
          },
          selectComponent: "Select a component to customize it"
        },
        preview: {
          title: "Real-time preview",
          elementsCount: "element(s) displayed",
          errors: "error(s)",
          emptyForm: {
            title: "Your form is empty",
            description: "Add components from the sidebar to get started",
            tip: "💡 Tip: Use Ctrl+Z to undo, Ctrl+C to copy, Ctrl+V to paste"
          },
          emptyStep: {
            title: "This step is empty",
            description: "Drag components here or assign them from the list"
          },
          previewMode: "👁️ Preview mode - This is how your form will appear to users",
          submitButton: "✨ Submit form",
          dropZone: {
            perfect: "✨ Perfect! Release to add your first component",
            release: "Release to add \"{component}\" to the form"
          }
        },
        controls: {
          copy: "Copy (Ctrl+C)",
          duplicate: "Duplicate (Ctrl+D)",
          moveUp: "Move up",
          moveDown: "Move down",
          delete: "Delete (Delete)",
          preview: "Preview",
          edit: "Edit",
          backToEdit: "Back to editing",
          fullscreen: "Fullscreen mode (F11)",
          responsive: "Responsive preview",
          home: "Home"
        }
      },
      // Form Elements
      elements: {
        common: {
          required: "Required",
          optional: "Optional",
          clickToUpload: "Click to upload",
          dragHere: "Drag components here",
          selectOption: "Choose an option...",
          enterText: "Enter your text...",
          enterEmail: "your@email.com",
          enterPhone: "123456789",
          enterPassword: "••••••••",
          enterMessage: "Your message...",
          chooseColor: "Choose a color",
          chooseDate: "Choose a date",
          uploadFile: "Upload a file",
          allFileTypes: "All file types accepted",
          typesAccepted: "Types accepted",
          hiddenField: "Hidden field",
          hiddenValue: "Value",
          notDefined: "Not defined",
          invisible: "ℹ️ This field will be invisible in the final form"
        },
        rating: {
          clickStars: "Click on stars to rate",
          starsSelected: "{rating}/{maxRating} stars selected"
        },
        country: {
          selectCountry: "Select a country...",
          selectedCountry: "Selected country:",
          dialCode: "Dial code:"
        },
        signature: {
          signAbove: "✍️ Sign in the area above",
          signatureCaptured: "✅ Signature captured successfully"
        },
        imageUpload: {
          clickToUpload: "Click to upload images",
          maxFiles: "Maximum {maxFiles} files",
          maxSize: "{maxSize}MB max"
        },
        datetime: {
          date: "Date",
          time: "Time"
        },
        geolocation: {
          getLocation: "Get my location",
          locating: "Locating...",
          positionCaptured: "Position captured successfully",
          latitude: "Latitude",
          longitude: "Longitude",
          error: "Unable to get your position",
          notSupported: "Geolocation is not supported by this browser"
        },
        phone: {
          automaticPrefix: "📞 Automatic prefix:",
          prefixFrom: "Prefix from {country}"
        },
        password: {
          requirements: {
            minChars: "• Minimum {min} characters",
            maxChars: "• Maximum {max} characters",
            specificFormat: "• Specific format required"
          }
        },
        richTextEditor: {
          placeholder: "Enter your formatted content...",
          characters: "{count} characters",
          demo: "📝 Rich text editor with basic formatting (demo version)"
        },
        range: {
          min: "Min",
          max: "Max"
        }
      },
      // Multi-step Forms
      steps: {
        title: "Multi-step Form",
        description: "Divide your form into multiple steps for better user experience",
        createFirst: "Create the first step",
        addStep: "Add step",
        step: "Step",
        of: "of",
        previous: "Previous",
        next: "Next",
        stepTitle: "Step {number}",
        stepDescription: "Step description",
        componentsInStep: "Components in this step ({count})",
        dragComponents: "Drag components here from the preview",
        releaseToAssign: "Release to assign the component",
        removeFromStep: "Remove from this step",
        addComponentToStep: "Release to add the component to this step"
      },
      // Accessibility
      accessibility: {
        title: "Accessibility Check",
        errors: "Errors",
        warnings: "Warnings",
        info: "Info",
        noIssues: "No accessibility issues detected!",
        respectsStandards: "Your form follows accessibility best practices",
        issues: {
          noLabel: "Component without label",
          placeholderOnly: "Using placeholder as label",
          requiredIndication: "Required field without visual indication",
          insufficientContrast: "Insufficient contrast",
          selectDefault: "Select without default option",
          radioOptions: "Radio group with less than 2 options",
          emptyForm: "Empty form",
          noSubmit: "Form without submit button"
        },
        suggestions: {
          addLabel: "Add a descriptive label to improve accessibility",
          usePermanentLabel: "Use a permanent label instead of placeholder only",
          addAsterisk: "Add an asterisk (*) or \"required\" to the label",
          ensureReadability: "Ensure text is readable on the background",
          addDefaultOption: "Add a default option like \"Choose an option\"",
          addMoreOptions: "Radio groups should have at least 2 options",
          addComponents: "Add components to your form",
          submitAutoAdded: "A submit button will be automatically added"
        },
        tips: {
          title: "💡 Accessibility Tips",
          items: [
            "• Use clear and descriptive labels",
            "• Visually indicate required fields",
            "• Ensure sufficient contrast",
            "• Test keyboard navigation",
            "• Provide explicit error messages",
            "• Use appropriate ARIA attributes",
            "• Organize content with logical hierarchy",
            "• Test with screen readers"
          ]
        },
        note: {
          title: "ℹ️ Important Note",
          description: "This checker focuses on form accessibility. For complete SEO analysis, use specialized tools like Google PageSpeed Insights, Lighthouse, or SEMrush."
        }
      },
      // Style Customization
      style: {
        title: "Style Customization",
        tabs: {
          colors: "Colors",
          typography: "Typography",
          spacing: "Spacing",
          effects: "Effects"
        },
        colors: {
          predefinedPalettes: "Predefined Palettes",
          primaryColor: "Primary color",
          secondaryColor: "Secondary color",
          submitButtonColor: "Submit button color",
          submitButtonTextColor: "Submit button text color",
          palettes: {
            modern: "Modern",
            elegant: "Elegant",
            vibrant: "Vibrant",
            ocean: "Ocean"
          }
        },
        typography: {
          fontFamily: "Font family",
          fontSize: "Font size",
          sizeOptions: {
            small: "Small (14px)",
            normal: "Normal (16px)",
            large: "Large (18px)",
            veryLarge: "Very large (20px)"
          }
        },
        spacing: {
          general: "General spacing",
          borderRadius: "Border radius",
          spacingOptions: {
            compact: "Compact (0.5rem)",
            normal: "Normal (1rem)",
            comfortable: "Comfortable (1.5rem)",
            large: "Large (2rem)"
          },
          radiusOptions: {
            none: "None",
            small: "Small (0.25rem)",
            normal: "Normal (0.5rem)",
            large: "Large (1rem)",
            veryLarge: "Very large (1.5rem)"
          }
        },
        effects: {
          dropShadows: "Drop shadows"
        }
      },
      // Integrations
      integrations: {
        title: "Integrations",
        supabase: {
          title: "Supabase Configuration",
          url: "Supabase URL",
          anonKey: "Anonymous key (anon key)",
          tableName: "Table name (optional)",
          howToSetup: "💡 How to setup:",
          steps: [
            "Create a project on supabase.com",
            "Go to Settings → API",
            "Copy the URL and anonymous key",
            "Create a table to store submissions"
          ],
          active: "✅ Supabase configuration active",
          activeDescription: "Submissions will be automatically saved to your Supabase database when exported."
        },
        comingSoon: {
          title: "🚀 Coming Soon",
          items: [
            "• Netlify Forms integration",
            "• Custom webhooks",
            "• Google Sheets",
            "• Zapier / Make.com",
            "• Email notifications"
          ]
        }
      },
      // Export
      export: {
        title: "Export Code",
        description: "Copy the generated JSX code to use in your React project.",
        jsx: {
          title: "📋 JSX Code",
          copy: "Copy JSX code",
          download: "Download JSX file",
          copied: "Copied!"
        },
        support: {
          title: "Support the Project",
          description: "KauryUI Form Builder is free and open source. Your support helps us continue development!",
          donate: "Make a Donation",
          securePayment: "Secure payment via Stripe • Amount of your choice"
        },
        cdn: {
          title: "📦 KauryUI CDN",
          description: "Integrate directly via CDN:",
          poweredBy: "🚀 Powered by KauryUI Framework"
        }
      },
      // Responsive Preview
      responsive: {
        title: "Responsive Preview",
        description: "Use preview mode to test different screen sizes",
        devices: {
          mobile: "Mobile",
          tablet: "Tablet",
          desktop: "Desktop"
        },
        rotation: "Rotation",
        preview: "Preview {device} ({orientation})",
        orientations: {
          portrait: "portrait",
          landscape: "landscape"
        },
        zoom: "Zoom: {percent}%"
      },
      // Validation Messages
      validation: {
        required: "This field is required",
        email: "Invalid email format",
        minLength: "Minimum {min} characters required",
        maxLength: "Maximum {max} characters allowed",
        invalidFormat: "Invalid format",
        customValidationError: "Custom validation error"
      },
      // Common Actions
      common: {
        getStarted: "Get Started",
        seeDemo: "See Demo",
        learnMore: "Learn More",
        documentation: "Documentation",
        support: "Support",
        github: "GitHub",
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        copy: "Copy",
        paste: "Paste",
        duplicate: "Duplicate",
        preview: "Preview",
        close: "Close",
        back: "Back",
        next: "Next",
        previous: "Previous",
        finish: "Finish",
        submit: "Submit",
        reset: "Reset",
        clear: "Clear",
        add: "Add",
        remove: "Remove",
        update: "Update",
        create: "Create",
        configure: "Configure",
        customize: "Customize",
        download: "Download",
        upload: "Upload",
        import: "Import",
        export: "Export",
        loading: "Loading...",
        success: "Success",
        error: "Error",
        warning: "Warning",
        info: "Info"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language set to English only
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;