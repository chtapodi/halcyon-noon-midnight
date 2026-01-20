import { ThemeType, PreviewConfig } from '../types/index';

export class PreviewRenderer {
  private previews: Map<string, PreviewConfig> = new Map();
  private colorMappings: Map<string, string[]> = new Map();

  constructor() {
    this.initializePreviews();
    this.setupColorMappings();
  }

  updatePreviewColors(colorKey: string, colorValue: string, themeType: ThemeType): void {
    console.log(`🎨 updatePreviewColors called: ${colorKey} = ${colorValue} (${themeType})`);

    const svgId = this.getSvgId(themeType);
    const previewId = colorKey;

    // Update the main preview
    this.updateSVGElement(svgId, previewId, colorValue);

    // Update the mini preview
    const miniPreviewId = this.getMiniPreviewId(colorKey, themeType);
    if (miniPreviewId) {
      this.updateSVGElement(svgId, miniPreviewId, colorValue);
    }
  }

  updatePreviewFromTheme(theme: { [key: string]: string }, themeType: ThemeType): void {
    Object.entries(theme).forEach(([key, value]) => {
      const colorKey = this.getColorKeyForTheme(key, themeType);
      this.updatePreviewColors(colorKey, value, themeType);
    });
  }

  initializePreviews(): void {
    // Register day preview
    this.previews.set('day', {
      svgId: 'svg-preview',
      containerId: 'svg-preview-container',
      isVisible: true,
    });

    // Register night preview
    this.previews.set('night', {
      svgId: 'svg-night-preview',
      containerId: 'svg-night-preview-container',
      isVisible: false,
    });
  }

  showPreview(themeType: ThemeType): void {
    const preview = this.previews.get(themeType);
    const container = preview ? document.getElementById(preview.containerId) : null;

    if (container) {
      container.style.display = 'block';
      if (preview) {
        preview.isVisible = true;
      }
    }
  }

  hidePreview(themeType: ThemeType): void {
    const preview = this.previews.get(themeType);
    const container = preview ? document.getElementById(preview.containerId) : null;

    if (container) {
      container.style.display = 'none';
      if (preview) {
        preview.isVisible = false;
      }
    }
  }

  togglePreview(themeType: ThemeType, visible: boolean): void {
    if (visible) {
      this.showPreview(themeType);
    } else {
      this.hidePreview(themeType);
    }
  }

  refreshAllPreviews(): void {
    // Get current values from all color inputs and update previews
    const colorInputs = document.querySelectorAll('input[type="hidden"][id*="COLOR"]');

    colorInputs.forEach((input) => {
      const inputElement = input as HTMLInputElement;
      const colorKey = inputElement.id;
      const colorValue = inputElement.value;
      const themeType = colorKey.startsWith('SETTING_NIGHT_') ? 'night' : 'day';

      if (colorValue) {
        this.updatePreviewColors(colorKey, colorValue, themeType);
      }
    });
  }

  createMiniPreview(theme: { [key: string]: string }, themeType: ThemeType): HTMLElement {
    const templateId = themeType === 'night' ? 'svg-night-preview' : 'svg-preview';
    const template = document.getElementById(templateId)!.cloneNode(true) as HTMLElement;

    // Remove the id to avoid conflicts
    template.removeAttribute('id');

    // Update fills
    Object.entries(theme).forEach(([key, value]) => {
      const colorKey = this.getColorKeyForTheme(key, themeType);
      const elements = template.querySelectorAll(`#${colorKey}`);

      elements.forEach((element) => {
        element.setAttribute('fill', '#' + value);
      });
    });

    return template;
  }

  resetPreviewsToDefaults(): void {
    // Reset all previews to default colors
    const defaultColors = {
      SETTING_RING_NIGHT_COLOR: '#0055AA',
      SETTING_RING_DAY_COLOR: '#00AAFF',
      SETTING_SUN_FILL_COLOR: '#FFFF00',
      SETTING_SUN_STROKE_COLOR: '#000000',
      SETTING_RING_SUNRISE_COLOR: '#FFAAAA',
      SETTING_RING_SUNSET_COLOR: '#FFAA00',
      SETTING_BG_COLOR: '#FFFFFF',
      SETTING_PIP_COLOR_SECONDARY: '#AAAAAA',
      SETTING_PIP_COLOR_PRIMARY: '#000000',
      SETTING_RING_STROKE_COLOR: '#000000',
    };

    Object.entries(defaultColors).forEach(([key, value]) => {
      this.updatePreviewColors(key, value, 'day');
      this.updatePreviewColors(`SETTING_NIGHT_${key.replace('SETTING_', '')}`, value, 'night');
    });
  }

  private updateSVGElement(svgId: string, elementId: string, colorValue: string): void {
    if (!colorValue) return;

    const svg = document.getElementById(svgId);
    if (!svg) return;

    const element = svg.querySelector(`#${elementId}`) as SVGElement;
    if (element) {
      const hexColor = colorValue.startsWith('#') ? colorValue : '#' + colorValue;
      element.setAttribute('fill', hexColor);
    }
  }

  private getSvgId(themeType: ThemeType): string {
    return themeType === 'night' ? 'svg-night-preview' : 'svg-preview';
  }

  private getMiniPreviewId(colorKey: string, themeType: ThemeType): string {
    // For mini previews, the IDs might be different
    if (themeType === 'night') {
      return colorKey.replace('SETTING_', 'SETTING_NIGHT_');
    }
    return colorKey;
  }

  private getColorKeyForTheme(baseKey: string, themeType: ThemeType): string {
    const prefix = themeType === 'night' ? 'SETTING_NIGHT_' : 'SETTING_';
    return prefix + baseKey.replace('SETTING_', '');
  }

  private setupColorMappings(): void {
    // Set up mappings for colors that affect multiple elements
    this.colorMappings.set('TIME_COLOR', ['TIME_TEXT', 'TIME_DISPLAY']);
    this.colorMappings.set('BG_COLOR', ['BACKGROUND', 'MAIN_BG']);
    this.colorMappings.set('RING_STROKE_COLOR', ['RING_OUTLINE', 'RING_BORDER']);

    // Add more mappings as needed
  }

  private updateColorMappings(colorKey: string, colorValue: string, themeType: ThemeType): void {
    const relatedElements = this.colorMappings.get(colorKey);
    if (!relatedElements) return;

    const svgId = this.getSvgId(themeType);

    relatedElements.forEach((elementId) => {
      this.updateSVGElement(svgId, elementId, colorValue);
    });
  }
}

export class PreviewManager {
  private static instance: PreviewRenderer;

  static getInstance(): PreviewRenderer {
    if (!PreviewManager.instance) {
      PreviewManager.instance = new PreviewRenderer();
    }
    return PreviewManager.instance;
  }

  static refreshAllPreviews(): void {
    this.getInstance().refreshAllPreviews();
  }

  static updateAllPreviews(): void {
    this.getInstance().refreshAllPreviews();
  }

  static showNightPreview(): void {
    this.getInstance().showPreview('night');
  }

  static hideNightPreview(): void {
    this.getInstance().hidePreview('night');
  }

  static toggleNightPreview(visible: boolean): void {
    this.getInstance().togglePreview('night', visible);
  }

  static createMiniPreview(theme: { [key: string]: string }, themeType: ThemeType): HTMLElement {
    return this.getInstance().createMiniPreview(theme, themeType);
  }

  static updatePreviewFromTheme(theme: { [key: string]: string }, themeType: ThemeType): void {
    this.getInstance().updatePreviewFromTheme(theme, themeType);
  }
}
