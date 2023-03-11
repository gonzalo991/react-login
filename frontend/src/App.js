import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router';
import Header from './components/layout/Header';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='container'>
          <Header />
          <Router />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
