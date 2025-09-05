import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RoutesWeb from './Routes';
import './index.css';
import { RouterProvider } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RoutesWeb />
  </StrictMode>,
);