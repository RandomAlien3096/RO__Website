import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';


import './project1.css';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;


const Project1 = () => {
  const deadline = new Date('February, 16, 2023').toString();

  const parsedDeadline = useMemo(() => Date.parse(deadline), [deadline]);
  const [time, setTime] = useState(parsedDeadline - Date.now());

  useEffect(() => {
      const interval = setInterval(
          () => setTime(parsedDeadline - Date.now()),
          1000,
      );

      return () => clearInterval(interval);
  }, []);
 
  return (
    <>
    <div className='RO__ComingSoon'>
      <div className='RO__ComingSoon-content'>
        <p>Page is under construction</p>
        <h1>Launching Soon this Project</h1>
      </div>
      <div className='RO__ComingSoon-timer'>
            {Object.entries({
                Days: time / DAY,
                Hours: (time / HOUR) % 24,
                Minutes: (time / MINUTE) % 60,
                Seconds: (time / SECOND) % 60,
            }).map(([label, value]) => (
                <div key={label} className="col-4">
                    <div className="RO__ComingSoon-timer_box">
                        <p>{`${Math.floor(value)}`.padStart(2, "0")}</p>
                        <span className="text">{label}</span>
                    </div>
                </div>
            ))}
      </div>
      <div className='RO__ComingSoon-button'>
        <Link to='/'>
          <button type='button'>Back to Landing Page</button>
        </Link>
      </div>
    </div>

    {/* ------------------------------------------------------------------- */}


    <div className='RO__TND'>
      <section id="telstra-network-disruption" className="cell markdown">
        <h1>Telstra Network Disruption</h1>
        <hr />
        <p>Ing. Rafael Oliva</p>
        <p>Guatemala, 27 de Octubre de 2022</p>
      </section>
      <section id="entendimiento-de-negocio" className="cell markdown">
        <h3>Entendimiento de Negocio</h3>
        <hr />
        <p>El objetivo de este problema es poder predecir en la red de TELSTRA
        la severidad de la falla en un momento dado en una ubicacion en
        particular con una "llave" (id key). Estas predicciones son basadas en
        los datos disponibles en nuestros archivos.</p>
        <p>En esta situacion, se categorizo la severidad de las fallas en tres
        categorias;</p>
        
        <ul style={{ listStyleType: 'disc' }}>
          <li>0 (No hay falla)</li>
          <li>1 (Pocas fallas)</li>
          <li>2 (Multiples fallas)</li>
        </ul>
        
        <p>Asi que, dado el problema proporsionado por TELSTRA, debemos de
        plantearnos las siguientes preguntas:</p>
        <ul style={{ listStyleType: 'disc' }}>
          <li>La severidad de las fallas atravez de la red, estan directamente
          relacionadas con la ubicacion?</li>
          <li>Se podra predecir la ubicacion de la falla dada la base de datos
          proporcionada?</li>
          <li>Como podemos medir nuestro valor de exito dentro del proyecto?</li>
        </ul>
        <br></br>
      </section>
      <section 
        id="entendimiento-de-datos-y-procesamiento-de-datos" 
        className="cell markdown">

        <h3>Entendimiento de Datos y Procesamiento de Datos</h3>
        <hr />
        <p>El conjunto de datos fue creado a partir de 6 reportes de tipos de
        fallas severidad de fallas y mas. Estos reportes representan el
        historial mas reciente de fallas y la ubicacion de las mismas alrededor
        de la red de comunicacion de la empresa Telstra. Para poder avanzar en
        la creacion de modelos de prediccion primero se debe determinar que
        caracteristicas son las mas relevantes en todo este conjuto de
        informacion proporcionada. Para ello realizaremos una analisis
        exploratorio de datos inicial. Esto es para tener un inicio para el
        plantamiento de la hipotesis inicial.</p>
        <p>Ahora preprocesaremos los datos donde lograremos tener una mejor idea
        de la calidad de datos que se tiene y el tipo de datos con que se
        trabajara</p>
      </section>
      
      <div className='RO__TND-code'>
        <code>
        <span className='ss'>%</span><span className='im'>matplotlib</span> inline<br></br>
        <span className='co'>#Seccion de importacion de librerias utilizadas en el transcurso del proyecto</span><br></br>
          <span className='im'>import</span> numpy <span className='im'>as</span> np<br></br>
          <span className='im'>import</span> pandas <span className='im'>as</span> pd<br></br>
          <span className='im'>import</span> os<br></br>
          <span className='im'>import</span> seaborn <span className='im'>as</span> sns<br></br>
          <span className='im'>import</span> matplotlib.pyplot <span className='im'>as</span> plt<br></br>
          plt.rcParams[<span class="dt">'figure.dpi'</span>]<span className='op'>=</span><span class="dv">300</span><br></br>
          <span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a><span class="im">from</span> sklearn.model_selection <span class="im">import</span> train_test_split</span>
          <span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a><span class="im">from</span> sklearn.preprocessing <span class="im">import</span> StandardScaler</span>
          <span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a><span class="im">from</span> sklearn.ensemble <span class="im">import</span> RandomForestClassifier</span>
          <span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a><span class="im">from</span> sklearn.preprocessing <span class="im">import</span> LabelEncoder</span>
          <span id="cb1-14"><a href="#cb1-14" aria-hidden="true" tabindex="-1"></a><span class="im">from</span> sklearn <span class="im">import</span> metrics</span>
          <span id="cb1-15"><a href="#cb1-15" aria-hidden="true" tabindex="-1"></a><span class="im">from</span> catboost <span class="im">import</span> CatBoostClassifier, Pool</span>
          <span id="cb1-16"><a href="#cb1-16" aria-hidden="true" tabindex="-1"></a>sns.set_style(<span class="dt">&quot;whitegrid&quot;</span>)</span>
          <span id="cb1-17"><a href="#cb1-17" aria-hidden="true" tabindex="-1"></a><span class="im">import</span> matplotlib.pyplot <span class="im">as</span> plt</span>
          <span id="cb1-18"><a href="#cb1-18" aria-hidden="true" tabindex="-1"></a><span class="im">import</span> warnings</span>
          <span id="cb1-19"><a href="#cb1-19" aria-hidden="true" tabindex="-1"></a>warnings.filterwarnings(<span class="dt">&#39;ignore&#39;</span>)
          </span>
        
        </code>
      </div>
        

    </div>
    </>
  );
}

export default Project1