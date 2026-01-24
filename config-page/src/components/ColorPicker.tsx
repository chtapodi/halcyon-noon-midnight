import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { pebbleColors } from '../color-data';

interface ColorPickerProps {
  colorKey: string;
  themeType: 'day' | 'night';
  label: string;
  onColorChange?: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ 
  colorKey, 
  themeType, 
  label, 
  onColorChange 
}) => {
  const { themeManager, isLoading } = useTheme();
  const [color, setColor] = useState<string>('#FFFFFF');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isLoading || !themeManager) return;

    // Load current color from theme manager
    const currentColor = themeManager.getColor(colorKey, themeType);
    if (currentColor) {
      setColor(currentColor.startsWith('#') ? currentColor : `#${currentColor}`);
    }

    // Subscribe to theme changes
    const subscriber = () => {
      const updatedColor = themeManager.getColor(colorKey, themeType);
      if (updatedColor) {
        setColor(updatedColor.startsWith('#') ? updatedColor : `#${updatedColor}`);
      }
    };
    themeManager.subscribe(subscriber);

    return () => {
      // Clean up subscription
      if (themeManager) {
        themeManager.unsubscribe(subscriber);
      }
    };
  }, [themeManager, isLoading, colorKey, themeType]);

  const handleColorChange = (newColor: string) => {
    // Ensure color starts with #
    const formattedColor = newColor.startsWith('#') ? newColor : `#${newColor}`;
    setColor(formattedColor);

    if (themeManager) {
      themeManager.updateColor(colorKey, formattedColor.replace('#', ''), themeType);
      onColorChange?.(formattedColor);
    }
  };

  const getColorName = (hex: string) => {
    const cleanHex = hex.replace('#', '').toUpperCase();
    // Check both formats: with and without #
    return pebbleColors[`#${cleanHex}`]?.name || pebbleColors[cleanHex]?.name || 'Custom Color';
  };

  if (isLoading) {
    return <div className="color-picker-loading">Loading...</div>;
  }

  return (
    <div className="color-picker">
      <label className="color-label">
        {label}:
        <div className="color-display" onClick={() => setShowModal(true)}>
          <div 
            className="color-swatch" 
            style={{ backgroundColor: color }}
            title={`Click to change ${label}`}
          />
          <span className="color-hex">{color.toUpperCase()}</span>
          <span className="color-name">{getColorName(color)}</span>
        </div>
      </label>

      {showModal && (
        <ColorModal
          currentColor={color}
          onSelect={handleColorChange}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

// ColorModal component for color selection
interface ColorModalProps {
  currentColor: string;
  onSelect: (color: string) => void;
  onClose: () => void;
}

const ColorModal: React.FC<ColorModalProps> = ({ currentColor, onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get all color hex values (both with and without #)
  const allColors = Object.keys(pebbleColors);
  const colorOrder = allColors.map(c => c.startsWith('#') ? c : `#${c}`);
  
  const filteredColors = colorOrder.filter(color => {
    const cleanColor = color.replace('#', '');
    const colorInfo = pebbleColors[color] || pebbleColors[cleanColor];
    const searchLower = searchTerm.toLowerCase();
    return (
      cleanColor.toLowerCase().includes(searchLower) ||
      (colorInfo?.name.toLowerCase().includes(searchLower) || false)
    );
  });

  return (
    <div className="color-modal-overlay" onClick={onClose}>
      <div className="color-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Select Color</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-search">
          <input
            type="text"
            placeholder="Search colors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="color-grid-modal">
          {filteredColors.map((color) => {
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
              >
                {isSelected && <span>✓</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;