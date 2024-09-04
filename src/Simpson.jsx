// src/components/Simpson.js

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import functionPlot from 'function-plot';
import Calculator from './Calculator';
import './Simpson.css'; // Asegúrate de crear este archivo CSS

function Simpson() {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [Fn, setFn] = useState('');
  const [shouldGraph, setShouldGraph] = useState(false);
  const [intervaloA, setIntervaloA] = useState(0);
  const [intervaloB, setIntervaloB] = useState(0);

  const grafRef = useRef(null);

  const fetchAPI = async (funcion, a, b, n) => {
    try {
      const response = await axios.post('http://localhost:5000/simpson', {
        funcion: funcion,
        a: parseFloat(a),
        b: parseFloat(b),
        n: parseInt(n),
      });
      setResult(response.data);
      setIntervaloA(a)
      setIntervaloB(b)
      setError(null);
    } catch (e) {
      setError(e.response ? e.response.data.Error : e.message);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const funcion = event.target.funcion.value;
    const a = event.target.a.value;
    const b = event.target.b.value;
    const n = event.target.n.value;
    fetchAPI(funcion, a, b, n);
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

  function GraficaFun({ fn, intervaloa, intervalob }) {
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
              range: [intervaloa, intervalob],
              closed: true,
              sampler: 'builtIn',
              graphType: 'polyline',
              color: '#060270'
            },{
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
        <div style={{textAlign: 'center'}}>
          <br /><br />
          <h2 style={{color: '#000000'}}>Gráfico de la función</h2>
          <div ref={grafRef} style={{display: 'inline-block', width: '800px', height: '600px', background: '#ffff'}}></div>
          <br />
        </div>
      );
    }
    return null;
  }

  return (
    <div className="simpson">
      <h1>Método de Simpson</h1>
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
      <GraficaFun fn={replaceConstantE(Fn)} intervaloa={intervaloA} intervalob={intervaloB}/>
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
      <div className="form-group">
        <label htmlFor="n">Número de subintervalos (n):</label>
        <input
          id='n'
          name='n'
          type='number'
          step='1'
          placeholder='Ingrese el número de subintervalos (n)'
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

export default Simpson;
