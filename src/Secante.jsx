// src/components/Secante.js

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import functionPlot from 'function-plot';
import Calculator from './Calculator';
import './Secante.css'; // Asegúrate de crear este archivo CSS

function Secante() {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [Fn, setFn] = useState('');
  const [shouldGraph, setShouldGraph] = useState(false);

  const grafRef = useRef(null);
  const errorRef = useRef(null);

  const fetchAPI = async (funcion, x0, x1, tol) => {
    try {
      const response = await axios.post('http://localhost:5000/secante', {
        funcion: funcion,
        x0: parseFloat(x0),
        x1: parseFloat(x1),
        tol: parseFloat(tol),
      });
      setResult(response.data);
      setError(null);
    } catch (e) {
      setError(e.response ? e.response.data.error : e.message);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const funcion = event.target.funcion.value;
    const x0 = event.target.x0.value;
    const x1 = event.target.x1.value;
    const tol = event.target.tol.value;
    fetchAPI(funcion, x0, x1, tol);
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

  function GraficaFun({ fn }) {
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
    }, [fn]);

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
    <div className="secante">
      <h1>Método de la Secante</h1>
      <div className='card'>
        <Entrada
          onSubmit={handleFormSubmit}
          Fn={Fn}
          onChange={setFn}
          onClear={clearFunction}
        />
        <Calculator appendToFunction={appendToFunction} />
      </div>
      {result && <Resultado result={result} />}
      {error && <ErrorMessage error={error} />}
      <GraficaFun fn={replaceConstantE(Fn)}/>
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
        <label htmlFor="x0">Valor de x0:</label>
        <input
          id='x0'
          name='x0'
          type='number'
          step='any'
          placeholder='Ingrese el valor de x0'
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="x1">Valor de x1:</label>
        <input
          id='x1'
          name='x1'
          type='number'
          step='any'
          placeholder='Ingrese el valor de x1'
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="tol">Tolerancia:</label>
        <input
          id='tol'
          name='tol'
          type='number'
          step='any'
          placeholder='Ingrese la tolerancia'
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

function Resultado({ result }) {
  return (
    <div className="card resultado">
      <h3>Resultado</h3>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}

function ErrorMessage({ error }) {
  return (
    <div className='card error-message'>
      <h3>Error</h3>
      <p>{error}</p>
    </div>
  );
}

function replaceConstantE(functionString) {
  // Valor aproximado de la constante e
  const eValue = Math.E;

  // Reemplaza todas las instancias de 'e' con su valor numérico
  const newFunctionString = functionString.replace(/\be\b/g, eValue);

  return newFunctionString;
}

export default Secante;
