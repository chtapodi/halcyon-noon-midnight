import React, { useState, useCallback, useMemo } from 'react';
import { useConfig } from '../context/ConfigContext';
import { pebbleColors, colorOrder } from '../color-data';
import { ThemeType } from '../types';

interface ColorPickerProps {
  colorKey: string;
  themeType: ThemeType;
  label: string;
  onColorChange?: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = React.memo(({ 
  colorKey, 
  themeType, 
  label, 
  onColorChange 
}) => {
  const { state, updateColor, getColorName, getAvailableColors, openColorPicker, closeColorPicker } = useConfig();
  
  // Get current color value
  const currentColor = state.theme[themeType].colors[colorKey] || '#FFFFFF';
  
  // Check if this color picker is active
  const pickerId = `${themeType}-${colorKey}`;
  const isActive = state.ui.activeColorPicker === pickerId;
  
  const [showModal, setShowModal] = useState(false);

// Handle color change
  const handleColorChange = useCallback((newColor: string) => {
    // Ensure color starts with #
    const formattedColor = newColor.startsWith('#') ? newColor : `#${newColor}`;
    
    // Update color using context
    updateColor(themeType, colorKey, formattedColor);
    onColorChange?.(formattedColor);
    
    // Close modal after selection
    setShowModal(false);
  }, [updateColor, themeType, colorKey, onColorChange]);

  // Handle opening color picker modal
  const handleOpenPicker = useCallback(() => {
    openColorPicker(colorKey, themeType);
    setShowModal(true);
  }, [openColorPicker, colorKey, themeType]);

  // Handle closing modal
  const handleCloseModal = useCallback(() => {
    closeColorPicker();
    setShowModal(false);
  }, [closeColorPicker]);

  // Get color name from context
  const displayName = getColorName(currentColor);

  return (
    <div className="color-picker">
      <label className="color-label">
        {label}:
        <div 
          className="color-display" 
          onClick={handleOpenPicker}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpenPicker();
            }
          }}
          aria-label={`Change ${label} color, current value ${currentColor.toUpperCase()}`}
        >
          <div 
            className="color-swatch" 
            style={{ backgroundColor: currentColor }}
            title={`Click to change ${label}`}
            aria-hidden="true"
          />
          <span className="color-hex" aria-label={`Color hex value ${currentColor.toUpperCase()}`}>
            {currentColor.toUpperCase()}
          </span>
          <span className="color-name" aria-label={`Color name ${displayName}`}>
            {displayName}
          </span>
        </div>
      </label>

      {showModal && (
        <ColorModal
          currentColor={currentColor}
          onSelect={handleColorChange}
          onClose={handleCloseModal}
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
  // Use the full color order without filtering
  const colors = useMemo(() => colorOrder, []);

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

        <div 
          className="color-grid-modal"
          role="grid"
          aria-labelledby="color-modal-title"
        >
          {colors.map((color, index) => {
            if (color === null) {
              return <div key={`blank-${index}`} className="color-swatch-modal blank" aria-hidden="true" />;
            }
            
            // Safely handle color processing
            const colorStr = color || '';
            const cleanColor = colorStr.replace('#', '');
            const colorInfo = pebbleColors[colorStr] || pebbleColors[cleanColor];
            const displayColor = colorStr.startsWith('#') ? colorStr : `#${colorStr}`;
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