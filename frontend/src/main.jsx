import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Assuming App is a default export in App.js
import './index.css'; // Assuming you have your Tailwind or custom CSS here

// Create the root element and render the App component
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
