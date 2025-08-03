# KauryUI Form Builder

![KauryUI Form Builder](https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

**The ultimate drag & drop form builder for React developers**

Create professional, interactive forms without writing code. KauryUI Form Builder offers an intuitive visual interface with powerful customization options and clean JSX export.

## ✨ Features

- 🎨 **Drag & Drop Interface** - Intuitive visual form creation
- 🎯 **20+ Form Components** - Text, email, phone, rating, signature, geolocation, and more
- 🎨 **Advanced Customization** - Themes, colors, animations, and responsive layouts
- 📱 **Responsive Design** - Mobile-first approach with device preview
- 🔧 **Multi-step Forms** - Create complex workflows with step management
- ♿ **Accessibility Checker** - Built-in WCAG 2.1 AA compliance validation
- 📤 **Multiple Export Formats** - JSX, Vue, Angular, HTML, and JSON
- 🔌 **Supabase Integration** - Direct database connection for form submissions
- 🎭 **16 Animation Types** - Bounce, scale, slide, glow, and more
- 💾 **Auto-save** - Never lose your work with automatic local storage
- ⌨️ **Keyboard Shortcuts** - Productivity shortcuts for power users
- 🌙 **Dark Mode** - Beautiful dark theme support

## 🚀 Technologies Used

- **React 18** with TypeScript
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **React DnD** for drag & drop functionality
- **Zustand** for state management
- **Three.js** for 3D effects
- **Vite** for fast development
- **i18next** for internationalization

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/theoblondel/KauryUI.git
cd KauryUI
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📖 Usage

### 1. Drag & Drop Components
- Browse the component library in the left sidebar
- Drag components directly onto your form canvas
- Components automatically snap into place

### 2. Customize Your Form
- Select any component to access the properties panel
- Modify labels, placeholders, validation rules, and styling
- Choose from 16 different animations and multiple themes

### 3. Multi-step Forms
- Create complex workflows by organizing components into steps
- Drag components between steps for easy reorganization
- Preview each step individually

### 4. Preview & Test
- Switch to preview mode to test your form as users will see it
- Use responsive preview to test on different device sizes
- Check accessibility compliance with the built-in checker

### 5. Export Your Form
- Generate clean, production-ready code
- Choose from multiple formats: JSX, Vue, Angular, HTML
- Copy code or download as files

## 📤 Export Options

### JSX (React)
```jsx
import React, { useState } from 'react';

const MyForm = () => {
  const [formData, setFormData] = useState({});
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Generated form components */}
    </form>
  );
};
```

### Vue 3
```vue
<template>
  <form @submit.prevent="handleSubmit">
    <!-- Generated form components -->
  </form>
</template>

<script setup>
import { ref } from 'vue'
const formData = ref({})
</script>
```

### Angular
```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  template: `<!-- Generated form template -->`
})
export class FormComponent {
  // Generated component logic
}
```

## 🎯 Component Library

### Basic Components
- **Text Input** - Single line text with validation
- **Email** - Email input with format validation
- **Phone** - Phone number with country code integration
- **Password** - Secure password input with strength indicators
- **Number** - Numeric input with min/max constraints
- **Date** - Date picker with calendar interface
- **Textarea** - Multi-line text input
- **Select** - Dropdown with custom options
- **Radio** - Single choice selection
- **Checkbox** - Boolean input with custom styling

### Advanced Components
- **Rating** - Star rating system (1-10 stars)
- **Country Selector** - 195+ countries with flags and dial codes
- **Signature** - Electronic signature capture
- **Rich Text Editor** - WYSIWYG text formatting
- **Date & Time** - Combined date and time picker
- **Geolocation** - GPS coordinate capture
- **Image Upload** - Multi-image upload with preview
- **File Upload** - Document upload with type restrictions
- **Range Slider** - Numeric range selection
- **Color Picker** - Color selection with hex values

## 🎨 Customization Options

### Themes
- **Light** - Clean, professional appearance
- **Dark** - Modern dark interface
- **Glass** - Glassmorphism effect with blur
- **Neumorphism** - Soft, tactile design
- **Outline** - Minimalist border-only style

### Animations
Choose from 16 different animations:
- Bounce, Scale, Slide, Fade In
- Pulse, Wobble, Flip, Shake
- Glow, Float, Rotate, Elastic
- Magnetic, Morphing, Ripple

### Styling
- Custom color palettes
- Typography options (6 font families)
- Spacing controls (compact to large)
- Border radius customization
- Shadow effects toggle

## 🔌 Integrations

### Supabase
Connect your forms directly to Supabase for automatic data storage:

```javascript
// Auto-generated Supabase integration
const { data, error } = await supabase
  .from('form_submissions')
  .insert([formData]);
```

### Coming Soon
- Netlify Forms
- Custom Webhooks
- Google Sheets
- Zapier/Make.com
- Email notifications

## ♿ Accessibility

KauryUI Form Builder generates forms that comply with WCAG 2.1 AA standards:

- **Screen Reader Support** - Full ARIA attributes
- **Keyboard Navigation** - Complete keyboard accessibility
- **Color Contrast** - Automatic contrast validation
- **Focus Management** - Proper focus indicators
- **Semantic HTML** - Meaningful markup structure

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure accessibility compliance
- Test on multiple browsers

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Support

If you find this project helpful, consider:

- ⭐ **Starring the repository**
- 🐛 **Reporting bugs**
- 💡 **Suggesting new features**
- 💖 **Making a donation** via [Stripe](https://buy.stripe.com/5kAaIo03wgAb2S4aEW)

## 📞 Contact

**Théo Blondel**
- Website: [theoblondel.ch](https://theoblondel.ch/)
- GitHub: [@theoblondel](https://github.com/theoblondel)
- Project Link: [https://github.com/theoblondel/KauryUI](https://github.com/theoblondel/KauryUI)

## 🎯 Roadmap

### Version 2.0 (Coming Soon)
- [ ] Conditional Logic Builder
- [ ] Form Analytics Dashboard
- [ ] Team Collaboration Features
- [ ] Advanced Validation Rules
- [ ] Custom Component Builder
- [ ] Form Templates Marketplace

### Version 2.1
- [ ] Svelte Support
- [ ] Next.js Integration
- [ ] Advanced Theming System
- [ ] Form Performance Optimizer
- [ ] Mobile App (React Native)

---

<div align="center">

**Made with ❤️ by nerd, for nerds**

[Get Started](https://dainty-travesseiro-344401.netlify.app/) • [Documentation](https://github.com/theoblondel/KauryUI) • [Support](https://buy.stripe.com/5kAaIo03wgAb2S4aEW)

</div>
