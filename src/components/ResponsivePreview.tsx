import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Smartphone, Tablet, Monitor, RotateCcw } from 'lucide-react';
import { ResponsivePreview as ResponsivePreviewType } from '../types';

interface ResponsivePreviewProps {
  children: React.ReactNode;
}

const devices: ResponsivePreviewType[] = [
  { device: 'mobile', width: 375, height: 667 },
  { device: 'tablet', width: 768, height: 1024 },
  { device: 'desktop', width: 1200, height: 800 }
];

export const ResponsivePreview: React.FC<ResponsivePreviewProps> = ({ children }) => {
  const { t } = useTranslation();
  const [selectedDevice, setSelectedDevice] = useState<ResponsivePreviewType>(devices[2]);
  const [isRotated, setIsRotated] = useState(false);

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'mobile': return Smartphone;
      case 'tablet': return Tablet;
      case 'desktop': return Monitor;
      default: return Monitor;
    }
  };

  const currentWidth = isRotated && selectedDevice.device !== 'desktop' 
    ? selectedDevice.height 
    : selectedDevice.width;
  const currentHeight = isRotated && selectedDevice.device !== 'desktop' 
    ? selectedDevice.width 
    : selectedDevice.height;

  return (
    <div className="flex flex-col h-full">
      {/* Device Selector */}
      <div className="flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10">
        <div className="flex space-x-2">
          {devices.map((device) => {
            const Icon = getDeviceIcon(device.device);
            return (
              <button
                key={device.device}
                onClick={() => setSelectedDevice(device)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  selectedDevice.device === device.device
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-black/5 dark:bg-white/5 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm capitalize">{t(`responsive.devices.${device.device}`)}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center space-x-2">
          {selectedDevice.device !== 'desktop' && (
            <button
              onClick={() => setIsRotated(!isRotated)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm">{t('responsive.rotation')}</span>
            </button>
          )}
          
          <div className="text-sm text-black/60 dark:text-white/60">
            {currentWidth} × {currentHeight}px
          </div>
        </div>
      </div>

      {/* Preview Container */}
      <div className="flex-1 flex items-center justify-center p-8 bg-black/5 dark:bg-white/5">
        <motion.div
          key={`${selectedDevice.device}-${isRotated}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-black rounded-lg shadow-2xl overflow-hidden border border-black/10 dark:border-white/10"
          style={{
            width: Math.min(currentWidth, window.innerWidth - 100),
            height: Math.min(currentHeight, window.innerHeight - 200),
            maxWidth: '100%',
            maxHeight: '100%'
          }}
        >
          <div className="w-full h-full overflow-auto">
            {children}
          </div>
        </motion.div>
      </div>

      {/* Device Info */}
      <div className="p-4 border-t border-black/10 dark:border-white/10 bg-white dark:bg-black">
        <div className="flex items-center justify-between text-sm text-black/60 dark:text-white/60">
          <span>
            {t('responsive.preview', { 
              device: t(`responsive.devices.${selectedDevice.device}`),
              orientation: isRotated ? t('responsive.orientations.landscape') : t('responsive.orientations.portrait')
            })}
          </span>
          <span>
            {t('responsive.zoom', { percent: Math.round((Math.min(currentWidth, window.innerWidth - 100) / currentWidth) * 100) })}
          </span>
        </div>
      </div>
    </div>
  );
};