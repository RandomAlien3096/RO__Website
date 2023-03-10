import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Footer, About, Features, Services, Header, Portfolio, Contact } from './containers';
import { Article, Brand, Cta, Feature, Navbar, ScrollToTop } from './components';
import { Project1, Project2, Project3, Project4, Project5, Project6, Project7 } from './pages'
import { ContactForm } from './pages/contactform';

import { ParallaxProvider } from 'react-scroll-parallax';

import './App.css';

const App = () => {
  return (
    <ParallaxProvider>
      <Routes>
        <Route path='/' element={
          <div className = "App">
            <div className='gradient__bg'>
              <Navbar />
              <Header />
            </div>
            <About />
            <Services />
            {/* <Portfolio />
            <Contact /> */}
            <Footer />
          </div>
        } />
        <Route path='/project1' element = {<Project1 />} />
        <Route path='/project2' element = {<Project2 />} />
        <Route path='/project3' element = {<Project3 />} />
        <Route path='/project4' element = {<Project4 />} />
        <Route path='/project5' element = {<Project5 />} />
        <Route path='/project6' element = {<Project6 />} />
        <Route path='/project7' element = {<Project7 />} />
        <Route path='/contactForm' element = {<ContactForm />} />
        <Route path='/services' element = {<Services />} />
      </Routes>
      </ParallaxProvider>
  );
}

export default App