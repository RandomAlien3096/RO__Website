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
      <section id="telstra-network-disruption" class="cell markdown">
        <h1>Telstra Network Disruption</h1>
        <hr />
        <p>Ing. Rafael Oliva</p>
        <p>Guatemala, 27 de Octubre de 2022</p>
      </section>
      <section id="entendimiento-de-negocio" class="cell markdown">
        <h3>Entendimiento de Negocio</h3>
        <hr />
        <p>El objetivo de este problema es poder predecir en la red de TELSTRA
        la severidad de la falla en un momento dado en una ubicacion en
        particular con una "llave" (id key). Estas predicciones son basadas en
        los datos disponibles en nuestros archivos.</p>
        <p>En esta situacion, se categorizo la severidad de las fallas en tres
        categorias;</p>
        <ul>
          <li>0 (No hay falla)</li>
          <li>1 (Pocas fallas)</li>
          <li>2 (Multiples fallas)</li>
        </ul>
        <p>Asi que, dado el problema proporsionado por TELSTRA, debemos de
        plantearnos las siguientes preguntas:</p>
        <ul>
          <li>La severidad de las fallas atravez de la red, estan directamente
          relacionadas con la ubicacion?</li>
          <li>Se podra predecir la ubicacion de la falla dada la base de datos
          proporcionada?</li>
          <li>Como podemos medir nuestro valor de exito dentro del proyecto?</li>
        </ul>
      </section>
      <section 
        id="entendimiento-de-datos-y-procesamiento-de-datos" 
        class="cell markdown">

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
      <div class="cell code" data-execution_count="1">
        <div class="sourceCode" id="cb1">
          <pre class="sourceCode python">
            <code class="sourceCode python">
              <span id="cb1-1">
                <a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>
                <span class="op">%</span>
                matplotlib inline
              </span>
              <span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a><span class="co">#Seccion de importacion de librerias utilizadas en el transcurso del proyecto</span></span>
              <span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a><span class="im">import</span> numpy <span class="im">as</span> np</span>
              <span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a><span class="im">import</span> pandas <span class="im">as</span> pd</span>
              <span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a><span class="im">import</span> os</span>
              <span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a><span class="im">import</span> seaborn <span class="im">as</span> sns</span>
              <span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a></span>
              <span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a><span class="im">import</span> matplotlib.pyplot <span class="im">as</span> plt</span>
              <span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>plt.rcParams[<span class="st">&#39;figure.dpi&#39;</span>]<span class="op">=</span> <span class="dv">300</span></span>
              <span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a><span class="im">from</span> sklearn.model_selection <span class="im">import</span> train_test_split</span>
              <span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a><span class="im">from</span> sklearn.preprocessing <span class="im">import</span> StandardScaler</span>
              <span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a><span class="im">from</span> sklearn.ensemble <span class="im">import</span> RandomForestClassifier</span>
              <span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a><span class="im">from</span> sklearn.preprocessing <span class="im">import</span> LabelEncoder</span>
              <span id="cb1-14"><a href="#cb1-14" aria-hidden="true" tabindex="-1"></a><span class="im">from</span> sklearn <span class="im">import</span> metrics</span>
              <span id="cb1-15"><a href="#cb1-15" aria-hidden="true" tabindex="-1"></a><span class="im">from</span> catboost <span class="im">import</span> CatBoostClassifier, Pool</span>
              <span id="cb1-16"><a href="#cb1-16" aria-hidden="true" tabindex="-1"></a>sns.set_style(<span class="st">&quot;whitegrid&quot;</span>)</span>
              <span id="cb1-17"><a href="#cb1-17" aria-hidden="true" tabindex="-1"></a><span class="im">import</span> matplotlib.pyplot <span class="im">as</span> plt</span>
              <span id="cb1-18"><a href="#cb1-18" aria-hidden="true" tabindex="-1"></a><span class="im">import</span> warnings</span>
            <span id="cb1-19"><a href="#cb1-19" aria-hidden="true" tabindex="-1"></a>warnings.filterwarnings(<span class="st">&#39;ignore&#39;</span>)</span></code></pre>
        </div>
      </div>
      <div class="cell code" data-execution_count="2">
        <div class="sourceCode" id="cb2"><pre
        class="sourceCode python"><code class="sourceCode python"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a><span class="co">#------------------Cargando conjuto de datos------------------</span></span>
          <span id="cb2-2"><a href="#cb2-2" aria-hidden="true" tabindex="-1"></a>datadir <span class="op">=</span> <span class="st">&#39;data&#39;</span></span>
          <span id="cb2-3"><a href="#cb2-3" aria-hidden="true" tabindex="-1"></a><span class="kw">def</span> str_to_num(string):</span>
          <span id="cb2-4"><a href="#cb2-4" aria-hidden="true" tabindex="-1"></a>    <span class="cf">return</span> <span class="bu">int</span>(string.split(<span class="st">&quot; &quot;</span>)[<span class="dv">1</span>])    <span class="co">#after the split returns the num on the string</span></span>
          <span id="cb2-5"><a href="#cb2-5" aria-hidden="true" tabindex="-1"></a></span>
          <span id="cb2-6"><a href="#cb2-6" aria-hidden="true" tabindex="-1"></a><span class="co">#loading test.csv file</span></span>
          <span id="cb2-7"><a href="#cb2-7" aria-hidden="true" tabindex="-1"></a>test <span class="op">=</span> pd.read_csv(<span class="st">&#39;test.csv&#39;</span>, </span>
          <span id="cb2-8"><a href="#cb2-8" aria-hidden="true" tabindex="-1"></a>                   converters <span class="op">=</span> (<span class="st">&#39;location&#39;</span>:str_to_num))</span>
          <span id="cb2-9"><a href="#cb2-9" aria-hidden="true" tabindex="-1"></a></span>
          <span id="cb2-10"><a href="#cb2-10" aria-hidden="true" tabindex="-1"></a><span class="co">#loading train.csv file</span></span>
          <span id="cb2-11"><a href="#cb2-11" aria-hidden="true" tabindex="-1"></a>train <span class="op">=</span> pd.read_csv(<span class="st">&#39;train.csv&#39;</span>,</span>
          <span id="cb2-12"><a href="#cb2-12" aria-hidden="true" tabindex="-1"></a>                   converters <span class="op">=</span> (<span class="st">&#39;location&#39;</span>:str_to_num))</span>
          <span id="cb2-13"><a href="#cb2-13" aria-hidden="true" tabindex="-1"></a></span>
          <span id="cb2-14"><a href="#cb2-14" aria-hidden="true" tabindex="-1"></a><span class="co">#loading event_type.csv file</span></span>
          <span id="cb2-15"><a href="#cb2-15" aria-hidden="true" tabindex="-1"></a>event_type <span class="op">=</span> pd.read_csv(<span class="st">&#39;event_type.csv&#39;</span>, </span>
          <span id="cb2-16"><a href="#cb2-16" aria-hidden="true" tabindex="-1"></a>                         converters <span class="op">=</span> (<span class="st">&#39;event_type&#39;</span>:str_to_num))</span>
          <span id="cb2-17"><a href="#cb2-17" aria-hidden="true" tabindex="-1"></a></span>
          <span id="cb2-18"><a href="#cb2-18" aria-hidden="true" tabindex="-1"></a><span class="co">#loading log_feature.csv file</span></span>
          <span id="cb2-19"><a href="#cb2-19" aria-hidden="true" tabindex="-1"></a>log_failure <span class="op">=</span> pd.read_csv(<span class="st">&#39;log_feature.csv&#39;</span>, </span>
          <span id="cb2-20"><a href="#cb2-20" aria-hidden="true" tabindex="-1"></a>                          converters <span class="op">=</span> (<span class="st">&#39;log_feature&#39;</span>:str_to_num))</span>
          <span id="cb2-21"><a href="#cb2-21" aria-hidden="true" tabindex="-1"></a></span>
          <span id="cb2-22"><a href="#cb2-22" aria-hidden="true" tabindex="-1"></a><span class="co">#loading resource_type.csv file</span></span>
          <span id="cb2-23"><a href="#cb2-23" aria-hidden="true" tabindex="-1"></a>resource_type <span class="op">=</span> pd.read_csv(<span class="st">&#39;resource_type.csv&#39;</span>, </span>
          <span id="cb2-24"><a href="#cb2-24" aria-hidden="true" tabindex="-1"></a>                            converters <span class="op">=</span> (<span class="st">&#39;resource_type&#39;</span>:str_to_num))</span>
          <span id="cb2-25"><a href="#cb2-25" aria-hidden="true" tabindex="-1"></a></span>
          <span id="cb2-26"><a href="#cb2-26" aria-hidden="true" tabindex="-1"></a><span class="co">#loading severity_type.csv file</span></span>
          <span id="cb2-27"><a href="#cb2-27" aria-hidden="true" tabindex="-1"></a>severity_type <span class="op">=</span> pd.read_csv(<span class="st">&#39;severity_type.csv&#39;</span>, </span>
          <span id="cb2-28"><a href="#cb2-28" aria-hidden="true" tabindex="-1"></a>                            index_col <span class="op">=</span> <span class="st">&#39;id&#39;</span>,</span>
          <span id="cb2-29"><a href="#cb2-29" aria-hidden="true" tabindex="-1"></a>                            converters <span class="op">=</span> (<span class="st">&#39;severity_type&#39;</span>:str_to_num))</span></code></pre></div>
        </div>
    </div>
    </>
  );
}

export default Project1