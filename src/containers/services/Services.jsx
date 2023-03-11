import React from 'react';
import { useEffect, useState } from 'react';
import './services.css';
import build_one from '../../assets/build1.png';

const Services = () => {

    // const [text, setText] = useState("Get more value with you data with prediction models and machine learning techniques. Visualize and have a better understanding of the data that you have.");
    
    // useEffect(() => {
    //   const subtitle = document.getElementsByClassName("RO__services-card_content-subtitles")[0];
    //   const words = text.split(" ");
    //   words.forEach((word, index) => {
    //     const span = document.createElement("span");
    //     span.innerHTML = `${word} `;
    //     span.classList.add("RO__services-card_content-subtitles_word");
    //     span.style.transitionDelay = `${index * 40}ms`;
    //     subtitle.appendChild(span);
    //   });
    // }, [text]);

 

  return (
    <div className='RO__services' id='services'>
      <div className='RO__services-title'>
        <h1>Services</h1>
      </div>
      

      {/* ------------------------Cards---------------------- */}
      <div className='RO__services-card'>
        <div className='RO__services-card_content'>
          <h3 className='RO__services-card_content-title'>Data Analysis</h3>
          <h4 className='RO__services-card_content-subtitles'>
            <span className='RO__services-card_content-subtitles_word'>
              Get more value with you data with prediction models and machine 
              learning techniques. Visualize and have a better understanding 
              of the data that you have.
            </span>
          </h4>
        </div>
      </div>
      <div className='RO__services-card'>
        <div className='RO__services-card_content'>
          <h3 className='RO__services-card_content-title'>Web Development</h3>
          <h4 className='RO__services-card_content-subtitles'>
            <span className='RO__services-card_content-subtitles_word'>
              Your brand, needs a face and I’m here to do exactly that. With 
              specialized code and frameworks, I can deploy and make come to life 
              the face of your business and more.
            </span>
          </h4>  
        </div>
      </div>
      <div className='RO__services-card'>
        <div className='RO__services-card_content'>
          <h3 className='RO__services-card_content-title'>Business Analysis</h3>
          <h4 className='RO__services-card_content-subtitles'>
            <span className='RO__services-card_content-subtitles_word'>
              Take your company to the next level with specialize statistical 
              models, data analysis, and more. To better understand the state 
              of the company, as well as to solve business problems with ease.
            </span>
          </h4>  
        </div>
      </div>
    </div>
  );
}

export default Services