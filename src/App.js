import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Footer, About, Features, Services, Header, Portfolio, Contact } from './containers';
import { Article, Brand, Cta, Feature, Navbar } from './components';
import { Project1, Project2 } from './pages'

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
      <Route path='/project1' element = {<Project1 />} />
      <Route path='/project2' element = {<Project2 />} />
    </Routes>
  )
}

export default App