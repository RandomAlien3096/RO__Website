import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import './about.css';
import { NarrowTriangle } from '../../icons';

import CV from '../../assets/files/RafaelOliva_CV.pdf';

const about = () => {
  return (
    <div className='RO__about' id="about">
      <div className='RO__about-title'>
        <h1 id='about'><a href='/about'>{/*About Me */}Sobre Mi </a></h1>
      </div>
      <div className='RO__about-content'>
        <div className='RO__about-content_p'>
              <p>Mi nombre es Rafael. Soy Ingeniero Mecatronico 
              en la ciudad de Guatemala. Donde soy impulsado
              por estrategia, análisis de datos y óptimos
              resultados en mis proyectos.</p>

              <p>He pasado más de 4 años de experiencia
              como analista de datos y científico de datos
              buscando responder las preguntas de nadie
              ha preguntado todavía. Además, para poder expresar 
              los hallazgos en los datos, utilizo mis habilidades 
              como desarrollador front-end. Esto, para que tengamos 
              una mejor comprensión de lo que tenemos.</p>

              <p>Estoy aquí para ayudarte a desarrollar tu
              compañía para entender su pasado, presente
              y para dar una idea de cómo mejorar el desarrollo
              de su futuro. Asimismo, para obtener un
              mayor alcance a nuevos clientes con un 
              sitio web de alta calidad, hecho a la medida para tus
              necesidades. </p>
        </div>
      
      </div>
      <div className='RO__about-more'>
        <div className='RO__about-more_quote'>
          {/* <p>"Science can amuse and fascinate us all, 
            but it is engineering that changes the world."</p> */}
            <p>"La ciencia puede divertirnos y fascinarnos a todos,
            pero es la ingeniería la que cambia el mundo".</p>
        </div>
        <div className='RO__about-more_button'>
          <a href={CV} download='RafaelOliva_cv.pdf'>
            <button type='button' >Descargar CV</button>
          </a>
        </div>
      </div>

    </div>
  )
}

export default about