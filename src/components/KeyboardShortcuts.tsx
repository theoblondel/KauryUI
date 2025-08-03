import React, { useEffect } from 'react';
import { useFormStore } from '../store/formStore';

export const KeyboardShortcuts: React.FC = () => {
  const { 
    undo, 
    redo, 
    canUndo, 
    canRedo, 
    selectedComponent, 
    copyComponent, 
    pasteComponent, 
    duplicateComponent,
    removeComponent,
    saveToLocalStorage
  } = useFormStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Z - Undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        if (canUndo()) {
          undo();
        }
      }

      // Ctrl/Cmd + Y or Ctrl/Cmd + Shift + Z - Redo
      if (((e.ctrlKey || e.metaKey) && e.key === 'y') || 
          ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z')) {
        e.preventDefault();
        if (canRedo()) {
          redo();
        }
      }

      // Ctrl/Cmd + C - Copy selected component
      if ((e.ctrlKey || e.metaKey) && e.key === 'c' && selectedComponent) {
        e.preventDefault();
        copyComponent(selectedComponent);
      }

      // Ctrl/Cmd + V - Paste component
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        e.preventDefault();
        pasteComponent();
      }

      // Ctrl/Cmd + D - Duplicate selected component
      if ((e.ctrlKey || e.metaKey) && e.key === 'd' && selectedComponent) {
        e.preventDefault();
        duplicateComponent(selectedComponent);
      }

      // Delete - Remove selected component
      if (e.key === 'Delete' && selectedComponent) {
        e.preventDefault();
        removeComponent(selectedComponent);
      }

      // Ctrl/Cmd + S - Save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveToLocalStorage();
      }

      // Escape - Deselect component
      if (e.key === 'Escape' && selectedComponent) {
        e.preventDefault();
        useFormStore.getState().setSelectedComponent(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedComponent, canUndo, canRedo, undo, redo, copyComponent, pasteComponent, duplicateComponent, removeComponent, saveToLocalStorage]);

  return null; // This component doesn't render anything
};