import React from 'react';
import './services.css';

const Services = () => {

  return (
    <div className='RO__services' id='services'>
      <div className='RO__services-title'>
        <h1>Servicios</h1>
      </div>

      {/* ------------------------Cards---------------------- */}
      <div className='RO__services-wrapper'>
        <div className='RO__services-card'>
          <div className='RO__services-card_content'>
            <h3 className='RO__services-card_content-title'>Análisis de Datos</h3>
            <h4 className='RO__services-card_content-subtitles'>
              <span className='RO__services-card_content-subtitles_word'>
                {/* Get more value with you data with prediction models and machine 
                learning techniques. Visualize and have a better understanding 
                of the data that you have. */}
                Obten más valor con tus datos con modelos de predicción y máquina
                de aprendizaje. Visualiza y tenen una mejor comprensión
                de los datos que tienes.
              </span>
            </h4>
          </div>
        </div>
      </div>
      <div className='RO__services-wrapper'>
        <div className='RO__services-card'>
          <div className='RO__services-card_content'>
            <h3 className='RO__services-card_content-title'>Desarrollo Web</h3>
            <h4 className='RO__services-card_content-subtitles'>
              <span className='RO__services-card_content-subtitles_word'>
                {/* Your brand, needs a face and I’m here to do exactly that. With 
                specialized code and frameworks, I can deploy and make come to life 
                the face of your business and more. */}
                Tu marca necesita una cara y estoy aquí para hacer exactamente eso. Con
                código y marcos especializados, puedo implementar y hacer que cobre vida
                la cara de tu negocio y más.
              </span>
            </h4>  
          </div>
        </div>
      </div>
      <div className='RO__services-wrapper'>
        <div className='RO__services-card'>
          <div className='RO__services-card_content'>
            <h3 className='RO__services-card_content-title'>Análisis de Negocio</h3>
            <h4 className='RO__services-card_content-subtitles'>
              <span className='RO__services-card_content-subtitles_word'>
                {/* Take your company to the next level with specialize statistical 
                models, data analysis, and more. To better understand the state 
                of the company, as well as to solve business problems with ease. */}
                Lleva a tu empresa al siguiente nivel con estadísticas especializadas
                modelos, análisis de datos y más. Para entender mejor el estado
                de la empresa, así como para resolver con facilidad los problemas de tu negocio.
              </span>
            </h4>  
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services