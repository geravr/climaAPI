import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';
import Spinner from './components/Spinner';

function App() {

  // State principal
  const [ ciudad, setCiudad ] = useState('');
  const [ pais, setPais ] = useState('');
  const [ error, setError ] = useState(false);
  const [ resultado, setResultado ] = useState({});
  const [ loader, setLoader] = useState(false);

  /* Usar función consultarAPI con useEffect
     useEffect está a la escucha de los cambios de mi state
     Cuando se produce un cambio en el objeto del state indicado, se ejecuta la función */
  useEffect( () => {

    //Prevenir ejecución por defecto
    if(ciudad === '') return;

    //Se crea la función
    const consultarAPI = async () => {

      const appID = 'bc5c9b7f83f5517d95debb9d0617b10c';
  
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`
  
      // consultar la API con Fetch
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setLoader(false);
  
      setResultado(resultado);
  
    }

    // Ejecutar la función
    setTimeout(() => {
      consultarAPI();
    }, 500);
  
    

  }, [ ciudad, pais, loader ])

  const datosConsulta = datos => {
    
    // Validar que ambos datos existan
    if(datos.ciudad === '' || datos.pais === '' ) {
      // un error
      setError(true);
      return;
    }

    //Ciudad y país existen, agregarlos al state
    setCiudad(datos.ciudad);
    setPais(datos.pais);
    setError(false);
  }



  // Cargar un componente condicionalmente
  let componente;
  if(error) {
    //Hay un error, mostrarlo
    componente = <Error mensaje='Ambos campos son obligatorios' />
  } else if (resultado.cod === "404") {
    componente = <Error mensaje=" La ciudad no existe" />

  } else if (loader === true) {
    componente = <Spinner />
  }else {
    //Mostrar el clima
    componente = <Clima resultado={resultado}/>;
  }

  return (
    <Fragment>
      <Header 
        titulo="Clima React App"
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario
                datosConsulta={datosConsulta}
                setLoader={setLoader}
              />
            </div>
            <div className="col 12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  );
}

export default App;
