import React from 'react';

function MethodSelector({ setSelectedMethod }) {
  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  return (
    <div className="container mt-4">
      <label htmlFor="methodSelect" className="form-label">Seleccionar Metodo</label>
      <select
        className="form-select"
        id="methodSelect"
        onChange={handleMethodChange}
      >
        <option value="biseccion">Bisección</option>
        <option value="newtonRaphson">Newton-Raphson</option>
        <option value="secante">Secante</option>
        <option value="jacobi">Jacobi</option>
        <option value="gauss-seidel">Gauss-Seidel</option>
        <option value="trapecio">Trapecio</option>
        <option value="simpson">Simpson</option>
        <option value="euler">Euler</option>
        <option value="chebyshev1">chebyshev</option>
        <option value="chebyshev2">chebyshev a,b</option>

      </select>
    </div>
  );
}

export default MethodSelector;
