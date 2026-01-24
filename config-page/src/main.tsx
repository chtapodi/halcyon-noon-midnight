import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

// Create root element for React
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found!');
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}