import React from 'react';

import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './index.css';

async function enableMocking() {
  if (process.env.NODE_ENV === 'prod') {
    return;
  }
  const { worker } = await import('./mocks/browser.ts');
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
