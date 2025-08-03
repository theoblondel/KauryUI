import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Star, MapPin, Upload, X } from 'lucide-react';
import { FormComponent } from '../types';
import { ALL_COUNTRIES, Country } from '../data/countries';
import { useFormStore } from '../store/formStore';

interface FormElementProps {
  component: FormComponent;
  isSelected?: boolean;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

// Rating Component (Stars)
export const RatingElement: React.FC<FormElementProps> = ({ component, isSelected, onClick }) => {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const maxRating = component.maxRating || 5;

  return (
    <motion.div
      onClick={onClick}
      className={`group cursor-pointer ${isSelected ? 'ring-2 ring-gray-500 ring-offset-2 rounded-lg p-2' : 'p-2'}`}
      layout
    >
      <label className="block text-sm font-semibold text-black dark:text-white mb-4">
        {component.label}
        {component.required && <span className="text-red-500 ml-1 text-base">*</span>}
      </label>
      <div className="flex space-x-2 p-2">
        {[...Array(maxRating)].map((_, index) => {
          const starValue = index + 1;
          return (
            <motion.button
              key={index}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setRating(starValue);
              }}
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-full p-1"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Star
                className={`w-10 h-10 transition-all duration-200 ${
                  starValue <= (hoverRating || rating)
                    ? 'text-gray-600 fill-gray-600 dark:text-gray-400 dark:fill-gray-400'
                    : 'text-gray-300 dark:text-gray-600 hover:text-gray-400 dark:hover:text-gray-500'
                }`}
              />
            </motion.button>
          );
        })}
      </div>
      <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 font-medium">
        {rating > 0 ? t('elements.rating.starsSelected', { rating, maxRating }) : t('elements.rating.clickStars')}
      </div>
    </motion.div>
  );
};

// Country Selector Component
export const CountryElement: React.FC<FormElementProps> = ({ component, isSelected, onClick }) => {
  const { t } = useTranslation();
  const { updateComponent } = useFormStore();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value;
    const country = ALL_COUNTRIES.find(c => c.code === countryCode) || null;
    setSelectedCountry(country);
    
    // Update the component value with the selected country
    updateComponent(component.id, { 
      value: country ? JSON.stringify(country) : '' 
    });
  };

  return (
    <motion.div
      onClick={onClick}
      className={`group cursor-pointer ${isSelected ? 'ring-2 ring-gray-500 ring-offset-2 rounded-lg p-2' : 'p-2'}`}
      layout
    >
      <label className="block text-sm font-semibold text-black dark:text-white mb-3">
        {component.label}
        {component.required && <span className="text-red-500 ml-1 text-base">*</span>}
      </label>
      <select 
        value={selectedCountry?.code || ''}
        onChange={handleCountryChange}
        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <option value="" className="text-gray-500">{t('elements.country.selectCountry')}</option>
        {ALL_COUNTRIES.map((country) => (
          <option key={country.code} value={country.code}>
            {country.flag} {country.name} ({country.dial_code})
          </option>
        ))}
      </select>
      
      {selectedCountry && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-2 rounded">
          <span className="font-medium">{t('elements.country.selectedCountry')}:</span> {selectedCountry.flag} {selectedCountry.name}
          <br />
          <span className="font-medium">{t('elements.country.dialCode')}:</span> {selectedCountry.dial_code}
        </div>
      )}
    </motion.div>
  );
};

// Signature Component
export const SignatureElement: React.FC<FormElementProps> = ({ component, isSelected, onClick }) => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.stopPropagation();
    setIsDrawing(true);
    setIsEmpty(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.stopPropagation();
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = (e: React.MouseEvent) => {
    e.stopPropagation();
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setIsEmpty(true);
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, []);

  return (
    <motion.div
      onClick={onClick}
      className={`group cursor-pointer ${isSelected ? 'ring-2 ring-gray-500 ring-offset-2 rounded-lg p-2' : 'p-2'}`}
      layout
    >
      <label className="block text-sm font-semibold text-black dark:text-white mb-3">
        {component.label}
        {component.required && <span className="text-red-500 ml-1 text-base">*</span>}
      </label>
      <div className="relative border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200">
        <canvas
          ref={canvasRef}
          width={component.signatureOptions?.width || 400}
          height={component.signatureOptions?.height || 150}
          className="border border-gray-200 dark:border-gray-700 rounded cursor-crosshair bg-white w-full"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
        <motion.button
          type="button"
          onClick={clearSignature}
          className="absolute top-2 right-2 p-2 bg-gray-700 text-white rounded-full hover:bg-black transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-4 h-4" />
        </motion.button>
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 text-center font-medium">
          {isEmpty ? t('elements.signature.signAbove') : t('elements.signature.signatureCaptured')}
        </div>
      </div>
    </motion.div>
  );
};

// Image Upload Component
export const ImageUploadElement: React.FC<FormElementProps> = ({ component, isSelected, onClick }) => {
  const { t } = useTranslation();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxFiles = component.imageOptions?.maxFiles || 5;
    
    files.slice(0, maxFiles).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          setUploadedImages(prev => [...prev.slice(0, maxFiles - 1), result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      onClick={onClick}
      className={`group cursor-pointer ${isSelected ? 'ring-2 ring-gray-500 ring-offset-2 rounded-lg p-2' : 'p-2'}`}
      layout
    >
      <label className="block text-sm font-semibold text-black dark:text-white mb-3">
        {component.label}
        {component.required && <span className="text-red-500 ml-1 text-base">*</span>}
      </label>
      
      <div className="space-y-4">
        <motion.div
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer bg-white dark:bg-gray-900 shadow-sm hover:shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
          >
            <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          </motion.div>
          <p className="text-base text-gray-700 dark:text-gray-300 font-semibold mb-2">
            {t('elements.imageUpload.clickToUpload')}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('elements.imageUpload.maxFiles', { maxFiles: component.imageOptions?.maxFiles || 5 })} • 
            {component.imageOptions?.maxSize ? ` ${component.imageOptions.maxSize}MB max` : ' 10MB max'}
          </p>
        </motion.div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={component.imageOptions?.allowedTypes?.join(',') || 'image/*'}
          onChange={handleFileUpload}
          className="hidden"
        />

        {uploadedImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {uploadedImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative group/image"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={image}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
                />
                <motion.button
                  type="button"
                  onClick={(e) => removeImage(index, e)}
                  className="absolute -top-2 -right-2 p-1.5 bg-gray-700 text-white rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity hover:bg-black shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-3 h-3" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// DateTime Component
export const DateTimeElement: React.FC<FormElementProps> = ({ component, isSelected, onClick }) => {
  const { t } = useTranslation();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  return (
    <motion.div
      onClick={onClick}
      className={`group cursor-pointer ${isSelected ? 'ring-2 ring-gray-500 ring-offset-2 rounded-lg p-2' : 'p-2'}`}
      layout
    >
      <label className="block text-sm font-semibold text-black dark:text-white mb-3">
        {component.label}
        {component.required && <span className="text-red-500 ml-1 text-base">*</span>}
      </label>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">{t('elements.datetime.date')}</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">{t('elements.datetime.time')}</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md"
          />
        </div>
      </div>
    </motion.div>
  );
};

// Geolocation Component
export const GeolocationElement: React.FC<FormElementProps> = ({ component, isSelected, onClick }) => {
  const { t } = useTranslation();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError(t('elements.geolocation.notSupported'));
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLoading(false);
      },
      (error) => {
        setError(t('elements.geolocation.error'));
        setLoading(false);
      },
      {
        enableHighAccuracy: component.geolocationOptions?.enableHighAccuracy || true,
        timeout: component.geolocationOptions?.timeout || 5000,
        maximumAge: component.geolocationOptions?.maximumAge || 0
      }
    );
  };

  return (
    <motion.div
      onClick={onClick}
      className={`group cursor-pointer ${isSelected ? 'ring-2 ring-gray-500 ring-offset-2 rounded-lg p-2' : 'p-2'}`}
      layout
    >
      <label className="block text-sm font-semibold text-black dark:text-white mb-3">
        {component.label}
        {component.required && <span className="text-red-500 ml-1 text-base">*</span>}
      </label>
      
      <div className="space-y-4">
        <motion.button
          type="button"
          onClick={getCurrentLocation}
          disabled={loading}
          className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
        >
          <MapPin className="w-5 h-5 mr-2" />
          {loading ? t('elements.geolocation.locating') : t('elements.geolocation.getLocation')}
        </motion.button>

        {location && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
          >
            <div className="flex items-center mb-2">
              <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2" />
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {t('elements.geolocation.positionCaptured')}
              </span>
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300 font-mono bg-white dark:bg-gray-900 p-2 rounded border">
              {t('elements.geolocation.latitude')}: {location.lat.toFixed(6)}<br />
              {t('elements.geolocation.longitude')}: {location.lng.toFixed(6)}
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
          >
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              ❌ {error}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};