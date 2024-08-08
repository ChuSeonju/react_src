import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import ColorProvider from "./ColorProvider";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ColorProvider>
    <App />
  </ColorProvider>
);
