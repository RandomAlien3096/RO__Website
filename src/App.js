import React from 'react';

import { Footer, About, Features, Services, Header, Portfolio, Contact } from './containers';
import { Article, Brand, Cta, Feature, Navbar } from './components';
import './App.css';
const App = () => {
  return (
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
  )
}

export default App