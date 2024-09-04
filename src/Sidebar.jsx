import React, { useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Sidebar = ({ setSelectedMethod }) => {
  useEffect(() => {
    const sidebar = document.getElementById('sidebar');
    const navbarToggler = document.querySelector('.navbar-toggler');

    const handleToggle = () => {
      const bsOffcanvas = new window.bootstrap.Offcanvas(sidebar);
      bsOffcanvas.toggle();
    };

    navbarToggler.addEventListener('click', handleToggle);

    // Limpiar el event listener al desmontar el componente
    return () => {
      navbarToggler.removeEventListener('click', handleToggle);
    };
  }, []);

  const handleSidebarClick = (method) => {
    setSelectedMethod(method);
    const bsOffcanvas = new window.bootstrap.Offcanvas(document.getElementById('sidebar'));
    bsOffcanvas.hide();
  };

  return (
    <div className="offcanvas offcanvas-start" tabIndex="-1" id="sidebar" aria-labelledby="sidebarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="sidebarLabel">Menú</h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#newton" onClick={() => handleSidebarClick('newtonRaphson')}>Newton-Raphson</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#biseccion" onClick={() => handleSidebarClick('biseccion')}>Bisección</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#secante" onClick={() => handleSidebarClick('secante')}>Secante</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#gauss-seidel" onClick={() => handleSidebarClick('gauss-seidel')}>Gauss-Seidel</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#jacobi" onClick={() => handleSidebarClick('jacobi')}>Jacobi</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#trapecio" onClick={() => handleSidebarClick('trapecio')}>Trapecio</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#simpson" onClick={() => handleSidebarClick('simpson')}>Simpson</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#euler" onClick={() => handleSidebarClick('euler')}>Euler</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#chebyshev1" onClick={() => handleSidebarClick('chebyshev1')}>chebyshev</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#chebyshev2" onClick={() => handleSidebarClick('chebyshev2')}>chebyshev2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

