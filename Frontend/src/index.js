import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import MyContextProvider from './CustomContext';
import { ClerkProvider } from '@clerk/clerk-react'


const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY || process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
console.log("ENV VARIABLES:", process.env);
console.log("CLERK KEY:", process.env.REACT_APP_CLERK_PUBLISHABLE_KEY);


console.log(PUBLISHABLE_KEY)
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MyContextProvider>
    <BrowserRouter>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/en/general">
      <App />
    </ClerkProvider>
    </BrowserRouter>
  </MyContextProvider>
);