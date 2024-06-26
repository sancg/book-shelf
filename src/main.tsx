import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import BookWrapper from './context/books.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BookWrapper>
      <App />
    </BookWrapper>
  </React.StrictMode>
);
