// src/components/Jacobi.js

import React, { useState } from 'react';
import axios from 'axios';
import './Jacobi.css'; // Asegúrate de crear este archivo CSS

function Jacobi() {
  const [matrixSize, setMatrixSize] = useState(3);
  const [A, setA] = useState(Array(3).fill().map(() => Array(3).fill(0)));
  const [b, setB] = useState(Array(3).fill(0));
  const [x0, setX0] = useState(Array(3).fill(0));
  const [resultado, setResultado] = useState([]);
  const [error, setError] = useState(null);

  const handleMatrixSizeChange = (e) => {
    const size = parseInt(e.target.value);
    setMatrixSize(size);
    setA(Array(size).fill().map(() => Array(size).fill(0)));
    setB(Array(size).fill(0));
    setX0(Array(size).fill(0));
  };

  const handleMatrixChange = (e, rowIndex, colIndex) => {
    const newA = A.map((row, rIndex) => row.map((value, cIndex) =>
      rIndex === rowIndex && cIndex === colIndex ? parseFloat(e.target.value) : value
    ));
    setA(newA);
  };

  const handleVectorChange = (e, index, setVector, vector) => {
    const newVector = vector.map((value, i) =>
      i === index ? parseFloat(e.target.value) : value
    );
    setVector(newVector);
  };

  const convertMatrixToString = (matrix) => {
    return matrix.map(row => row.join(',')).join(';');
  };

  const convertVectorToString = (vector) => {
    return vector.join(',');
  };

  const fetchAPI = async (A, b, x0, tolerancia, max_iter) => {
    try {
      const response = await axios.post('http://localhost:5000/jacobi', {
        A: convertMatrixToString(A),
        b: convertVectorToString(b),
        x0: convertVectorToString(x0),
        tolerancia: parseFloat(tolerancia),
        max_iter: parseInt(max_iter)
      });
      if (response.data.resultado !== undefined) {
        setResultado(response.data.resultado);
        setError(null);
      } else {
        setResultado([]);
        setError(response.data.error || 'Error inesperado');
      }
    } catch (e) {
      console.error('Error fetching API:', e);
      setError('Error de conexión');
    }
  };

  const handleForSubmit = (event) => {
    event.preventDefault();
    const tolerancia = event.target.tolerancia.value;
    const max_iter = event.target.max_iter.value;
    fetchAPI(A, b, x0, tolerancia, max_iter);
  };

  return (
    <div className="jacobi">
      <h1>Método Jacobi</h1>
      <div className='card'>
        <form onSubmit={handleForSubmit}>
          <div className="form-group">
            <label>
              Tamaño de la matriz:
              <input
                type="number"
                value={matrixSize}
                onChange={handleMatrixSizeChange}
                min="1"
                required
              />
            </label>
          </div>
          <div className="matrix-section">
            <h3>Matriz A</h3>
            {A.map((row, rowIndex) => (
              <div key={rowIndex} className="matrix-row">
                {row.map((value, colIndex) => (
                  <input
                    key={colIndex}
                    type="number"
                    value={value}
                    onChange={(e) => handleMatrixChange(e, rowIndex, colIndex)}
                    required
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="vector-section">
            <h3>Vector b</h3>
            {b.map((value, index) => (
              <input
                key={index}
                type="number"
                value={value}
                onChange={(e) => handleVectorChange(e, index, setB, b)}
                required
              />
            ))}
          </div>
          <div className="vector-section">
            <h3>Vector x0</h3>
            {x0.map((value, index) => (
              <input
                key={index}
                type="number"
                value={value}
                onChange={(e) => handleVectorChange(e, index, setX0, x0)}
                required
              />
            ))}
          </div>
          <div className="form-group">
            <h3>Tolerancia</h3>
            <input
              id='tolerancia'
              name='tolerancia'
              type='number'
              step='any'
              placeholder='Ingrese la tolerancia'
              required
            />
          </div>
          <div className="form-group">
            <h3>Max Iteraciones</h3>
            <input
              id='max_iter'
              name='max_iter'
              type='number'
              placeholder='Ingrese el número máximo de iteraciones'
              required
            />
          </div>
          <button style={{backgroundColor: '#4caf50'}} type='submit'>Enviar</button>
        </form>
      </div>
      <Resultado resultado={resultado} error={error} />
    </div>
  );
}

function Resultado({ resultado, error }) {
  if (error) {
    return (
      <div className='card resultado error'>
        <span>ERROR: {error}</span>
      </div>
    );
  } else if (resultado.length > 0) {
    return (
      <div className="card resultado">
        <span>Resultado = {resultado.join(', ')}</span>
      </div>
    );
  }
  return null;
}

export default Jacobi;
