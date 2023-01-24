import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Footer, About, Features, Services, Header, Portfolio, Contact } from './containers';
import { Article, Brand, Cta, Feature, Navbar } from './components';
import './App.css';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={
        <div className = "App">
          <div className='gradient__bg'>
            <Navbar />
            <Header />
          </div>
          <About />
          <Services />
          <Portfolio />
          <Contact />
          <Footer />
        </div>
      } />
    </Routes>
  )
}

export default App