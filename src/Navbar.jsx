import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = ({ setSelectedMethod }) => {
  const handleNavClick = (method) => {
    setSelectedMethod(method);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#">Métodos Numéricos</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#newton" onClick={() => handleNavClick('newtonRaphson')}>Newton-Raphson</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#biseccion" onClick={() => handleNavClick('biseccion')}>Bisección</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#secante" onClick={() => handleNavClick('secante')}>Secante</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#gauss-seidel" onClick={() => handleNavClick('gauss-seidel')}>Gauss-Seidel</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#jacobi" onClick={() => handleNavClick('jacobi')}>Jacobi</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#trapecio" onClick={() => handleNavClick('trapecio')}>Trapecio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#simpson" onClick={() => handleNavClick('simpson')}>Simpson</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#euler" onClick={() => handleNavClick('euler')}>Euler</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#chebyshev1" onClick={() => handleNavClick('chebyshev1')}>Chebyshev -1 , 1</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#chebyshev2" onClick={() => handleNavClick('chebyshev2')}>Chebyshev a , b</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
