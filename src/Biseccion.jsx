// src/components/Biseccion.js

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import functionPlot from 'function-plot';
import Calculator from './Calculator';
import './Biseccion.css'; // Asegúrate de crear este archivo CSS

function Biseccion() {
  const [error, setError] = useState([]);
  const [raiz, setRaiz] = useState(0);
  const [problema, setProblema] = useState(0);
  const [Fn, setFn] = useState('');
  const [shouldGraph, setShouldGraph] = useState(false);

  const grafRef = useRef(null);

  const fetchAPI = async (funcion, a, b) => {
    try {
      const response = await axios.post('http://localhost:5000/biseccion', {
        funcion: funcion,
        a: parseFloat(a),
        b: parseFloat(b),
        tol: 0.0001
      });
      if (response.data.raiz !== undefined) {
        setError(response.data.errores);
        setRaiz(response.data.raiz);
        setProblema(0);
      } else {
        setRaiz(response.data.error);
        setProblema(1);
      }
    } catch (e) {
      console.error('Error fetching API:', e);
    }
  };

  const handleForSubmit = (event) => {
    event.preventDefault();
    const funcion = event.target.funcion.value;
    const a = event.target.a.value;
    const b = event.target.b.value;
    fetchAPI(funcion, a, b);
    setFn(funcion);
    setShouldGraph(true);
  };

  const clearFunction = () => {
    setFn('');
    setShouldGraph(false);
  };

  const appendToFunction = (value) => {
    setFn((prevFn) => prevFn + value);
  };

  function GraficaFun({ fn, raiz }) {
    const [isValidFunction, setIsValidFunction] = useState(true);
    const grafRef = useRef(null);

    useEffect(() => {
      let plot;
      if (fn !== '') {
        try {
          plot = functionPlot({
            target: grafRef.current,
            width: 800,
            height: 600,
            grid: true,
            data: [{
              fn: fn,
              sampler: 'builtIn',
              graphType: 'polyline',
              color: '#060270'
            },{
              points: [[raiz, 0]],
              fnType: 'points',
              graphType: 'scatter',
              color: '#FF0709'
            }]
          });
          setIsValidFunction(true);
        } catch (e) {
          console.error('Función no válida', e);
          setIsValidFunction(false);
        }
      }

      return () => {
        if (plot) {
          plot = null;
        }
      };
    }, [fn, raiz]);

    if (fn !== '' && isValidFunction) {
      return (
        <div>
          <h2>Gráfico de la función</h2>
          <div ref={grafRef} ></div>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="biseccion">
      <h1>Método de Bisección</h1>
      <div className="form-container card">
        <Entrada
          onSubmit={handleForSubmit}
          Fn={Fn}
          onChange={setFn}
          onClear={clearFunction}
        />
        <Calculator appendToFunction={appendToFunction} />
      </div>
      <Errores problemas={problema} errors={error} solucion={raiz} />
      <Resultado problemas={problema} solucion={raiz} errors={error} />
      <GraficaFun fn={replaceConstantE(Fn)} raiz={raiz}/>
    </div>
  );
}

function Entrada({ onSubmit, Fn, onChange, onClear }) {
  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <form onSubmit={onSubmit} className="entrada-form">
      <div className="form-group">
        <label htmlFor="funcion">Función:</label>
        <input
          id='funcion'
          name='funcion'
          placeholder='Ingrese la función'
          value={Fn}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="a">Valor de a:</label>
        <input
          id='a'
          name='a'
          type='number'
          step='any'
          placeholder='Ingrese el valor de a'
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="b">Valor de b:</label>
        <input
          id='b'
          name='b'
          type='number'
          step='any'
          placeholder='Ingrese el valor de b'
          required
        />
      </div>
      <div className="form-buttons">
        <button type="button" onClick={onClear}>Borrar</button>
        <button type='submit'>Enviar</button>
      </div>
    </form>
  );
}

function Errores({ problemas, errors, solucion }) {
  if (problemas === 0) {
    return (
      <div className="card errores">
        {errors.map((error, index) => (
          <div key={index}>
            <span>Error en la iteración {error[0]}: {error[1]}%</span>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className='card errores'>
        <span>ERROR: {solucion}</span>
      </div>
    );
  }
}

function Resultado({ problemas, solucion, errors }) {
  if (problemas === 0 && errors.length !== 0) {
    return (
      <div className="card resultado">
        <span>Raíz aproximada = {solucion}</span>
      </div>
    );
  }
  return null;
}

function replaceConstantE(functionString) {
  // Valor aproximado de la constante e
  const eValue = Math.E;

  // Reemplaza todas las instancias de 'e' con su valor numérico
  const newFunctionString = functionString.replace(/\be\b/g, eValue);

  return newFunctionString;
}

export default Biseccion;
