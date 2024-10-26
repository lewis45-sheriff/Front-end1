import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Put any other imports below so that CSS from your
// components takes precedence over default styles.

// Create a root Concurrent Mode component
const root = ReactDOM.createRoot(document.getElementById('root'));

// Use .render method on the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();