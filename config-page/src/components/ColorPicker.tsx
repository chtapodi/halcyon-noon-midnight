import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { pebbleColors, colorOrder } from '../color-data';

interface ColorPickerProps {
  colorKey: string;
  themeType: 'day' | 'night';
  label: string;
  onColorChange?: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = React.memo(({ 
  colorKey, 
  themeType, 
  label, 
  onColorChange 
}) => {
  const { getColor, updateColor, subscribe, unsubscribe, isLoading } = useTheme();
  const [color, setColor] = useState<string>('#FFFFFF');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    // Load current color using context method
    const currentColor = getColor(colorKey, themeType);
    if (currentColor) {
      setColor(currentColor.startsWith('#') ? currentColor : `#${currentColor}`);
    }

    // Subscribe to theme changes using context method
    const subscriber = () => {
      const updatedColor = getColor(colorKey, themeType);
      if (updatedColor) {
        setColor(updatedColor.startsWith('#') ? updatedColor : `#${updatedColor}`);
      }
    };
    subscribe(subscriber);

    return () => {
      // Clean up subscription using context method
      unsubscribe(subscriber);
    };
  }, [getColor, subscribe, unsubscribe, isLoading, colorKey, themeType]);

  // Memoized color change handler
  const handleColorChange = useCallback((newColor: string) => {
    // Ensure color starts with #
    const formattedColor = newColor.startsWith('#') ? newColor : `#${newColor}`;
    setColor(formattedColor);

    // Update color using context method
    updateColor(colorKey, formattedColor.replace('#', ''), themeType);
    onColorChange?.(formattedColor);
  }, [updateColor, colorKey, themeType, onColorChange]);

  // Memoized color name getter
  const getColorName = useCallback((hex: string) => {
    const cleanHex = hex.replace('#', '').toUpperCase();
    // Check both formats: with and without #
    return pebbleColors[`#${cleanHex}`]?.name || pebbleColors[cleanHex]?.name || 'Custom Color';
  }, []);

  // Memoized color name to prevent unnecessary recalculations
  const colorName = useMemo(() => getColorName(color), [color, getColorName]);

  if (isLoading) {
    return <div className="color-picker-loading">Loading...</div>;
  }

  return (
    <div className="color-picker">
      <label className="color-label">
        {label}:
        <div 
          className="color-display" 
          onClick={() => setShowModal(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setShowModal(true);
            }
          }}
          aria-label={`Change ${label} color, current value ${color.toUpperCase()}`}
        >
          <div 
            className="color-swatch" 
            style={{ backgroundColor: color }}
            title={`Click to change ${label}`}
            aria-hidden="true"
          />
          <span className="color-hex" aria-label={`Color hex value ${color.toUpperCase()}`}>
            {color.toUpperCase()}
          </span>
          <span className="color-name" aria-label={`Color name ${colorName}`}>
            {colorName}
          </span>
        </div>
      </label>

      {showModal && (
        <ColorModal
          currentColor={color}
          onSelect={handleColorChange}
          onClose={() => setShowModal(false)}
          aria-label="Color selection modal"
        />
      )}
    </div>
  );
});

ColorPicker.displayName = 'ColorPicker';

// ColorModal component for color selection
interface ColorModalProps {
  currentColor: string;
  onSelect: (color: string) => void;
  onClose: () => void;
}

const ColorModal: React.FC<ColorModalProps> = ({ currentColor, onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use the original visually pleasing color order
  const filteredColors = colorOrder.filter(color => {
    if (color === null) return true; // Keep null values for spacing
    
    const cleanColor = color.replace('#', '');
    const colorInfo = pebbleColors[color] || pebbleColors[cleanColor];
    const searchLower = searchTerm.toLowerCase();
    return (
      cleanColor.toLowerCase().includes(searchLower) ||
      (colorInfo?.name.toLowerCase().includes(searchLower) || false)
    );
  });

  return (
    <div 
      className="color-modal-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Color selection dialog"
    >
      <div 
        className="color-modal" 
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        <div className="modal-header">
          <h3 id="color-modal-title">Select Color</h3>
          <button 
            className="modal-close" 
            onClick={onClose} 
            aria-label="Close color selection dialog"
          >
            ×
          </button>
        </div>
        
        <div className="modal-search">
          <label htmlFor="color-search" className="visually-hidden">Search colors</label>
          <input
            id="color-search"
            type="text"
            placeholder="Search colors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search colors"
          />
        </div>

        <div 
          className="color-grid-modal"
          role="grid"
          aria-labelledby="color-modal-title"
        >
          {filteredColors.map((color, index) => {
            if (color === null) {
              return <div key={`blank-${index}`} className="color-swatch-modal blank" aria-hidden="true" />;
            }
            
            const cleanColor = color.replace('#', '');
            const colorInfo = pebbleColors[color] || pebbleColors[cleanColor];
            const displayColor = color.startsWith('#') ? color : `#${color}`;
            const isSelected = displayColor.toUpperCase() === currentColor.toUpperCase();
            
            return (
              <button
                key={displayColor}
                type="button"
                className={`color-swatch-modal ${isSelected ? 'selected' : ''}`}
                style={{ backgroundColor: displayColor }}
                title={`${colorInfo?.name || 'Unknown'} (${cleanColor.toUpperCase()})`}
                onClick={() => onSelect(displayColor)}
                aria-label={`${colorInfo?.name || 'Unknown'} color, hex value ${cleanColor.toUpperCase()}${isSelected ? ', currently selected' : ''}`}
                role="gridcell"
              >
                {isSelected && <span aria-hidden="true">✓</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;