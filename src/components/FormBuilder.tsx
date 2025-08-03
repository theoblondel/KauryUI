import React, { useEffect } from 'react';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTranslation } from 'react-i18next';
import { Eye, Edit3, Maximize, Minimize, Smartphone, Monitor, Tablet, Home } from 'lucide-react';
import { ComponentsSidebar } from './ComponentsSidebar';
import { FormPreview } from './FormPreview';
import { PropertiesPanel } from './PropertiesPanel';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { ResponsivePreview } from './ResponsivePreview';
import { useFormStore } from '../store/formStore';

interface FormBuilderProps {
  onBackToLanding: () => void;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({ onBackToLanding }) => {
  const { t } = useTranslation();
  const loadFromLocalStorage = useFormStore(state => state.loadFromLocalStorage);
  const { formData } = useFormStore();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showResponsivePreview, setShowResponsivePreview] = useState(false);
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);
  
  return (
    <DndProvider backend={HTML5Backend}>
      <KeyboardShortcuts />
      <div className="h-screen flex flex-col md:flex-row bg-white dark:bg-black overflow-hidden">
        <div className="md:hidden bg-white dark:bg-black border-b border-black/10 dark:border-white/10 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-black dark:text-white">
              🎨 {t('formBuilder.title')}
            </h1>
            <div className="flex space-x-2">
              <button
                onClick={onBackToLanding}
                className="flex items-center px-3 py-2 bg-black/10 dark:bg-white/10 text-black dark:text-white rounded-lg hover:bg-black/20 dark:hover:bg-white/20 transition-all duration-200"
                title={t('formBuilder.controls.home')}
              >
                <Home className="w-4 h-4" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="flex items-center px-3 py-2 bg-black/10 dark:bg-white/10 text-black dark:text-white rounded-lg hover:bg-black/20 dark:hover:bg-white/20 transition-all duration-200"
              >
                {isFullscreen ? (
                  <Minimize className="w-4 h-4" />
                ) : (
                  <Maximize className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => setShowResponsivePreview(!showResponsivePreview)}
                className="flex items-center px-3 py-2 bg-black/10 dark:bg-white/10 text-black dark:text-white rounded-lg hover:bg-black/20 dark:hover:bg-white/20 transition-all duration-200"
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="flex items-center px-3 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all duration-200"
              >
                {isPreviewMode ? (
                  <>
                    <Edit3 className="w-4 h-4 mr-2" />
                    {t('formBuilder.controls.edit')}
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    {t('formBuilder.controls.preview')}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {!isPreviewMode && (
          <div className="hidden md:block h-full">
            <ComponentsSidebar />
          </div>
        )}
        
        <div className="flex-1 min-h-0 relative overflow-hidden">
        <div className="flex-1 min-h-0 flex flex-col h-full">
          <div className="hidden md:flex justify-end p-4 space-x-2 z-10 w-full">
            <div className="hidden md:flex absolute top-4 right-4 z-10 space-x-2">
              <button
                onClick={toggleFullscreen}
                className="flex items-center px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg"
                title={t('formBuilder.controls.fullscreen')}
              >
                {isFullscreen ? (
                  <Minimize className="w-4 h-4" />
                ) : (
                  <Maximize className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => setShowResponsivePreview(!showResponsivePreview)}
                className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 shadow-lg ${
                  showResponsivePreview
                    ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-md hover:shadow-lg'
                }`}
                title={t('formBuilder.controls.responsive')}
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsPreviewMode(true)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg hover:from-gray-800 hover:to-black transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Eye className="w-4 h-4 mr-2" />
                {t('formBuilder.controls.preview')}
              </button>
            </div>
          </div>
          
          {isPreviewMode && (
            <div className="hidden md:flex absolute top-4 right-4 z-10 space-x-2">
              <button
                onClick={onBackToLanding}
                className="flex items-center px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg"
                title={t('formBuilder.controls.home')}
              >
                <Home className="w-4 h-4 mr-2" />
                <span>{t('formBuilder.controls.home')}</span>
              </button>
              <button
                onClick={toggleFullscreen}
                className="flex items-center px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg"
                title={t('formBuilder.controls.fullscreen')}
              >
                {isFullscreen ? (
                  <Minimize className="w-4 h-4" />
                ) : (
                  <Maximize className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => setShowResponsivePreview(!showResponsivePreview)}
                className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 shadow-lg ${
                  showResponsivePreview
                    ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-md hover:shadow-lg'
                }`}
                title={t('formBuilder.controls.responsive')}
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsPreviewMode(false)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg hover:from-gray-800 hover:to-black transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                {t('formBuilder.controls.backToEdit')}
              </button>
            </div>
          )}
          
          {showResponsivePreview && isPreviewMode ? (
            <ResponsivePreview>
              <FormPreview isPreviewMode={isPreviewMode} currentStepId={currentStepId} />
            </ResponsivePreview>
          ) : (
            <FormPreview isPreviewMode={isPreviewMode} currentStepId={currentStepId} />
          )}
        </div>
        </div>
        
        {!isPreviewMode && (
          <div className="hidden lg:block flex-shrink-0 h-full">
            <PropertiesPanel onStepChange={setCurrentStepId} />
          </div>
        )}
        
        {/* Mobile bottom navigation */}
        {!isPreviewMode && (
          <div className="md:hidden bg-white dark:bg-black border-t border-black/10 dark:border-white/10 p-2">
            <div className="flex justify-around">
              <button className="flex flex-col items-center p-2 text-black dark:text-white">
                <span className="text-xs">Components</span>
              </button>
              <button className="flex flex-col items-center p-2 text-black dark:text-white">
                <span className="text-xs">Properties</span>
              </button>
              <button className="flex flex-col items-center p-2 text-black dark:text-white">
                <span className="text-xs">Export</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};