import React from 'react';
import { useEffect, useState } from 'react';
import './services.css';
import build_one from '../../assets/build1.png';

const Services = () => {

    const [text, setText] = useState("Get more value with you data with prediction models and machine learning techniques. Visualize and have a better understanding of the data that you have.");
    
    useEffect(() => {
      const subtitle = document.getElementsByClassName("RO__services-card_content-subtitles")[0];
      const words = text.split(" ");
      words.forEach((word, index) => {
        const span = document.createElement("span");
        span.innerHTML = `${word} `;
        span.classList.add("RO__services-card_content-subtitle_word");
        span.style.transitionDelay = `${index * 40}ms`;
        subtitle.appendChild(span);
      });
    }, [text]);

 

  return (
    <div className='RO__services' id='services'>
      <div className='RO__services-title'>
        <h1>Services</h1>
      </div>
      <div className='RO__services-content'>
        <div className='RO__services-content_cats'>
          <div className='RO__services-content_cats-DataAnalysis'>
            <div className='RO__services-content_cats-DataAnalysis_title'>
              <h2>Data Analysis</h2>
            </div>
            <div className='RO__services-content_cats-DataAnalysis_content'>
              <p>Get more value with you data with prediction models and machine 
                learning techniques. Visualize and have a better understanding 
                of the data that you have.</p>
            </div>
            <div className='RO__services-content_cats-DataAnalysis_bar'></div>
          </div>
          <div className='RO__services-content_cats-WebDev'>
            <div className='RO__services-content_cats-WebDev_title'>
              <h2>Web Development</h2>
            </div>
            <div className='RO__services-content_cats-WebDev_content'>
            <p>Your brand, needs a face and I’m here to do exactly that. With 
              specialized code and frameworks, I can deploy and make come to life 
              the face of your business and more.</p>
            </div>
            <div className='RO__services-content_cats-DataAnalysis_bar'></div>
          </div>
          <div className='RO__services-content_cats-BS'>
            <div className='RO__services-content_cats-BS_title'>
              <h2>Business Analysis</h2>
            </div>
            <div className='RO__services-content_cats-BS_content'>
              <p>Take your company to the next level with specialize statistical 
                models, data analysis, and more. To better understand the state 
                of the company, as well as to solve business problems with ease. </p>
            </div>
            <div className='RO__services-content_cats-DataAnalysis_bar'></div>
          </div>
        </div>
        <div className='RO__services-content_img'>
          <img src = {build_one} alt = "visual representation for services" />
        </div>
      </div>

      {/* ------------------------Cards---------------------- */}
      <div className='RO__services-card'>
        <div className='RO__services-card_content'>
          <h3 className='RO__services-card_content-title'>Data Analysis</h3>
          <h4 className='RO__services-card_content-subtitles'>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Services