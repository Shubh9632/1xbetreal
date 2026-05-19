import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Mount React into #react-root (separate from Angular's #root)
createRoot(document.getElementById('react-root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
