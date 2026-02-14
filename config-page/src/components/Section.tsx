import React from 'react';

export const Section: React.FC<{ title?: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="pebble-section">
    {title && <h2 className="pebble-section-title">{title}</h2>}
    <div className="pebble-section-content">
      {children}
    </div>
  </section>
);
