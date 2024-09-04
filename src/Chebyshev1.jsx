// src/components/Chebyshev1.js

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import functionPlot from 'function-plot';
import Calculator from './Calculator';
import './Chebyshev1.css'; // Asegúrate de crear este archivo CSS

function Chebyshev1() {
  const [funcionAproximada, setfuncionAproximada] = useState('');
  const [problema, setProblema] = useState(0);
  const [Fn, setFn] = useState('');
  const [shouldGraph, setShouldGraph] = useState(false);

  const grafRef = useRef(null);

  const fetchAPI = async (funcion, n) => {
    try {
      const response = await axios.post('http://localhost:5000/chebyshev2', {
        funcion: funcion,
        n: parseFloat(n)
      });
      if (response.data.funcion_aproximada !== undefined) {
        setfuncionAproximada(response.data.funcion_aproximada);
        setProblema(0);
      } else {
        setfuncionAproximada(response.data.Error);
        setProblema(1);
      }
    } catch (e) {
      console.error('Error fetching API:', e);
    }
  };

  const handleForSubmit = (event) => {
    event.preventDefault();
    const funcion = event.target.funcion.value;
    const n = event.target.n.value;
    fetchAPI(funcion, n);
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

  return (
    <div className="chebyshev">
      <h1>Método Chebyshev -1, 1</h1>
      <div className='card'>
        <Entrada onSubmit={handleForSubmit} Fn={Fn} onChange={setFn} onClear={clearFunction} />
        <Calculator appendToFunction={appendToFunction} />
      </div>
      <Resultado problemas={problema} solucion={funcionAproximada} />
      <GraficaFun fn={replaceConstantE(Fn)} problemas={problema} />
      <GraficaFunAprox fn={funcionAproximada} fno={replaceConstantE(Fn)} problemas={problema} />
    </div>
  );
}

function GraficaFun({ fn, problemas }) {
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
            color: '#4AFE02'
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
  }, [fn, problemas]);

  if (fn !== '' && isValidFunction) {
    return (
      <div className="grafica-container">
        <br></br>
        <br></br>
        <h2>Gráfico de la función</h2>
        <div ref={grafRef}></div>
      </div>
    );
  }

  return null;
}

function GraficaFunAprox({ fn, problemas, fno }) {
  const [isValidFunction, setIsValidFunction] = useState(true);
  const grafRef = useRef(null);

  useEffect(() => {
    let plot;
    if (fn !== '' && fn !== undefined) {
      try {
        plot = functionPlot({
          target: grafRef.current,
          width: 800,
          height: 600,
          grid: true,
          data: [
            {
              fn: fno,
              sampler: 'builtIn',
              graphType: 'polyline',
              color: '#4AFE02'
            },
            {
              fn: fn,
              sampler: 'builtIn',
              graphType: 'polyline',
              color: '#FD0707'
            }
          ]
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
  }, [fn, problemas]);

  if (fn !== '' && isValidFunction && problemas === 0) {
    return (
      <div className="grafica-container">
        <h2>Gráfico aproximado de la función</h2>
        <div ref={grafRef} ></div>
      </div>
    );
  }

  return null;
}

function Entrada({ onSubmit, Fn, onChange, onClear }) {
  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input
          id='funcion'
          name='funcion'
          placeholder='Ingrese la función'
          value={Fn}
          onChange={handleInputChange}
        />
        <button style={{backgroundColor: '#ff6b6b'}} onClick={onClear}>Borrar</button>
      </div>
      <div className="form-group">
        <input
          id='n'
          name='n'
          type='number'
          step='any'
          placeholder='Ingrese el valor de k'
          required
        />
      </div>
      <button style={{backgroundColor: '#4caf50'}} type='submit'>Enviar</button>
    </form>
  );
}

function Resultado({ problemas, solucion }) {
  if (problemas === 0 && solucion !== '') {
    return (
      <div className="card resultado">
        <span>Función aproximada = {solucion}</span>
      </div>
    );
  } else if (problemas !== 0 && solucion !== undefined) {
    return (
      <div className="card resultado error">
        <span>Error: {solucion}</span>
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

export default Chebyshev1;
