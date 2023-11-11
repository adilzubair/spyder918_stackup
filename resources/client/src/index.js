import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the /client import
import App from './App';


// Create a root.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Initial render: Render the App component to the root.
root.render(<App />);
