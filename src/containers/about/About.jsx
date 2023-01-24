import React from 'react';
import './about.css';
import t_four from '../../assets/triangles/4-t.png';
import t_two from '../../assets/triangles/2-t.png';
import t_three from '../../assets/triangles/3-t.png';
import astronaut from '../../assets/astronaut.png';

import CV from '../../assets/files/RafaelOliva_CV.pdf';

const about = () => {
  return (
    <div className='RO__about' id="about">
      <div className='RO__about-title'>
        <h1 id='about'><a href='/about'>About Me</a></h1>
      </div>
      <div className='RO__about-content'>
        <div className='RO__about-content_p'>
          <p>My name is Rafael. I am a Mechatronics 
            engineer based in Guatemala City driven 
            by strategy, data analysis and optimal 
            results in my projects.</p>

          <p>I have spent my 3+ years of experience 
            as a data analyst and a data scientist 
            looking to answer the questions nobody 
            has asked yet. As well, to redraw the 
            data studied with my front end developer 
            skills so we have a better comprehension 
            of what we have.</p>

            <p>I’m here to help you develop your 
              company to understand it’s past, present 
              and to give you an idea how to better 
              develop your future. As well, to get a 
              greater reach to new customers with a top 
              of the line website, custom made for your 
              needs. </p>
        </div>
        <div className='RO__about-content_img-1'>
          <img src = {t_four} alt = "4th triangle" />
        </div>
        <div className='RO__about-content_img-2'>
          <img src = {t_two} alt = "2nd triangle" />
        </div>
        <div className='RO__about-content_img-3'>
          <img src = {t_three} alt = "3rd triangle" />
        </div>
        <div className='RO__about-content_img-4'>
          <img src = {astronaut} alt = "astronaut" />
        </div>
      </div>
      <div className='RO__about-more'>
        <div className='RO__about-more_quote'>
          <p>"Science can amuse and fascinate us all, 
            but it is engineering that changes the world."</p>
        </div>
        <div className='RO__about-more_button'>
          <a href={CV} download='RafaelOliva_cv.pdf'>
            <button type='button' >More...</button>
          </a>
        </div>
      </div>

    </div>
  )
}

export default about