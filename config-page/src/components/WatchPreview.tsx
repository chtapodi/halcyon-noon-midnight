import React from 'react';
import { useConfig } from '../context/PebbleConfigContext';
import { Settings } from '../context/types';
import { getPreviewForValue } from '../data/widgetTypes';

export interface WatchPreviewProps {
    overrideSettings?: Partial<Settings>;
    isNight?: boolean;
};

export const WatchPreview: React.FC<WatchPreviewProps> = ({ overrideSettings, isNight = false }) => {
    const { settings } = useConfig();

    const effectiveSettings = { ...settings, ...overrideSettings };

    const getHex = (color: string) => {
        if (!color) return '#000000';
        return color.startsWith('#') ? color : `#${color}`;
    };

    return (
        <div className="halite-watch-preview-container">
            <div className="halite-watch-face">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="144"
                    height="168"
                    viewBox="0 0 144 168"
                    fill="none"
                    className="halite-watch-preview"
                >
                    <path
                        id="SETTING_RING_NIGHT_COLOR"
                        fill={getHex(!isNight ? effectiveSettings.SETTING_RING_NIGHT_COLOR : effectiveSettings.SETTING_NIGHT_RING_NIGHT_COLOR)}
                        d="M0 86h144v82H0z"
                    />
                    <path
                        id="SETTING_RING_DAY_COLOR"
                        fill={getHex(!isNight ? effectiveSettings.SETTING_RING_DAY_COLOR : effectiveSettings.SETTING_NIGHT_RING_DAY_COLOR)}
                        d="M0 0h144v82H0z"
                    />
                    <path
                        id="SETTING_RING_SUNRISE_COLOR"
                        fill={getHex(!isNight ? effectiveSettings.SETTING_RING_SUNRISE_COLOR : effectiveSettings.SETTING_NIGHT_RING_SUNRISE_COLOR)}
                        d="M19 72v25H0V72h19Z"
                    />
                    <path
                        id="SETTING_RING_SUNSET_COLOR"
                        fill={getHex(!isNight ? effectiveSettings.SETTING_RING_SUNSET_COLOR : effectiveSettings.SETTING_NIGHT_RING_SUNSET_COLOR)}
                        d="M144 72v25h-19V72h19Z"
                    />
                    <path
                        id="SETTING_BG_COLOR"
                        fill={getHex(!isNight ? effectiveSettings.SETTING_BG_COLOR : effectiveSettings.SETTING_NIGHT_BG_COLOR)}
                        d="M16 16h112v136H16z"
                    />
                    <path
                        id="SETTING_PIP_COLOR_SECONDARY"
                        fill={getHex(!isNight ? effectiveSettings.SETTING_PIP_COLOR_SECONDARY : effectiveSettings.SETTING_NIGHT_PIP_COLOR_SECONDARY)}
                        d="M17 19.121 19.12 17l4.243 4.243-2.122 2.12L17 19.122ZM125.243 17l2.121 2.121-4.243 4.243L121 21.243 125.243 17ZM17 149.243l2.121 2.121 4.243-4.243L21.242 145 17 149.243ZM125.243 151.364l2.121-2.121-4.243-4.243-2.121 2.121 4.243 4.243ZM15.83 105.404l5.949-.783.391 2.975-5.948.783-.392-2.975ZM16.49 38.275l5.796 1.553-.777 2.897-5.795-1.553.777-2.897ZM33.275 151.51l1.552-5.796 2.898.776-1.553 5.796-2.897-.776ZM34.827 22.286l-1.552-5.796 2.897-.776 1.553 5.795-2.898.777ZM90.595 145.83l.784 5.949-2.975.391-.783-5.949 2.974-.391ZM87.621 21.779l.783-5.95 2.975.392-.784 5.95-2.974-.392ZM51.62 151.778l.784-5.948 2.974.391-.783 5.949-2.974-.392ZM54.595 15.83l.784 5.949-2.975.391-.783-5.949 2.974-.391ZM106.827 152.286l-1.552-5.796 2.897-.776 1.553 5.795-2.898.777ZM105.275 21.51l1.552-5.796 2.898.776-1.553 5.796-2.897-.777ZM122.221 104.621l5.949.783-.391 2.975-5.949-.783.391-2.975ZM121.714 39.827l5.795-1.552.777 2.897-5.796 1.553-.776-2.898ZM15.714 127.827l5.795-1.552.777 2.897-5.796 1.553-.776-2.898ZM16.221 60.621l5.95.783-.392 2.975-5.95-.783.392-2.975ZM122.49 126.275l5.796 1.552-.777 2.898-5.795-1.553.776-2.897ZM121.83 61.404l5.949-.783.391 2.975-5.948.783-.392-2.975Z"
                    />
                    <path
                        id="SETTING_PIP_COLOR_PRIMARY"
                        fill={getHex(!isNight ? effectiveSettings.SETTING_PIP_COLOR_PRIMARY : effectiveSettings.SETTING_NIGHT_PIP_COLOR_PRIMARY)}
                        d="M17 83h6v3h-6v-3ZM70 23v-5h3v5h-3ZM70 151v-6h3v6h-3ZM121 83h6v3h-6v-3Z"
                    />
                    <g id="SETTING_RING_STROKE_COLOR" fill={getHex(!isNight ? effectiveSettings.SETTING_RING_STROKE_COLOR : effectiveSettings.SETTING_NIGHT_RING_STROKE_COLOR)} fillRule="evenodd" clipRule="evenodd">
                        <path d="M125 19H19v130h106V19ZM16 16v136h112V16H16Z" />
                        <path d="M0 97h19V72H0v3h16v19H0v3ZM144 72h-19v25h19v-3h-16V75h16v-3Z" />
                    </g>
                    <path
                        id="SETTING_SUN_FILL_COLOR"
                        transform={isNight ? "translate(53, 151)" : undefined}
                        fill={getHex(!isNight ? effectiveSettings.SETTING_SUN_FILL_COLOR : effectiveSettings.SETTING_NIGHT_SUN_FILL_COLOR)}
                        d="M52 8.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z"
                    />
                    <path
                        id="SETTING_SUN_STROKE_COLOR"
                        transform={isNight ? "translate(53, 151)" : undefined}
                        fill={getHex(!isNight ? effectiveSettings.SETTING_SUN_STROKE_COLOR : effectiveSettings.SETTING_NIGHT_SUN_STROKE_COLOR)}
                        fillRule="evenodd"
                        d="M43.5 14a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Zm0 3a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17Z"
                        clipRule="evenodd"
                    />
                </svg>
                <div className="halite-watch-preview-content">
                    {effectiveSettings.SETTING_WIDGET_UPPER_SECONDARY && (
                        <div className="halite-watch-preview-widget secondary upper" style={{ color: getHex(isNight ? effectiveSettings.SETTING_NIGHT_SUBTEXT_SECONDARY_COLOR : effectiveSettings.SETTING_SUBTEXT_SECONDARY_COLOR) }}>
                            {getPreviewForValue(effectiveSettings.SETTING_WIDGET_UPPER_SECONDARY, Number(effectiveSettings.SETTING_LANGUAGE) || 0, Number(effectiveSettings.SETTING_TEMP_UNIT) === 1)}
                        </div>
                    )}
                    {effectiveSettings.SETTING_WIDGET_UPPER_PRIMARY && (
                        <div className="halite-watch-preview-widget primary upper" style={{ color: getHex(isNight ? effectiveSettings.SETTING_NIGHT_SUBTEXT_PRIMARY_COLOR : effectiveSettings.SETTING_SUBTEXT_PRIMARY_COLOR) }}>
                            {getPreviewForValue(effectiveSettings.SETTING_WIDGET_UPPER_PRIMARY, Number(effectiveSettings.SETTING_LANGUAGE) || 0, Number(effectiveSettings.SETTING_TEMP_UNIT) === 1)}
                        </div>
                    )}
                    <div className="halite-watch-time" style={{ color: getHex(!isNight ? effectiveSettings.SETTING_TIME_COLOR : effectiveSettings.SETTING_NIGHT_TIME_COLOR) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="22" viewBox="0 0 80 22" fill="currentColor">
                            <path d="M0 4.48V0h8.96v17.92h4.48v4.48H0v-4.48h4.48V4.48zM16.493 22.4V0h15.68v22.4zm4.48-17.92v13.44h6.72V4.48zM36.329 22.4v-4.48h4.48v4.48zm0-13.44V4.48h4.48v4.48zM60.658 0v22.4h-15.68v-4.48h11.2v-4.48h-8.96V8.96h8.96V4.48h-11.2V0zM64.814 22.4V0h15.68v22.4zm11.2-8.96h-6.72v4.48h6.72zm-6.72-4.48h6.72V4.48h-6.72z" />
                        </svg>
                    </div>
                    {effectiveSettings.SETTING_WIDGET_LOWER_PRIMARY && (
                        <div className="halite-watch-preview-widget primary lower" style={{ color: getHex(!isNight ? effectiveSettings.SETTING_SUBTEXT_PRIMARY_COLOR : effectiveSettings.SETTING_NIGHT_SUBTEXT_PRIMARY_COLOR) }}>
                            {getPreviewForValue(effectiveSettings.SETTING_WIDGET_LOWER_PRIMARY, Number(effectiveSettings.SETTING_LANGUAGE) || 0, Number(effectiveSettings.SETTING_TEMP_UNIT) === 1)}
                        </div>
                    )}
                    {effectiveSettings.SETTING_WIDGET_LOWER_SECONDARY && (
                        <div className="halite-watch-preview-widget secondary lower" style={{ color: getHex(!isNight ? effectiveSettings.SETTING_SUBTEXT_SECONDARY_COLOR : effectiveSettings.SETTING_NIGHT_SUBTEXT_SECONDARY_COLOR) }}>
                            {getPreviewForValue(effectiveSettings.SETTING_WIDGET_LOWER_SECONDARY, Number(effectiveSettings.SETTING_LANGUAGE) || 0, Number(effectiveSettings.SETTING_TEMP_UNIT) === 1)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
