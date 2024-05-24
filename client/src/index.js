import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
import { AuthProvider } from 'ClientPanel/utils/AuthContext';
import { FetchProvider } from 'ClientPanel/utils/FetchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <FetchProvider>
        <App />
      </FetchProvider>
    </AuthProvider>
  </React.StrictMode>
);
