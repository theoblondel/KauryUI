import React from 'react';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FormBuilder } from './components/FormBuilder';
import { LandingPage } from './components/LandingPage';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [showFormBuilder, setShowFormBuilder] = useState(false);

  if (!showFormBuilder) {
    return (
      <LandingPage onGetStarted={() => setShowFormBuilder(true)} />
    );
  }

  return (
    <AnimatePresence mode="wait">
      <ThemeProvider>
        <div className="App h-screen">
          <FormBuilder onBackToLanding={() => setShowFormBuilder(false)} />
        </div>
      </ThemeProvider>
    </AnimatePresence>
  );
}

export default App;