import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import fault_severity from './01_TelstraNetworkDisruption/images/fault_severity.png';
import heatmap from './01_TelstraNetworkDisruption/images/heatmap.png';
import location from './01_TelstraNetworkDisruption/images/location_plot.png';
import finalPlot from './01_TelstraNetworkDisruption/images/final_location_plot.png';
import kaggle from './01_TelstraNetworkDisruption/images/Kaggle_Telstra_SC.png';

import { Navbar } from '../components';
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
    <div className='RO__Navbar'>
      <Navbar />
    </div>

    <div className='RO__ComingSoonP1'>
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
            plt.rcParams[<span className="dt">'figure.dpi'</span>]<span className='op'>=</span><span className="dv">300</span><br></br>
            <span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabIndex="-1"></a><span className="im">from</span> sklearn.model_selection <span className="im">import</span> train_test_split</span>
            <span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabIndex="-1"></a><span className="im">from</span> sklearn.preprocessing <span className="im">import</span> StandardScaler</span>
            <span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabIndex="-1"></a><span className="im">from</span> sklearn.ensemble <span className="im">import</span> RandomForestClassifier</span>
            <span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabIndex="-1"></a><span className="im">from</span> sklearn.preprocessing <span className="im">import</span> LabelEncoder</span>
            <span id="cb1-14"><a href="#cb1-14" aria-hidden="true" tabIndex="-1"></a><span className="im">from</span> sklearn <span className="im">import</span> metrics</span>
            <span id="cb1-15"><a href="#cb1-15" aria-hidden="true" tabIndex="-1"></a><span className="im">from</span> catboost <span className="im">import</span> CatBoostClassifier, Pool</span>
            <span id="cb1-16"><a href="#cb1-16" aria-hidden="true" tabIndex="-1"></a>sns.set_style(<span className="dt">&quot;whitegrid&quot;</span>)</span>
            <span id="cb1-17"><a href="#cb1-17" aria-hidden="true" tabIndex="-1"></a><span className="im">import</span> matplotlib.pyplot <span className="im">as</span> plt</span>
            <span id="cb1-18"><a href="#cb1-18" aria-hidden="true" tabIndex="-1"></a><span className="im">import</span> warnings</span>
            <span id="cb1-19"><a href="#cb1-19" aria-hidden="true" tabIndex="-1"></a>warnings.filterwarnings(<span className="dt">&#39;ignore&#39;</span>)
            </span>
        </code>
      </div>
      <div className='RO__TND-code'>
        <code>
          <span className="co">#------------------Cargando conjuto de datos------------------</span><br></br>
          datadir <span className="op">=</span> <span className="dt">&#39;data&#39;</span><br></br>
          <span id="cb2-3"><a href="#cb2-3" aria-hidden="true" tabIndex="-1"></a><span className="kw">def</span> str_to_num(string):</span><br></br>
          <span id="cb2-4"><a href="#cb2-4" aria-hidden="true" tabIndex="-1"></a>    <span className="cf">return</span> <span className="bu">int</span>(string.split(<span className="dt">&quot; &quot;</span>)[<span className="dv">1</span>])    <span className="co">#after the split returns the num on the string</span></span><br></br>
          <span id="cb2-5"><a href="#cb2-5" aria-hidden="true" tabIndex="-1"></a></span><br></br>
          <span id="cb2-6"><a href="#cb2-6" aria-hidden="true" tabIndex="-1"></a><span className="co">#loading test.csv file</span></span><br></br>
          <span id="cb2-7"><a href="#cb2-7" aria-hidden="true" tabIndex="-1"></a>test <span className="op">=</span> pd.read_csv(<span className="dt">&#39;test.csv&#39;</span>, </span><br></br>
          <span id="cb2-8"><a href="#cb2-8" aria-hidden="true" tabIndex="-1"></a>                   converters <span className="op">=</span> <span className="dt">(&#39;location&#39;)</span>:str_to_num)</span><br></br>
          <span id="cb2-9"><a href="#cb2-9" aria-hidden="true" tabIndex="-1"></a></span><br></br>
          <span id="cb2-10"><a href="#cb2-10" aria-hidden="true" tabIndex="-1"></a><span className="co">#loading train.csv file</span></span><br></br>
          <span id="cb2-11"><a href="#cb2-11" aria-hidden="true" tabIndex="-1"></a>train <span className="op">=</span> pd.read_csv(<span className="dt">&#39;train.csv&#39;</span>,</span><br></br>
          <span id="cb2-12"><a href="#cb2-12" aria-hidden="true" tabIndex="-1"></a>                   converters <span className="op">=</span> (<span className="dt">&#39;location&#39;</span>:str_to_num))</span><br></br>
          <span id="cb2-13"><a href="#cb2-13" aria-hidden="true" tabIndex="-1"></a></span><br></br>
          <span id="cb2-14"><a href="#cb2-14" aria-hidden="true" tabIndex="-1"></a><span className="co">#loading event_type.csv file</span></span><br></br>
          <span id="cb2-15"><a href="#cb2-15" aria-hidden="true" tabIndex="-1"></a>event_type <span className="op">=</span> pd.read_csv(<span className="dt">&#39;event_type.csv&#39;</span>, </span><br></br>
          <span id="cb2-16"><a href="#cb2-16" aria-hidden="true" tabIndex="-1"></a>                         converters <span className="op">=</span> (<span className="dt">&#39;event_type&#39;</span>:str_to_num))</span><br></br>
          <span id="cb2-17"><a href="#cb2-17" aria-hidden="true" tabIndex="-1"></a></span><br></br>
          <span id="cb2-18"><a href="#cb2-18" aria-hidden="true" tabIndex="-1"></a><span className="co">#loading log_feature.csv file</span></span><br></br>
          <span id="cb2-19"><a href="#cb2-19" aria-hidden="true" tabIndex="-1"></a>log_failure <span className="op">=</span> pd.read_csv(<span className="dt">&#39;log_feature.csv&#39;</span>, </span><br></br>
          <span id="cb2-20"><a href="#cb2-20" aria-hidden="true" tabIndex="-1"></a>                          converters <span className="op">=</span> (<span className="dt">&#39;log_feature&#39;</span>:str_to_num))</span><br></br>
          <span id="cb2-21"><a href="#cb2-21" aria-hidden="true" tabIndex="-1"></a></span><br></br>
          <span id="cb2-22"><a href="#cb2-22" aria-hidden="true" tabIndex="-1"></a><span className="co">#loading resource_type.csv file</span></span><br></br>
          <span id="cb2-23"><a href="#cb2-23" aria-hidden="true" tabIndex="-1"></a>resource_type <span className="op">=</span> pd.read_csv(<span className="dt">&#39;resource_type.csv&#39;</span>, </span><br></br>
          <span id="cb2-24"><a href="#cb2-24" aria-hidden="true" tabIndex="-1"></a>                            converters <span className="op">=</span> (<span className="dt">&#39;resource_type&#39;</span>:str_to_num))</span><br></br>
          <span id="cb2-25"><a href="#cb2-25" aria-hidden="true" tabIndex="-1"></a></span><br></br>
          <span id="cb2-26"><a href="#cb2-26" aria-hidden="true" tabIndex="-1"></a><span className="co">#loading severity_type.csv file</span></span><br></br>
          <span id="cb2-27"><a href="#cb2-27" aria-hidden="true" tabIndex="-1"></a>severity_type <span className="op">=</span> pd.read_csv(<span className="dt">&#39;severity_type.csv&#39;</span>, </span><br></br>
          <span id="cb2-28"><a href="#cb2-28" aria-hidden="true" tabIndex="-1"></a>                            index_col <span className="op">=</span> <span className="dt">&#39;id&#39;</span>,</span><br></br>
          <span id="cb2-29"><a href="#cb2-29" aria-hidden="true" tabIndex="-1"></a></span>                            converters <span className="op">=</span> (<span className="dt">&#39;severity_type&#39;</span>:str_to_num))  <br></br>
        </code>
      </div> 
      <div className='RO__TND-code'>
        <code>
          <span id="cb3-2"><a href="#cb3-2" aria-hidden="true" tabIndex="-1"></a><span className="bu">print</span>(<span className="dt">&quot;The size of the test data set is: </span><span className="sc">{}</span><span className="ch">\n</span><span className="dt">&quot;</span>.<span className="bu">format</span>(test.shape))</span><br></br>
          <span id="cb3-3"><a href="#cb3-3" aria-hidden="true" tabIndex="-1"></a><span className="bu">print</span>(<span className="dt">&quot;The size of the train data set is: </span><span className="sc">{}</span><span className="ch">\n</span><span className="dt">&quot;</span>.<span className="bu">format</span>(train.shape))</span><br></br>
          <span id="cb3-4"><a href="#cb3-4" aria-hidden="true" tabIndex="-1"></a><span className="bu">print</span>(<span className="dt">&quot;The size of the events data set is: </span><span className="sc">{}</span><span className="ch">\n</span><span className="dt">&quot;</span>.<span className="bu">format</span>(event_type.shape))</span><br></br>
          <span id="cb3-5"><a href="#cb3-5" aria-hidden="true" tabIndex="-1"></a><span className="bu">print</span>(<span className="dt">&quot;The size of the log feautures data set is: </span><span className="sc">{}</span><span className="ch">\n</span><span className="dt">&quot;</span>.<span className="bu">format</span>(log_failure.shape))</span><br></br>
          <span id="cb3-6"><a href="#cb3-6" aria-hidden="true" tabIndex="-1"></a><span className="bu">print</span>(<span className="dt">&quot;The size of the resource data set is: </span><span className="sc">{}</span><span className="ch">\n</span><span className="dt">&quot;</span>.<span className="bu">format</span>(resource_type.shape))</span><br></br>
          <span id="cb3-7"><a href="#cb3-7" aria-hidden="true" tabIndex="-1"></a><span className="bu">print</span>(<span className="dt">&quot;The size of the severity type data set is: </span><span className="sc">{}</span><span className="ch">\n</span><span className="dt">&quot;</span>.<span className="bu">format</span>(severity_type.shape))</span><br></br>
          <span id="cb3-8"><a href="#cb3-8" aria-hidden="true" tabIndex="-1"></a></span><br></br>
          <span id="cb3-9"><a href="#cb3-9" aria-hidden="true" tabIndex="-1"></a><span className="bu">print</span>(<span className="dt">&quot;Headers of train data set&quot;</span>)</span><br></br>
          <span id="cb3-10"><a href="#cb3-10" aria-hidden="true" tabIndex="-1"></a>train.head()</span><br></br>
        </code>
      </div>

      <div className='RO__TND-print'>
        <code>
          The size of the test data set is: (11171, 2)<br></br>
          
          The size of the train data set is: (7381, 3)<br></br>

          The size of the events data set is: (31170, 2)<br></br>

          The size of the log feautures data set is: (58671, 3)<br></br>

          The size of the resource data set is: (21076, 2)<br></br>

          The size of the severity type data set is: (18552, 1)<br></br>

          Headers of train data set<br></br>
        </code>
      </div>
        
      <div className='RO__TND-table'>
        <table border={1} className='dataframe'>
          <thead>
            <tr >
            <th></th>
            <th>id</th>
            <th>location</th>
            <th>fault_severity</th>
          </tr>
          </thead>
        <tbody>
        <tr>
          <th>0</th>
          <td>14121</td>
          <td>118</td>
          <td>1</td>
        </tr>
        <tr>
          <th>1</th>
          <td>9320</td>
          <td>91</td>
          <td>0</td>
        </tr>
        <tr>
          <th>2</th>
          <td>14394</td>
          <td>152</td>
          <td>1</td>
        </tr>
        <tr>
          <th>3</th>
          <td>8218</td>
          <td>931</td>
          <td>1</td>
        </tr>
        <tr>
          <th>4</th>
          <td>14804</td>
          <td>120</td>
          <td>0</td>
        </tr>
      </tbody>
      </table>
    </div>

    <div className='RO__TND-code'>
    <code>
    <span id="cb5-1"><a href="#cb5-1" aria-hidden="true" tabIndex="-1"></a><span className="co">#Revisando los headers del conjunto de datos de test</span></span><br></br>
    <span id="cb5-2"><a href="#cb5-2" aria-hidden="true" tabIndex="-1"></a><span className="bu">print</span>(<span className="dt">&quot;Headers of test data set&quot;</span>)</span><br></br>
    <span id="cb5-3"><a href="#cb5-3" aria-hidden="true" tabIndex="-1"></a>test.head()</span><br></br>
    </code>
    </div>
    
    <div className='RO__TND-print'>
      <code>
        Headers of test data set
      </code>
    </div>

    <div className='RO__TND-table'>
      <table border="1" className="dataframe">
        <thead>
          <tr>
            <th></th>
            <th>id</th>
            <th>location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>0</th>
            <td>11066</td>
            <td>481</td>
          </tr>
          <tr>
            <th>1</th>
            <td>18000</td>
            <td>962</td>
          </tr>
          <tr>
            <th>2</th>
            <td>16964</td>
            <td>491</td>
          </tr>
          <tr>
            <th>3</th>
            <td>4795</td>
            <td>532</td>
          </tr>
          <tr>
            <th>4</th>
            <td>3392</td>
            <td>600</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    
    <section>
    <p>Uniremos los conjuntos de datos a excepcion de test.csv para poder
    procesarlos en conjunto y tenerlos en una sola tabla.</p>
    </section>

    <div className='RO__TND-code'>
      <code>
        <span id="cb7-1"><a href="#cb7-1" aria-hidden="true" tabIndex="-1"></a>train_1 <span className="op">=</span> train.merge(severity_type, how <span className="op">=</span> <span className="dt">&#39;left&#39;</span>, left_on<span className="op">=</span><span className="dt">&#39;id&#39;</span>, right_on<span className="op">=</span><span className="dt">&#39;id&#39;</span>)</span><br></br>
        <span id="cb7-2"><a href="#cb7-2" aria-hidden="true" tabIndex="-1"></a>train_2 <span className="op">=</span> train_1.merge(resource_type, how <span className="op">=</span> <span className="dt">&#39;left&#39;</span>, left_on<span className="op">=</span><span className="dt">&#39;id&#39;</span>, right_on<span className="op">=</span><span className="dt">&#39;id&#39;</span>)</span><br></br>
        <span id="cb7-3"><a href="#cb7-3" aria-hidden="true" tabIndex="-1"></a>train_3 <span className="op">=</span> train_2.merge(log_failure, how <span className="op">=</span> <span className="dt">&#39;left&#39;</span>, left_on<span className="op">=</span><span className="dt">&#39;id&#39;</span>, right_on<span className="op">=</span><span className="dt">&#39;id&#39;</span>)</span><br></br>
        <span id="cb7-4"><a href="#cb7-4" aria-hidden="true" tabIndex="-1"></a>train_4 <span className="op">=</span> train_3.merge(event_type, how <span className="op">=</span> <span className="dt">&#39;left&#39;</span>, left_on<span className="op">=</span><span className="dt">&#39;id&#39;</span>, right_on<span className="op">=</span><span className="dt">&#39;id&#39;</span>)</span><br></br>
        <span id="cb7-5"><a href="#cb7-5" aria-hidden="true" tabIndex="-1"></a><span className="co">#checking the head after merging</span></span><br></br>
        <span id="cb7-6"><a href="#cb7-6" aria-hidden="true" tabIndex="-1"></a></span><br></br>
        <span id="cb7-7"><a href="#cb7-7" aria-hidden="true" tabIndex="-1"></a><span className="bu">print</span>(<span className="dt">&quot;The size of the train dataset is: </span><span className="sc">{}</span><span className="dt"> &quot;</span>.<span className="bu">format</span>(train_4.shape))</span><br></br>
        <span id="cb7-8"><a href="#cb7-8" aria-hidden="true" tabIndex="-1"></a></span><br></br>
        <span id="cb7-9"><a href="#cb7-9" aria-hidden="true" tabIndex="-1"></a><span className="bu">print</span>(<span className="dt">&quot;Deleting duplicates in data set...&quot;</span>)</span><br></br>
        <span id="cb7-10"><a href="#cb7-10" aria-hidden="true" tabIndex="-1"></a>train_4.drop_duplicates(subset<span className="op">=</span> <span className="dt">&#39;id&#39;</span>, keep<span className="op">=</span> <span className="dt">&#39;first&#39;</span>, inplace <span className="op">=</span> <span className="va">True</span>)</span><br></br>
        <span id="cb7-11"><a href="#cb7-11" aria-hidden="true" tabIndex="-1"></a></span><br></br>
        <span id="cb7-12"><a href="#cb7-12" aria-hidden="true" tabIndex="-1"></a><span className="co">#checking the shape of training file after dropping duplicate records</span></span><br></br>
        <span id="cb7-13"><a href="#cb7-13" aria-hidden="true" tabIndex="-1"></a><span className="bu">print</span>(<span className="dt">&quot;The size of the train dataset is now: </span><span className="sc">{}</span><span className="dt"> &quot;</span>.<span className="bu">format</span>(train_4.shape))</span><br></br>
        <span id="cb7-14"><a href="#cb7-14" aria-hidden="true" tabIndex="-1"></a>train_4.head()</span><br></br>
      </code>
    </div>
    
    <div className='RO__TND-print'>
      <code>
        The size of the train dataset is: (61839, 8) <br></br>
        Deleting duplicates in data set...<br></br>
        The size of the train dataset is now: (7381, 8) <br></br>
      </code>
    </div>

    <div className='RO__TND-table'>
      <table border="1" className="dataframe">
        <thead>
          <tr>
            <th></th>
            <th>id</th>
            <th>location</th>
            <th>fault_severity</th>
            <th>severity_type</th>
            <th>resource_type</th>
            <th>log_feature</th>
            <th>volume</th>
            <th>event_type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>0</th>
            <td>14121</td>
            <td>118</td>
            <td>1</td>
            <td>2</td>
            <td>2</td>
            <td>312</td>
            <td>19</td>
            <td>34</td>
          </tr>
          <tr>
            <th>4</th>
            <td>9320</td>
            <td>91</td>
            <td>0</td>
            <td>2</td>
            <td>2</td>
            <td>315</td>
            <td>200</td>
            <td>34</td>
          </tr>
          <tr>
            <th>8</th>
            <td>14394</td>
            <td>152</td>
            <td>1</td>
            <td>2</td>
            <td>2</td>
            <td>221</td>
            <td>1</td>
            <td>35</td>
          </tr>
          <tr>
            <th>12</th>
            <td>8218</td>
            <td>931</td>
            <td>1</td>
            <td>1</td>
            <td>8</td>
            <td>80</td>
            <td>9</td>
            <td>15</td>
          </tr>
          <tr>
            <th>18</th>
            <td>14804</td>
            <td>120</td>
            <td>0</td>
            <td>1</td>
            <td>2</td>
            <td>134</td>
            <td>1</td>
            <td>34</td>
          </tr>
        </tbody>
      </table>
    </div>

    <section>
      <p>Ahora que ya tenemos todos nuestros datos en un solo lugar, podemos
      iniciar visualizando nuestros datos para ver, tentativamente, las
      tendencias del comportamiento de los mismos.</p>
    </section>

    <div className='RO__TND-code'>
      <code>
        <span id="cb9-1"><a href="#cb9-1" aria-hidden="true" tabIndex="-1"></a><span className="co">#Ilustrando la cantidad de fallas en train dataset de cada tipo</span></span><br></br>
        <span id="cb9-2"><a href="#cb9-2" aria-hidden="true" tabIndex="-1"></a></span><br></br>
        <span id="cb9-3"><a href="#cb9-3" aria-hidden="true" tabIndex="-1"></a>plt.figure(figsize <span className="op">=</span> (<span className="dv">8</span>,<span className="dv">6</span>))</span><br></br>
        <span id="cb9-4"><a href="#cb9-4" aria-hidden="true" tabIndex="-1"></a>ax <span className="op">=</span> sns.countplot(train_4[<span className="dt">&#39;fault_severity&#39;</span>])</span><br></br>
        <span id="cb9-5"><a href="#cb9-5" aria-hidden="true" tabIndex="-1"></a><span className="cf">for</span> i <span className="kw">in</span> ax.patches:</span><br></br>
        <span id="cb9-6"><a href="#cb9-6" aria-hidden="true" tabIndex="-1"></a>    ax.annotate(<span className="dt">&#39;</span><span className="sc">(:.1f)</span><span className="dt">&#39;</span>.<span className="bu">format</span>(i.get_height()), (i.get_x()<span className="op">+</span> <span className="fl">0.25</span>, i.get_height() <span className="op">+</span> <span className="fl">0.1</span>))</span><br></br>
        <span id="cb9-7"><a href="#cb9-7" aria-hidden="true" tabIndex="-1"></a>plt.title(<span className="dt">&quot;Count of fault_severity&quot;</span>)</span><br></br>
        <span id="cb9-8"><a href="#cb9-8" aria-hidden="true" tabIndex="-1"></a>plt.show()</span><br></br>
      </code>
    </div>

    <div className='RO__TND-img'>
      <img src= { fault_severity } />
    </div>

    <section>
      <p>Este conjuto de datos, nos permite ver que, como lo esperado en la
      red de comunicacion de TELSTRA, la mayoria de localidades no tienen
      falla alguna. Pero si se tiene un numero alarmante de fallas y
      localidades que se tienen numerosas fallas.</p>
      <p>Ahorita utilizaremos una matriz de correlacion. Esto nos servira en
      poder visualizar y ver puntualmente, si existen relaciones y sobre que
      relaciones existen.</p>
    </section>

    <div className='RO__TND-code'>
      <code>
        <span id="cb10-1"><a href="#cb10-1" aria-hidden="true" tabindex="-1"></a><span class="co">#Plotting a heat map of the fault severity</span></span><br></br>
        <span id="cb10-2"><a href="#cb10-2" aria-hidden="true" tabindex="-1"></a>plt.figure(figsize <span class="op">=</span> (<span class="dv">12</span>,<span class="dv">12</span>))</span><br></br>
        <span id="cb10-3"><a href="#cb10-3" aria-hidden="true" tabindex="-1"></a>sns.<span class="bu">set</span>()</span><br></br>
        <span id="cb10-4"><a href="#cb10-4" aria-hidden="true" tabindex="-1"></a>sns.heatmap(train_4.corr(), </span><br></br>
        <span id="cb10-5"><a href="#cb10-5" aria-hidden="true" tabindex="-1"></a>            vmax <span class="op">=</span> <span class="fl">0.8</span>, </span><br></br>
        <span id="cb10-6"><a href="#cb10-6" aria-hidden="true" tabindex="-1"></a>            linewidths<span class="op">=</span> <span class="fl">0.01</span>, </span><br></br>
        <span id="cb10-7"><a href="#cb10-7" aria-hidden="true" tabindex="-1"></a>            square<span class="op">=</span> <span class="va">True</span>, annot<span class="op">=</span> <span class="va">True</span>, </span><br></br>
        <span id="cb10-8"><a href="#cb10-8" aria-hidden="true" tabindex="-1"></a>            cmap<span class="op">=</span> <span class="dt">&#39;viridis&#39;</span>, </span><br></br>
        <span id="cb10-9"><a href="#cb10-9" aria-hidden="true" tabindex="-1"></a>            linecolor<span class="op">=</span> <span class="dt">&#39;white&#39;</span>)</span><br></br>
        <span id="cb10-10"><a href="#cb10-10" aria-hidden="true" tabindex="-1"></a>plt.title(<span class="dt">&quot;Heatmap of Fault Serveity Data&quot;</span>)</span><br></br>
        <span id="cb10-11"><a href="#cb10-11" aria-hidden="true" tabindex="-1"></a>plt.show()</span><br></br>
      </code>
    </div>

    <div className='RO__TND-img'>
      <img src={ heatmap } />
    </div>

    <section>
      <p>En la grafica de calor (heatmap), podemos observar los indices de
      correlacion entre cada una de las variables. Donde 1 es que son
      directamente proporcionales; es decir, si uno incrementa, el otro igual
      incrementa. Y donde -1 es que las variables son inversamente
      proporcionales.</p>
      <p>Ahora bien, se denota a simple vista unas relaciones claves conforme
      a la ubicaion para nuestro analisis:</p>
      <ul style={{ listStyleType: 'disc' }}>
        <li>Location v fault_severity</li>
        <li>location v severity_type</li>
      </ul>
      <p>Ahora, despues de nuestra matriz de correlacion procederemos a
      investigar visualmente un poco mas sobre la relevancia que tiene la
      ubicacion sobre el tipo de fallas que se encuentran. Para ello,
      utilizaremos una grafica de dispersion para visualizar la ubicacion de
      cada falla respecto a la informacion que se tiene.</p>
    </section>

    <div className='RO__TND-code'>
      <code>
        <span id="cb11-1"><a href="#cb11-1" aria-hidden="true" tabindex="-1"></a><span class="co">#loading test.csv file</span></span><br></br>
        <span id="cb11-2"><a href="#cb11-2" aria-hidden="true" tabindex="-1"></a>test_plot <span class="op">=</span> pd.read_csv(<span class="dt">&#39;test.csv&#39;</span>, </span><br></br>
        <span id="cb11-3"><a href="#cb11-3" aria-hidden="true" tabindex="-1"></a>                        index_col <span class="op">=</span> <span class="dt">&#39;id&#39;</span>,</span><br></br>
        <span id="cb11-4"><a href="#cb11-4" aria-hidden="true" tabindex="-1"></a>                        converters <span class="op">=</span> (<span class="dt">&#39;location&#39;</span>:str_to_num))</span><br></br>
        <span id="cb11-5"><a href="#cb11-5" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb11-6"><a href="#cb11-6" aria-hidden="true" tabindex="-1"></a><span class="co">#loading train.csv file</span></span><br></br>
        <span id="cb11-7"><a href="#cb11-7" aria-hidden="true" tabindex="-1"></a>train_plot <span class="op">=</span> pd.read_csv(<span class="dt">&#39;train.csv&#39;</span>,</span><br></br>
        <span id="cb11-8"><a href="#cb11-8" aria-hidden="true" tabindex="-1"></a>                         index_col <span class="op">=</span> <span class="dt">&#39;id&#39;</span>,</span><br></br>
        <span id="cb11-9"><a href="#cb11-9" aria-hidden="true" tabindex="-1"></a>                         converters <span class="op">=</span> (<span class="dt">&#39;location&#39;</span>:str_to_num))</span><br></br>
        <span id="cb11-10"><a href="#cb11-10" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb11-11"><a href="#cb11-11" aria-hidden="true" tabindex="-1"></a>df <span class="op">=</span> train_plot.append(test_plot)</span><br></br>
      </code>
    </div>

    <div className='RO__TND-code'>
      <code>
        <span id="cb12-1"><a href="#cb12-1" aria-hidden="true" tabindex="-1"></a>fig, ax <span class="op">=</span> plt.subplots(figsize<span class="op">=</span>(<span class="dv">15</span>,<span class="dv">15</span>))</span><br></br>
        <span id="cb12-2"><a href="#cb12-2" aria-hidden="true" tabindex="-1"></a>plt.title(<span class="dt">&quot;Scatter plot Location v ID&quot;</span>)</span><br></br>
        <span id="cb12-3"><a href="#cb12-3" aria-hidden="true" tabindex="-1"></a>ax.scatter(df.loc[df.fault_severity.isnull(),<span class="dt">&#39;location&#39;</span>],</span><br></br>
        <span id="cb12-4"><a href="#cb12-4" aria-hidden="true" tabindex="-1"></a>           df.loc[df.fault_severity.isnull()].index, alpha<span class="op">=</span><span class="fl">0.5</span>, color<span class="op">=</span><span class="dt">&#39;k&#39;</span>, s<span class="op">=</span><span class="dv">2</span>)</span><br></br>
        <span id="cb12-5"><a href="#cb12-5" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb12-6"><a href="#cb12-6" aria-hidden="true" tabindex="-1"></a>ax.scatter(df.loc[df.fault_severity<span class="op">==</span><span class="dv">0</span>,<span class="dt">&#39;location&#39;</span>],</span><br></br>
        <span id="cb12-7"><a href="#cb12-7" aria-hidden="true" tabindex="-1"></a>           df.loc[df.fault_severity<span class="op">==</span><span class="dv">0</span>].index, alpha<span class="op">=</span><span class="fl">0.5</span>, color<span class="op">=</span><span class="dt">&#39;g&#39;</span>)</span><br></br>
        <span id="cb12-8"><a href="#cb12-8" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb12-9"><a href="#cb12-9" aria-hidden="true" tabindex="-1"></a>ax.scatter(df.loc[df.fault_severity<span class="op">==</span><span class="dv">1</span>,<span class="dt">&#39;location&#39;</span>],</span><br></br>
        <span id="cb12-10"><a href="#cb12-10" aria-hidden="true" tabindex="-1"></a>           df.loc[df.fault_severity<span class="op">==</span><span class="dv">1</span>].index, alpha<span class="op">=</span><span class="fl">0.5</span>, color<span class="op">=</span><span class="dt">&#39;y&#39;</span>)</span><br></br>
        <span id="cb12-11"><a href="#cb12-11" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb12-12"><a href="#cb12-12" aria-hidden="true" tabindex="-1"></a>ax.scatter(df.loc[df.fault_severity<span class="op">==</span><span class="dv">2</span>,<span class="dt">&#39;location&#39;</span>], </span><br></br>
        <span id="cb12-13"><a href="#cb12-13" aria-hidden="true" tabindex="-1"></a>           df.loc[df.fault_severity<span class="op">==</span><span class="dv">2</span>].index, alpha<span class="op">=</span><span class="fl">0.5</span>, color<span class="op">=</span><span class="dt">&#39;r&#39;</span>)</span><br></br>
        <span id="cb12-14"><a href="#cb12-14" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb12-15"><a href="#cb12-15" aria-hidden="true" tabindex="-1"></a>ax.set_xlim((<span class="op">-</span><span class="dv">20</span>,<span class="dv">1150</span>))</span><br></br>
        <span id="cb12-16"><a href="#cb12-16" aria-hidden="true" tabindex="-1"></a>ax.set_ylim((<span class="dv">0</span>,<span class="dv">19000</span>))</span><br></br>
        <span id="cb12-17"><a href="#cb12-17" aria-hidden="true" tabindex="-1"></a>ax.set_xlabel(<span class="dt">&#39;Location&#39;</span>)</span><br></br>
        <span id="cb12-18"><a href="#cb12-18" aria-hidden="true" tabindex="-1"></a>ax.set_ylabel(<span class="dt">&#39;ID&#39;</span>)<span class="op">;</span></span><br></br>
      </code>
    </div>
    
    <div className='RO__TND-img'>
      <img src={ location } />
    </div>

    <section>
      <p>Ya vista la grafica de dispersion, podemos notar una tendencia. Entre
      mayor sea el numero de la ubicacion, las fallas se hacen mas propensas y
      aumentan su severidad. Se puede asumir que, entre mayor sea el numero de
      la ubicacion, esta se encontra mas lejos. Y que por igual, que cada uno
      de las ubicaciones, dependiendo de su numero, se encuentran en orden y
      en cercania relativa al valor dado. A partir de ello, podemos plantear
      una hipotesis con nuestra matriz de correlacion; La severidad y cantidad
      de las fallas en la red de TELSTRA sera directamente proporcional a la
      ubicacion y distancia que estas tengan.</p><br></br>
    </section>

    <section>
      <h3>Modelado</h3>
      <hr />
      <p>Debido a la naturalidad categorica de nuestro complejo de datos, es
      necesario, ya sea, procesar profundamente nuestro set de datos o
      utilizar un algoritmo de machine learning capaz de poder procesar esta
      informacion. Dado esto, se propuso utilizar el algoritmo open-source
      llamado "CatBoost". El cual es un algoritmo bastante versatil y
      flexible. Donde tiene la capacidad de manejar una gran variedad de tipo
      de datos sin ningun problema proveyendo soluciones fuera de lo
      convencional para apoyar con los problemas dados comunmente en el
      analisis de negocios y big data.</p>
      <p>El objetivo ahora sera desplegar el algoritmo CatBoost de forma
      correcta. Para ello, nececitamos iniciar con el entrenamiento
      supervisado del complejo de datos ya procesado. Con ello utilizaremos el
      complejo de datos "train" donde utilizaremos el 75% de sus datos para
      entrenar al algoritmo y el 25% seran utilizados para validar el
      entrenamiento y simular a su vez como este se comportara si es dado un
      set de datos no antes vistos.</p>
    </section>

    <div className='RO__TND-code'>
      <code>
        <span id="cb13-1"><a href="#cb13-1" aria-hidden="true" tabindex="-1"></a><span class="co">#Splitting X(data in array) and y (index of data used)</span></span><br></br>
        <span id="cb13-2"><a href="#cb13-2" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb13-3"><a href="#cb13-3" aria-hidden="true" tabindex="-1"></a>X <span class="op">=</span> train_4[[<span class="dt">&#39;id&#39;</span>, <span class="dt">&#39;location&#39;</span>, <span class="dt">&#39;severity_type&#39;</span>, <span class="dt">&#39;resource_type&#39;</span>,</span><br></br>
        <span id="cb13-4"><a href="#cb13-4" aria-hidden="true" tabindex="-1"></a>       <span class="dt">&#39;log_feature&#39;</span>, <span class="dt">&#39;volume&#39;</span>, <span class="dt">&#39;event_type&#39;</span>]]</span><br></br>
        <span id="cb13-5"><a href="#cb13-5" aria-hidden="true" tabindex="-1"></a>y <span class="op">=</span> train_4.fault_severity</span><br></br>
        <span id="cb13-6"><a href="#cb13-6" aria-hidden="true" tabindex="-1"></a> </span><br></br>
        <span id="cb13-7"><a href="#cb13-7" aria-hidden="true" tabindex="-1"></a><span class="co">#divide the training set into train/validation set with 25% set aside for validation. </span></span><br></br>
        <span id="cb13-8"><a href="#cb13-8" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb13-9"><a href="#cb13-9" aria-hidden="true" tabindex="-1"></a><span class="im">from</span> sklearn.model_selection <span class="im">import</span> train_test_split</span><br></br>
        <span id="cb13-10"><a href="#cb13-10" aria-hidden="true" tabindex="-1"></a>X_train, X_test, y_train, y_test <span class="op">=</span> train_test_split(X, y, test_size<span class="op">=</span><span class="fl">0.25</span>, random_state<span class="op">=</span><span class="dv">101</span>)</span><br></br>
      </code>
    </div>

    <section>
      <p>Ahora, actualizaremos los parametros del algoritmo para poder hacer
      uso de la naturaleza categorica del mismo y utilizarlo en su mejor
      capacidad para mejores resultados.</p>
    </section>

    <div className='RO__TND-code'>
      <code>
        <span id="cb15-1"><a href="#cb15-1" aria-hidden="true" tabindex="-1"></a><span class="co">#using pool to make the training and validation sets</span></span><br></br>
        <span id="cb15-2"><a href="#cb15-2" aria-hidden="true" tabindex="-1"></a>train_dataset <span class="op">=</span> Pool(data<span class="op">=</span>X_train,</span><br></br>
        <span id="cb15-3"><a href="#cb15-3" aria-hidden="true" tabindex="-1"></a>                     label<span class="op">=</span>y_train,</span><br></br>
        <span id="cb15-4"><a href="#cb15-4" aria-hidden="true" tabindex="-1"></a>                     cat_features<span class="op">=</span>categorical_features_indices)</span><br></br>
        <span id="cb15-5"><a href="#cb15-5" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb15-6"><a href="#cb15-6" aria-hidden="true" tabindex="-1"></a>eval_dataset <span class="op">=</span> Pool(data<span class="op">=</span>X_test,</span><br></br>
        <span id="cb15-7"><a href="#cb15-7" aria-hidden="true" tabindex="-1"></a>                    label<span class="op">=</span>y_test,</span><br></br>
        <span id="cb15-8"><a href="#cb15-8" aria-hidden="true" tabindex="-1"></a>                    cat_features<span class="op">=</span>categorical_features_indices)</span><br></br>
        <span id="cb15-9"><a href="#cb15-9" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb15-10"><a href="#cb15-10" aria-hidden="true" tabindex="-1"></a><span class="co">#initialize the catboost classifier</span></span><br></br>
        <span id="cb15-11"><a href="#cb15-11" aria-hidden="true" tabindex="-1"></a>model <span class="op">=</span> CatBoostClassifier(iterations<span class="op">=</span><span class="dv">1000</span>,</span><br></br>
        <span id="cb15-12"><a href="#cb15-12" aria-hidden="true" tabindex="-1"></a>                           learning_rate<span class="op">=</span><span class="dv">1</span>,</span><br></br>
        <span id="cb15-13"><a href="#cb15-13" aria-hidden="true" tabindex="-1"></a>                           depth<span class="op">=</span><span class="dv">2</span>,</span><br></br>
        <span id="cb15-14"><a href="#cb15-14" aria-hidden="true" tabindex="-1"></a>                           loss_function<span class="op">=</span><span class="dt">&#39;MultiClass&#39;</span>,</span><br></br>
        <span id="cb15-15"><a href="#cb15-15" aria-hidden="true" tabindex="-1"></a>                           random_seed<span class="op">=</span><span class="dv">3</span>,</span><br></br>
        <span id="cb15-16"><a href="#cb15-16" aria-hidden="true" tabindex="-1"></a>                           bagging_temperature<span class="op">=</span><span class="dv">22</span>,</span><br></br>
        <span id="cb15-17"><a href="#cb15-17" aria-hidden="true" tabindex="-1"></a>                           od_type<span class="op">=</span><span class="dt">&#39;Iter&#39;</span>,</span><br></br>
        <span id="cb15-18"><a href="#cb15-18" aria-hidden="true" tabindex="-1"></a>                           metric_period<span class="op">=</span><span class="dv">50</span>,</span><br></br>
        <span id="cb15-19"><a href="#cb15-19" aria-hidden="true" tabindex="-1"></a>                           od_wait<span class="op">=</span><span class="dv">100</span>)</span><br></br>
        <span id="cb15-20"><a href="#cb15-20" aria-hidden="true" tabindex="-1"></a><span class="co">#Fit model</span></span><br></br>
        <span id="cb15-21"><a href="#cb15-21" aria-hidden="true" tabindex="-1"></a>model.fit(train_dataset, eval_set<span class="op">=</span> eval_dataset, plot<span class="op">=</span> <span class="va">True</span>)</span><br></br>
      </code>
    </div>

    <div className='RO__TND-print'>
      <code>
        Warning: Overfitting detector is active, thus evaluation metric is calculated on every iteration. &#39;metric_period&#39; is ignored for evaluation metric. <br></br>
        0:	learn: 0.8097011	test: 0.8232279	best: 0.8232279 (0)	total: 98.8ms	remaining: 1m 38s<br></br>
        50:	learn: 0.6891822	test: 0.7014301	best: 0.7011246 (48)	total: 164ms	remaining: 3.05s<br></br>
        100:	learn: 0.6651755	test: 0.6883462	best: 0.6883462 (100)	total: 224ms	remaining: 1.99s<br></br>
        150:	learn: 0.6478698	test: 0.6820732	best: 0.6796182 (146)	total: 282ms	remaining: 1.58s<br></br>
        200:	learn: 0.6357514	test: 0.6749089	best: 0.6735488 (193)	total: 340ms	remaining: 1.35s<br></br>
        250:	learn: 0.6246436	test: 0.6744368	best: 0.6735488 (193)	total: 402ms	remaining: 1.2s<br></br>
        300:	learn: 0.6168495	test: 0.6715840	best: 0.6712311 (299)	total: 465ms	remaining: 1.08s<br></br>
        350:	learn: 0.6057613	test: 0.6733312	best: 0.6697978 (332)	total: 525ms	remaining: 971ms<br></br>
        400:	learn: 0.5983205	test: 0.6720923	best: 0.6697978 (332)	total: 586ms	remaining: 875ms<br></br>
        Stopped by overfitting detector  (100 iterations wait)<br></br>
        <br></br>
        bestTest = 0.6697978062<br></br>
        bestIteration = 332<br></br>
        <br></br>
        Shrink model to first 333 iterations.<br></br>
        &lt;catboost.core.CatBoostClassifier at 0x2b7343dfd00&gt;<br></br>
      </code>
    </div>

    <section>
      <p>Incialmente, a nuestro modelo, se le indico que entrenara con 1000
      iteraciones. Pero luego de 400 iteraciones, como marca arriba, este tuvo
      overfitting. Por lo cual, recorto el modelo a solo 333 iteraciones.</p>
      <p>Ahora que tenemos nuestro modelo ya entrenado, utilizaremos la
      funcion predict() para poder predecir los valores con el conjunto de
      datos de validacion que en este caso, sera el 25% de valores de nuestro
      train.csv Mientras que nuestra funcion predict_proba() nos dara la
      probabilidad de cada uno de los puntos dados.</p>
    </section>

    <div className='RO__TND-code'>
      <code>
        <span id="cb20-1"><a href="#cb20-1" aria-hidden="true" tabindex="-1"></a><span class="co">#predicts the actual label or class over the evaluation data set (gives us the final choice)</span></span><br></br>
        <span id="cb20-2"><a href="#cb20-2" aria-hidden="true" tabindex="-1"></a>preds_class <span class="op">=</span> model.predict(eval_dataset) </span><br></br>
        <span id="cb20-3"><a href="#cb20-3" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb20-4"><a href="#cb20-4" aria-hidden="true" tabindex="-1"></a><span class="co">#get predicted probabilities for each class (gives us the probabilities of each choice option that it had)</span></span><br></br>
        <span id="cb20-5"><a href="#cb20-5" aria-hidden="true" tabindex="-1"></a>preds_proba <span class="op">=</span> model.predict_proba(eval_dataset)</span><br></br>
        <span id="cb20-6"><a href="#cb20-6" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(<span class="dt">&#39;Probabilities of each Label&#39;</span>)</span><br></br>
        <span id="cb20-7"><a href="#cb20-7" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(preds_proba)</span><br></br>
      </code>
    </div>

    <div className='RO__TND-print'>
      <code>
      Probabilities of each Label<br></br>
      [[6.34695909e-01 3.42714092e-01 2.25899984e-02]<br></br>
      [8.30100770e-01 1.42077653e-01 2.78215777e-02]<br></br>
      [4.01349383e-01 1.49938543e-01 4.48712074e-01]<br></br>
      ...<br></br>
      [3.20211371e-01 8.93100493e-02 5.90478580e-01]<br></br>
      [9.06275128e-01 9.34559188e-02 2.68953024e-04]<br></br>
      [3.85959137e-01 2.72217943e-01 3.41822920e-01]]<br></br>
      </code>
    </div>

    <section>
      <p>Ya que tenemos nuestro modelo entrenado y evaluado, es hora de
      implementar este a nuestro archivo test.cvs. Esto para poder predecir la
      severidad de las fallas dependiendo de la ubicacion. Crearemos nuestro
      conjunto de datos de test.csv</p>
    </section>

    <div className='RO__TND-code'>
      <code>
        <span id="cb22-1"><a href="#cb22-1" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(<span class="dt">&quot;The shape of the test data set without merging is: </span><span class="sc">{}</span><span class="dt">&quot;</span>.<span class="bu">format</span>(test.shape))</span><br></br>
        <span id="cb22-2"><a href="#cb22-2" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb22-3"><a href="#cb22-3" aria-hidden="true" tabindex="-1"></a>test_1 <span class="op">=</span> test.merge(severity_type, how <span class="op">=</span> <span class="dt">&#39;left&#39;</span>, left_on<span class="op">=</span><span class="dt">&#39;id&#39;</span>, right_on<span class="op">=</span><span class="dt">&#39;id&#39;</span>)</span><br></br>
        <span id="cb22-4"><a href="#cb22-4" aria-hidden="true" tabindex="-1"></a>test_2 <span class="op">=</span> test_1.merge(resource_type, how <span class="op">=</span> <span class="dt">&#39;left&#39;</span>, left_on<span class="op">=</span><span class="dt">&#39;id&#39;</span>, right_on<span class="op">=</span><span class="dt">&#39;id&#39;</span>)</span><br></br>
        <span id="cb22-5"><a href="#cb22-5" aria-hidden="true" tabindex="-1"></a>test_3 <span class="op">=</span> test_2.merge(log_failure, how <span class="op">=</span> <span class="dt">&#39;left&#39;</span>, left_on<span class="op">=</span><span class="dt">&#39;id&#39;</span>, right_on<span class="op">=</span><span class="dt">&#39;id&#39;</span>)</span><br></br>
        <span id="cb22-6"><a href="#cb22-6" aria-hidden="true" tabindex="-1"></a>test_4 <span class="op">=</span> test_3.merge(event_type, how <span class="op">=</span> <span class="dt">&#39;left&#39;</span>, left_on<span class="op">=</span><span class="dt">&#39;id&#39;</span>, right_on<span class="op">=</span><span class="dt">&#39;id&#39;</span>)</span><br></br>
        <span id="cb22-7"><a href="#cb22-7" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb22-8"><a href="#cb22-8" aria-hidden="true" tabindex="-1"></a><span class="co">#removing the duplicates.</span></span><br></br>
        <span id="cb22-9"><a href="#cb22-9" aria-hidden="true" tabindex="-1"></a>test_4.drop_duplicates(subset<span class="op">=</span> <span class="dt">&#39;id&#39;</span>, keep<span class="op">=</span> <span class="dt">&#39;first&#39;</span>, inplace <span class="op">=</span> <span class="va">True</span>)</span><br></br>
        <span id="cb22-10"><a href="#cb22-10" aria-hidden="true" tabindex="-1"></a> </span><br></br>
        <span id="cb22-11"><a href="#cb22-11" aria-hidden="true" tabindex="-1"></a><span class="co">#checking for any null values. </span></span><br></br>
        <span id="cb22-12"><a href="#cb22-12" aria-hidden="true" tabindex="-1"></a>test_4.isnull().<span class="bu">sum</span>()</span><br></br>
        <span id="cb22-13"><a href="#cb22-13" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb22-14"><a href="#cb22-14" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(<span class="dt">&quot;The shape of the merged test dataset is: </span><span class="sc">{}</span><span class="dt">&quot;</span>.<span class="bu">format</span>(test_4.shape))</span><br></br>
      </code>
    </div>

    <div className='RO__TND-print'>
      <code>
        The shape of the test data set without merging is: (11171, 2)<br></br>
        The shape of the merged test dataset is: (11171, 7)<br></br>
      </code>
    </div>

    <section>
      <p>Ahora utilizaremos el modelo en el nuevo conjunto de datos para poder
      predecir la severidad de fallas y en donde estas sucederan.</p>
    </section>

    <div className='RO__TND-code'>
      <code>
        <span id="cb24-1"><a href="#cb24-1" aria-hidden="true" tabindex="-1"></a>predict_class <span class="op">=</span> model.predict(test_4)</span><br></br>
        <span id="cb24-2"><a href="#cb24-2" aria-hidden="true" tabindex="-1"></a>prediction_class_df <span class="op">=</span> pd.DataFrame(predict_class, </span><br></br>
        <span id="cb24-3"><a href="#cb24-3" aria-hidden="true" tabindex="-1"></a>                                   columns <span class="op">=</span> [<span class="dt">&#39;fault_severity&#39;</span>])</span><br></br>
        <span id="cb24-4"><a href="#cb24-4" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb24-5"><a href="#cb24-5" aria-hidden="true" tabindex="-1"></a>prediction_catboost <span class="op">=</span> pd.concat([test[[<span class="dt">&#39;id&#39;</span>,<span class="dt">&#39;location&#39;</span>]], prediction_class_df],axis <span class="op">=</span> <span class="dv">1</span>)</span><br></br>
        <span id="cb24-6"><a href="#cb24-6" aria-hidden="true" tabindex="-1"></a>prediction_catboost.to_csv(<span class="dt">&#39;prediction.csv&#39;</span>, index <span class="op">=</span> <span class="va">False</span>, header <span class="op">=</span> <span class="va">True</span>)</span><br></br>
        <span id="cb24-7"><a href="#cb24-7" aria-hidden="true" tabindex="-1"></a>prediction_catboost.head(<span class="dv">15</span>)</span><br></br>
      </code>
    </div>

    <div className='RO__TND-table'>
      <table border="1" class="dataframe">
        <thead>
          <tr>
            <th></th>
            <th>id</th>
            <th>location</th>
            <th>fault_severity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>0</th>
            <td>11066</td>
            <td>481</td>
            <td>0</td>
          </tr>
          <tr>
            <th>1</th>
            <td>18000</td>
            <td>962</td>
            <td>2</td>
          </tr>
          <tr>
            <th>2</th>
            <td>16964</td>
            <td>491</td>
            <td>0</td>
          </tr>
          <tr>
            <th>3</th>
            <td>4795</td>
            <td>532</td>
            <td>0</td>
          </tr>
          <tr>
            <th>4</th>
            <td>3392</td>
            <td>600</td>
            <td>0</td>
          </tr>
          <tr>
            <th>5</th>
            <td>3795</td>
            <td>794</td>
            <td>0</td>
          </tr>
          <tr>
            <th>6</th>
            <td>2881</td>
            <td>375</td>
            <td>0</td>
          </tr>
          <tr>
            <th>7</th>
            <td>1903</td>
            <td>638</td>
            <td>0</td>
          </tr>
          <tr>
            <th>8</th>
            <td>5245</td>
            <td>690</td>
            <td>0</td>
          </tr>
          <tr>
            <th>9</th>
            <td>6726</td>
            <td>893</td>
            <td>0</td>
          </tr>
          <tr>
            <th>10</th>
            <td>1311</td>
            <td>418</td>
            <td>0</td>
          </tr>
          <tr>
            <th>11</th>
            <td>15795</td>
            <td>320</td>
            <td>0</td>
          </tr>
          <tr>
            <th>12</th>
            <td>4315</td>
            <td>1013</td>
            <td>0</td>
          </tr>
          <tr>
            <th>13</th>
            <td>3393</td>
            <td>931</td>
            <td>0</td>
          </tr>
          <tr>
            <th>14</th>
            <td>6764</td>
            <td>707</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className='RO__TND-code'>
      <code>
        <span id="cb25-1"><a href="#cb25-1" aria-hidden="true" tabindex="-1"></a>predict_test <span class="op">=</span> model.predict_proba(test_4) <span class="co">#using the trained catboost model to get the probabilities of the choices</span></span><br></br>
        <span id="cb25-2"><a href="#cb25-2" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(<span class="dt">&quot;The shape of the prediction test dataset is now: </span><span class="sc">{}</span><span class="dt">&quot;</span>.<span class="bu">format</span>(predict_test.shape))</span><br></br>
        <span id="cb25-3"><a href="#cb25-3" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb25-4"><a href="#cb25-4" aria-hidden="true" tabindex="-1"></a>pred_df <span class="op">=</span> pd.DataFrame(predict_test, </span><br></br>
        <span id="cb25-5"><a href="#cb25-5" aria-hidden="true" tabindex="-1"></a>                       columns <span class="op">=</span> [<span class="dt">&#39;predict_0&#39;</span>,<span class="dt">&#39;predict_1&#39;</span>, <span class="dt">&#39;predict_2&#39;</span>])</span><br></br>
        <span id="cb25-6"><a href="#cb25-6" aria-hidden="true" tabindex="-1"></a><span class="bu">print</span>(<span class="dt">&quot;The shape of the prediction data frame is now: </span><span class="sc">{}</span><span class="dt">&quot;</span>.<span class="bu">format</span>(pred_df.shape))</span><br></br>
        <span id="cb25-7"><a href="#cb25-7" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb25-8"><a href="#cb25-8" aria-hidden="true" tabindex="-1"></a>submission_cat <span class="op">=</span> pd.concat([test[[<span class="dt">&#39;id&#39;</span>]],pred_df],axis<span class="op">=</span><span class="dv">1</span>)</span><br></br>
        <span id="cb25-9"><a href="#cb25-9" aria-hidden="true" tabindex="-1"></a>submission_cat.to_csv(<span class="dt">&#39;sub_cat_1.csv&#39;</span>,index<span class="op">=</span><span class="va">False</span>,header<span class="op">=</span><span class="va">True</span>)</span><br></br>
        <span id="cb25-10"><a href="#cb25-10" aria-hidden="true" tabindex="-1"></a>submission_cat.head(<span class="dv">15</span>)</span><br></br>
      </code>
    </div>

    <div className='RO__TND-print'>
      <code>
        The shape of the prediction test dataset is now: (11171, 3)<br></br>
        The shape of the prediction data frame is now: (11171, 3)<br></br>
      </code>
    </div>

    <div className='RO__TND-table'>
      <table border="1" class="dataframe">
        <thead>
          <tr>
            <th></th>
            <th>id</th>
            <th>predict_0</th>
            <th>predict_1</th>
            <th>predict_2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>0</th>
            <td>11066</td>
            <td>0.994028</td>
            <td>0.004516</td>
            <td>0.001456</td>
          </tr>
          <tr>
            <th>1</th>
            <td>18000</td>
            <td>0.321017</td>
            <td>0.174778</td>
            <td>0.504204</td>
          </tr>
          <tr>
            <th>2</th>
            <td>16964</td>
            <td>0.986801</td>
            <td>0.010605</td>
            <td>0.002594</td>
          </tr>
          <tr>
            <th>3</th>
            <td>4795</td>
            <td>0.851619</td>
            <td>0.147910</td>
            <td>0.000471</td>
          </tr>
          <tr>
            <th>4</th>
            <td>3392</td>
            <td>0.632463</td>
            <td>0.145794</td>
            <td>0.221744</td>
          </tr>
          <tr>
            <th>5</th>
            <td>3795</td>
            <td>0.563807</td>
            <td>0.390033</td>
            <td>0.046161</td>
          </tr>
          <tr>
            <th>6</th>
            <td>2881</td>
            <td>0.797273</td>
            <td>0.202510</td>
            <td>0.000216</td>
          </tr>
          <tr>
            <th>7</th>
            <td>1903</td>
            <td>0.615593</td>
            <td>0.061395</td>
            <td>0.323012</td>
          </tr>
          <tr>
            <th>8</th>
            <td>5245</td>
            <td>0.737178</td>
            <td>0.238249</td>
            <td>0.024573</td>
          </tr>
          <tr>
            <th>9</th>
            <td>6726</td>
            <td>0.870761</td>
            <td>0.129025</td>
            <td>0.000214</td>
          </tr>
          <tr>
            <th>10</th>
            <td>1311</td>
            <td>0.556050</td>
            <td>0.443908</td>
            <td>0.000042</td>
          </tr>
          <tr>
            <th>11</th>
            <td>15795</td>
            <td>0.690187</td>
            <td>0.309802</td>
            <td>0.000011</td>
          </tr>
          <tr>
            <th>12</th>
            <td>4315</td>
            <td>0.763102</td>
            <td>0.171295</td>
            <td>0.065602</td>
          </tr>
          <tr>
            <th>13</th>
            <td>3393</td>
            <td>0.484671</td>
            <td>0.351055</td>
            <td>0.164274</td>
          </tr>
          <tr>
            <th>14</th>
            <td>6764</td>
            <td>0.615090</td>
            <td>0.383304</td>
            <td>0.001606</td>
          </tr>
        </tbody>
      </table>
    </div>

    <section>
      <h3>Evaluacion</h3>
      <hr />
      <p>Apartir del archivo creado se subio a kaggle para obtener una
      puntuacion para la evaluacion requerida solo para terminos de esta
      activad. En este caso el resultado con nuestro modelo con el algoritmo
      CatBoost fue el siguiente:</p>
    </section>

    <div className='RO__TND-img'>
      <img src={kaggle} />
    </div>

    <section>
      <p>Luego de esto podemos visualizar los resultados finales en la grafica
      de dispersion donde se puede apreciar los datos resultantes del archivo
      generado en csv.</p>
    </section>

    <div className='RO__TND-code'>
      <code>
        <span id="cb27-1"><a href="#cb27-1" aria-hidden="true" tabindex="-1"></a><span class="co">#loading test.csv file</span></span><br></br>
        <span id="cb27-2"><a href="#cb27-2" aria-hidden="true" tabindex="-1"></a>prediction_plot <span class="op">=</span> pd.read_csv(<span class="dt">&#39;prediction.csv&#39;</span>, </span><br></br>
        <span id="cb27-3"><a href="#cb27-3" aria-hidden="true" tabindex="-1"></a>                        index_col <span class="op">=</span> <span class="dt">&#39;id&#39;</span>)</span><br></br>
        <span id="cb27-4"><a href="#cb27-4" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb27-5"><a href="#cb27-5" aria-hidden="true" tabindex="-1"></a>fig, ax <span class="op">=</span> plt.subplots(figsize<span class="op">=</span>(<span class="dv">15</span>,<span class="dv">15</span>))</span><br></br>
        <span id="cb27-6"><a href="#cb27-6" aria-hidden="true" tabindex="-1"></a>plt.title(<span class="dt">&quot;Scatter plot Location v ID&quot;</span>)</span><br></br>
        <span id="cb27-7"><a href="#cb27-7" aria-hidden="true" tabindex="-1"></a>ax.scatter(prediction_catboost.loc [prediction_catboost.fault_severity .isnull(), <span class="dt">&#39;location&#39;</span>] ,</span><br></br>
        <span id="cb27-8"><a href="#cb27-8" aria-hidden="true" tabindex="-1"></a>           prediction_catboost.loc [prediction_catboost.fault_severity .isnull()].index, alpha<span class="op">=</span><span class="fl">0.5</span>, color<span class="op">=</span><span class="dt">&#39;k&#39;</span>, s<span class="op">=</span><span class="dv">2</span>)</span><br></br>
        <span id="cb27-9"><a href="#cb27-9" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb27-10"><a href="#cb27-10" aria-hidden="true" tabindex="-1"></a>ax.scatter(prediction_catboost.loc [prediction_catboost .fault_severity<span class="op">==</span><span class="dv">0</span>, <span class="dt">&#39;location&#39;</span>],</span><br></br>
        <span id="cb27-11"><a href="#cb27-11" aria-hidden="true" tabindex="-1"></a>           prediction_catboost.loc [prediction_catboost .fault_severity<span class="op">==</span><span class="dv">0</span>] .index, alpha<span class="op">=</span><span class="fl">0.5</span>, color<span class="op">=</span><span class="dt">&#39;g&#39;</span>)</span><br></br>
        <span id="cb27-12"><a href="#cb27-12" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb27-13"><a href="#cb27-13" aria-hidden="true" tabindex="-1"></a>ax.scatter(prediction_catboost.loc [prediction_catboost .fault_severity<span class="op">==</span><span class="dv">1</span>, <span class="dt">&#39;location&#39;</span>],</span><br></br>
        <span id="cb27-14"><a href="#cb27-14" aria-hidden="true" tabindex="-1"></a>           prediction_catboost.loc [prediction_catboost .fault_severity<span class="op">==</span><span class="dv">1</span>] .index, alpha<span class="op">=</span><span class="fl">0.5</span>, color<span class="op">=</span><span class="dt">&#39;y&#39;</span>)</span><br></br>
        <span id="cb27-15"><a href="#cb27-15" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb27-16"><a href="#cb27-16" aria-hidden="true" tabindex="-1"></a>ax.scatter(prediction_catboost.loc [prediction_catboost .fault_severity<span class="op">==</span><span class="dv">2</span>, <span class="dt">&#39;location&#39;</span>],</span><br></br>
        <span id="cb27-17"><a href="#cb27-17" aria-hidden="true" tabindex="-1"></a>           prediction_catboost.loc [prediction_catboost .fault_severity<span class="op">==</span><span class="dv">2</span>] .index, alpha<span class="op">=</span><span class="fl">0.5</span>, color<span class="op">=</span><span class="dt">&#39;r&#39;</span>)</span><br></br>
        <span id="cb27-18"><a href="#cb27-18" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb27-19"><a href="#cb27-19" aria-hidden="true" tabindex="-1"></a>ax.set_xlim((<span class="op">-</span><span class="dv">20</span>,<span class="dv">1150</span>))</span><br></br>
        <span id="cb27-20"><a href="#cb27-20" aria-hidden="true" tabindex="-1"></a>ax.set_ylim((<span class="dv">0</span>,<span class="dv">11500</span>))</span><br></br>
        <span id="cb27-21"><a href="#cb27-21" aria-hidden="true" tabindex="-1"></a>ax.set_xlabel(<span class="dt">&#39;Location&#39;</span>)</span><br></br>
        <span id="cb27-22"><a href="#cb27-22" aria-hidden="true" tabindex="-1"></a>ax.set_ylabel(<span class="dt">&#39;ID&#39;</span>)<span class="op">;</span></span><br></br>
      </code>
    </div>

    <div className='RO__TND-img'>
      <img src={finalPlot} />
    </div>

    <section>
      <h3>Despliegue</h3>
      <hr />
      <p>En esta fase, evaluaremos el peso, o mas bien, la importancia de cada
      una de las caracteristicas utilizadas para el entrenamiento de nuestro
      modelo. Ya que, esto nos permitira ver que mas se requiere para poder
      mejorar el modelo</p>
    </section>

    <div className='RO__TND-code'>
      <code>
        <span id="cb28-1"><a href="#cb28-1" aria-hidden="true" tabindex="-1"></a>model.get_feature_importance()</span>
      </code>
    </div>

    <div className='RO__TND-print'>
      <code>
      array([ 6.3250055 , 22.46957826, 11.11821714, 12.5966741 , 16.14897793,
       21.25928377, 10.08226331])
      </code>
    </div>

    <section>
      <p>Esta funcion nos da a conocer el porcentaje de relevancia de cada una
      de las caracteristicas utilizadas. Donde:</p>
      <ul style={{ listStyleType: 'disc' }}>
        <li>id = 6.32%</li>
        <li>location = 22.50%</li>
        <li>severity_type = 11.12%</li>
        <li>resource_type = 12.60%</li>
        <li>log_feature = 16.15%</li>
        <li>volume = 21.26%</li>
        <li>event_type = 10.08%</li>
      </ul>
    </section>

    <section>
      <p>Estos resultados nos dan a conocer dos cosas:</p>
      <ul style={{ listStyleType: 'disc' }}>
        <li><p>Primeramente, que la ubicacion si es el factor y la
        caracteristica mas relevante de este proyecto. Por lo cual, Telstra
        tendra que indagar e investigar sus nodos de conexiones fisicas. Para
        poder determinar si hay perdidas de paquetes en la transmision de
        informacion dada la decadencia en tramos largos de paquetes,
        caracteristicas climaticas en ciertas regiones de australia.</p></li>

        <li><p>Segundamente, los otros dos factores importantes del modelo
        fueron; volumen y en especifico, log_feature. Log_feature, y volume,
        existen en el mismo archivo, lo cual es un indicativo que van desde el
        inicio, relacionados. Por igual, el detalle de log_feature nos logra
        hacer entender que debe de exisitir algo mas haya que no logramos ver a
        simple vista en este modelo. Algo que tenga que ver con el historial del
        tiempo de cada uno de estos errores. Saber esto, nos podra permitir
        conocer como mejorar el modelo y por ende, tenga un entrenamiento mas
        duradero y de resultados mas precisos.</p></li>
      </ul>
    </section>

    </div>
    </>
  );
}

export default Project1