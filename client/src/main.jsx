import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import {
  FpjsProvider,
  // defaultEndpoint,
  // defaultScriptUrlPattern
} from '@fingerprintjs/fingerprintjs-pro-react'
ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
    <FpjsProvider
      loadOptions={{
        apiKey: "sN3MhVOMD4ry5UjvEcYy",
        region: "ap"
      }}
    >
      <App />
    </FpjsProvider>
    </Router>
);
