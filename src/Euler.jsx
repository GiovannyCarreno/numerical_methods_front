// src/components/Euler.js

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import functionPlot from 'function-plot';
import './Euler.css'; // Asegúrate de crear este archivo CSS

function Euler() {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [Fn, setFn] = useState('');
  const grafRef = useRef(null);

  const fetchAPI = async (ecuacion, a, b, y0, n) => {
    try {
      const response = await axios.post('https://numericalmethodsback-production.up.railway.app/euler', {
        ecuacion: ecuacion,
        a: parseFloat(a),
        b: parseFloat(b),
        y0: parseFloat(y0),
        n: parseInt(n)
      });
      setResult(response.data);
      setError(null);
    } catch (e) {
      setError(e.response ? e.response.data.error : e.message);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const ecuacion = event.target.ecuacion.value;
    const a = event.target.a.value;
    const b = event.target.b.value;
    const y0 = event.target.y0.value;
    const n = event.target.n.value;
    fetchAPI(ecuacion, a, b, y0, n);
    setFn(ecuacion);
  };

  useEffect(() => {
    if (result && result.x_vals && result.y_vals) {
      functionPlot({
        target: grafRef.current,
        width: 600,
        height: 400,
        grid: true,
        data: [
          {
            points: result.x_vals.map((x, i) => [x, result.y_vals[i]]),
            fnType: 'points',
            graphType: 'scatter',
            color: 'blue'
          },
          {
            fn: Fn,
            sampler: 'builtIn',
            graphType: 'polyline',
            color: 'red'
          }
        ]
      });
    }
  }, [result, Fn]);

  return (
    <div className="euler">
      <h1>Método de Euler</h1>
      <div className='card'>
        <Entrada onSubmit={handleFormSubmit} Fn={Fn} onChange={setFn} />
      </div>
      {result && <Resultado result={result} />}
      {error && <ErrorMessage error={error} />}
    </div>
  );
}

function Entrada({ onSubmit, Fn, onChange }) {
  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <form onSubmit={onSubmit} className="entrada-form">
      <div className="form-group">
        <label htmlFor="ecuacion">Ecuación:</label>
        <input
          id='ecuacion'
          name='ecuacion'
          placeholder='Ingrese la ecuación'
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
        <label htmlFor="y0">Valor inicial y0:</label>
        <input
          id='y0'
          name='y0'
          type='number'
          step='any'
          placeholder='Ingrese el valor inicial y0'
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="n">Número de pasos (n):</label>
        <input
          id='n'
          name='n'
          type='number'
          step='any'
          placeholder='Ingrese el número de pasos n'
          required
        />
      </div>
      <div className="form-buttons">
        <button type='submit'>Enviar</button>
      </div>
    </form>
  );
}

function Resultado({ result }) {
  return (
    <div className="card resultado">
      <h3>Resultado</h3>
      <table>
        <thead>
          <tr>
            <th>x</th>
            <th>y</th>
          </tr>
        </thead>
        <tbody>
          {result.x_vals.map((x, i) => (
            <tr key={i}>
              <td>{x}</td>
              <td>{result.y_vals[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default Euler;
