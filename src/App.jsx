import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MethodSelector from './MethodSelector';
import Biseccion from './Biseccion';
import NewtonRaphson from './NewtonRaphson';
import Secante from './Secante';
import Jacobi from './Jacobi';
import GaussSeidel from './GaussSeidel';
import Trapecio from './Trapecio';
import Simpson from './Simpson';
import Euler from './Euler';
import Chebyshev1 from './Chebyshev1';
import Chebyshev2 from './Chebyshev2';

function App() {
  const [selectedMethod, setSelectedMethod] = useState('biseccion');

  const renderMethod = () => {
    switch (selectedMethod) {
      case 'biseccion':
        return <Biseccion />;
      case 'newtonRaphson':
        return <NewtonRaphson />;
      case 'secante':
        return <Secante />;
      case 'jacobi':
        return <Jacobi />;
      case 'gauss-seidel':
        return <GaussSeidel />;
      case 'trapecio':
          return <Trapecio />;
      case 'simpson':
            return <Simpson />;
      case 'euler':
        return <Euler />;
      case 'chebyshev1':
        return <Chebyshev1 />;
      case 'chebyshev2':
        return <Chebyshev2 />;
    default:
        return null;
    }
  };

  return (
    <>
      <Navbar setSelectedMethod={setSelectedMethod} />
      <Sidebar setSelectedMethod={setSelectedMethod} />
      <MethodSelector setSelectedMethod={setSelectedMethod} />
      {renderMethod()}
    </>
  );
}

export default App;
