import React from 'react';
import { WatchPreview } from './WatchPreview';
import { Select } from './Select';
import { useCapabilities, useConfig } from '../context/PebbleConfigContext';
import { getWidgetOptions } from '../data/widgetTypes';

export const WidgetSelector: React.FC = () => {
    const capabilities = useCapabilities();
    const { settings } = useConfig();
    const lang = Number(settings.SETTING_LANGUAGE) || 0;
    const isImperial = Number(settings.SETTING_TEMP_UNIT) === 1;
    const isRound = capabilities.ROUND && !capabilities.RECT;
    const widgetOptions = React.useMemo(
        () => getWidgetOptions(lang, !!capabilities.HEALTH, !!capabilities.HRM, isImperial),
        [lang, capabilities.HEALTH, capabilities.HRM, isImperial],
    );

    return (
        <div className="widget-selector-container">
            <div className={`widget-selector-preview ${isRound ? 'round' : 'rect'}`}>
                <WatchPreview />
            </div>
            <div className="widget-selector-controls">
                <Select
                    label="Upper text 2"
                    messageKey="SETTING_WIDGET_UPPER_SECONDARY"
                    options={widgetOptions}
                />
                <Select
                    label="Upper text 1"
                    messageKey="SETTING_WIDGET_UPPER_PRIMARY"
                    options={widgetOptions}
                />
                <Select
                    label="Lower text 1"
                    messageKey="SETTING_WIDGET_LOWER_PRIMARY"
                    options={widgetOptions}
                />
                <Select
                    label="Lower text 2"
                    messageKey="SETTING_WIDGET_LOWER_SECONDARY"
                    options={widgetOptions}
                />
            </div>
        </div>
    );
};
