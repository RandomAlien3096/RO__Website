import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import fault_severity from './01_TelstraNetworkDisruption/images/fault_severity.png';
import heatmap from './01_TelstraNetworkDisruption/images/heatmap.png';


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
        <span id="cb12-2"><a href="#cb12-2" aria-hidden="true" tabindex="-1"></a>plt.title(<span class="st">&quot;Scatter plot Location v ID&quot;</span>)</span><br></br>
        <span id="cb12-3"><a href="#cb12-3" aria-hidden="true" tabindex="-1"></a>ax.scatter(df.loc[df.fault_severity.isnull(),<span class="st">&#39;location&#39;</span>],</span><br></br>
        <span id="cb12-4"><a href="#cb12-4" aria-hidden="true" tabindex="-1"></a>           df.loc[df.fault_severity.isnull()].index, alpha<span class="op">=</span><span class="fl">0.5</span>, color<span class="op">=</span><span class="st">&#39;k&#39;</span>, s<span class="op">=</span><span class="dv">2</span>)</span><br></br>
        <span id="cb12-5"><a href="#cb12-5" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb12-6"><a href="#cb12-6" aria-hidden="true" tabindex="-1"></a>ax.scatter(df.loc[df.fault_severity<span class="op">==</span><span class="dv">0</span>,<span class="st">&#39;location&#39;</span>],</span><br></br>
        <span id="cb12-7"><a href="#cb12-7" aria-hidden="true" tabindex="-1"></a>           df.loc[df.fault_severity<span class="op">==</span><span class="dv">0</span>].index, alpha<span class="op">=</span><span class="fl">0.5</span>, color<span class="op">=</span><span class="st">&#39;g&#39;</span>)</span><br></br>
        <span id="cb12-8"><a href="#cb12-8" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb12-9"><a href="#cb12-9" aria-hidden="true" tabindex="-1"></a>ax.scatter(df.loc[df.fault_severity<span class="op">==</span><span class="dv">1</span>,<span class="st">&#39;location&#39;</span>],</span><br></br>
        <span id="cb12-10"><a href="#cb12-10" aria-hidden="true" tabindex="-1"></a>           df.loc[df.fault_severity<span class="op">==</span><span class="dv">1</span>].index, alpha<span class="op">=</span><span class="fl">0.5</span>, color<span class="op">=</span><span class="st">&#39;y&#39;</span>)</span><br></br>
        <span id="cb12-11"><a href="#cb12-11" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb12-12"><a href="#cb12-12" aria-hidden="true" tabindex="-1"></a>ax.scatter(df.loc[df.fault_severity<span class="op">==</span><span class="dv">2</span>,<span class="st">&#39;location&#39;</span>], </span><br></br>
        <span id="cb12-13"><a href="#cb12-13" aria-hidden="true" tabindex="-1"></a>           df.loc[df.fault_severity<span class="op">==</span><span class="dv">2</span>].index, alpha<span class="op">=</span><span class="fl">0.5</span>, color<span class="op">=</span><span class="st">&#39;r&#39;</span>)</span><br></br>
        <span id="cb12-14"><a href="#cb12-14" aria-hidden="true" tabindex="-1"></a></span><br></br>
        <span id="cb12-15"><a href="#cb12-15" aria-hidden="true" tabindex="-1"></a>ax.set_xlim((<span class="op">-</span><span class="dv">20</span>,<span class="dv">1150</span>))</span><br></br>
        <span id="cb12-16"><a href="#cb12-16" aria-hidden="true" tabindex="-1"></a>ax.set_ylim((<span class="dv">0</span>,<span class="dv">19000</span>))</span><br></br>
        <span id="cb12-17"><a href="#cb12-17" aria-hidden="true" tabindex="-1"></a>ax.set_xlabel(<span class="st">&#39;Location&#39;</span>)</span><br></br>
        <span id="cb12-18"><a href="#cb12-18" aria-hidden="true" tabindex="-1"></a>ax.set_ylabel(<span class="st">&#39;ID&#39;</span>)<span class="op">;</span></span><br></br>
      </code>
    </div>
    
    </div>
    </>
  );
}

export default Project1