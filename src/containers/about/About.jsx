import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import './about.css';
// import t_four from '../../assets/triangles/4-t.png';
// import t_two from '../../assets/triangles/2-t.png';
// import t_three from '../../assets/triangles/3-t.png';
// import astronaut from '../../assets/astronaut.png';

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
          {/* <p>My name is Rafael. I am a Mechatronics 
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
              needs. </p> */}
              <p>Mi nombre es Rafael. Soy Ingeniero Mecatronico 
              en la ciudad de Guatemala. Donde soy impulsado
              por estrategia, análisis de datos y óptimos
              resultados en mis proyectos.</p>

              <p>He pasado más de 3 años de experiencia
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
        <div className='RO__about-content_icons'>
          <Parallax className='RO__about-content_icons-wrapper' 
            translateY={[-70, 60]}
            rotateY={[0,360]}>
            <NarrowTriangle className='RO__about-content_icons-triangle' />
            <div className='RO__about-content_icons-roundrect'></div>
          </Parallax>

          <Parallax className='RO__about-content_icons-wrapper'
            speed={20}
            rotateY={[0,360]}>
            <NarrowTriangle className='RO__about-content_icons-triangle' />
            <div className='RO__about-content_icons-roundrect'></div>
          </Parallax>

          <Parallax className='RO__about-content_icons-wrapper'
            translateY={[-80, 80]}
            rotateY={[0,360]}>
            <NarrowTriangle className='RO__about-content_icons-triangle' />
            <div className='RO__about-content_icons-roundrect'></div>
          </Parallax>

          <Parallax className='RO__about-content_icons-wrapper'
            rotateY={[0,360]}
            speed={15}>
            <NarrowTriangle className='RO__about-content_icons-triangle' />
            <div className='RO__about-content_icons-roundrect'></div>
          </Parallax>

        </div>
        {/* ----------------ASTRONAUT NOT IN USE ANYMORE-----------
        
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
        </div> */}
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