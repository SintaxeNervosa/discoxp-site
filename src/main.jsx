import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserFormPage from './pages/userForm/UserFormPage';

const router = createBrowserRouter([
  {
    path: "/register",
    element: <UserFormPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
