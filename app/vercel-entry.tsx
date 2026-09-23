import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Site from './site';
import './globals.css';
import './refinements.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Site />
  </StrictMode>,
);
