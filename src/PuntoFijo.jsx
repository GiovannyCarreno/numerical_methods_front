import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import functionPlot from 'function-plot';
import Calculator from './Calculator';
import './PuntoFijo.css';

function PuntoFijo() {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [Fn, setFn] = useState('');
  const [valorInicial, setValorInicial] = useState(0);

  const fetchAPI = async (funcion, valorInicial) => {
    try {
      const response = await axios.post('http://localhost:5000/puntofijo', {
        funcion: funcion,
        valor_inicial: valorInicial
      }, {
        timeout: 10000 // 10 segundos
      });
      setResult(response.data);
      setError(null);
    } catch (e) {
      console.error('Error completo:', e);
      if (e.response) {
        setError(`Error del servidor: ${e.response.data.error || e.response.statusText}`);
      } else if (e.request) {
        setError('No se recibió respuesta del servidor. Verifica que el servidor esté corriendo.');
      } else {
        setError(`Error al configurar la solicitud: ${e.message}`);
      }
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const funcion = event.target.funcion.value;
    const valorInicial = parseFloat(event.target.valor_inicial.value);
    fetchAPI(funcion, valorInicial);
    setFn(funcion);
    setValorInicial(valorInicial);
  };

  const clearFunction = () => {
    setFn('');
    setValorInicial(0);
    setResult(null);
    setError(null);
  };

  const appendToFunction = (value) => {
    setFn((prevFn) => prevFn + value);
  };

  return (
    <div className="punto-fijo">
      <h1>Método de Punto Fijo</h1>
      <div className="form-container card">
        <Entrada
          onSubmit={handleFormSubmit}
          Fn={Fn}
          valorInicial={valorInicial}
          onChange={setFn}
          onClear={clearFunction}
        />
        <Calculator appendToFunction={appendToFunction} />
      </div>
      {result && <Resultado result={result} />}
      {error && <ErrorMessage error={error} />}
      <GraficaFun fn={replaceConstantE(Fn)} />
    </div>
  );
}

function Entrada({ onSubmit, Fn, valorInicial, onChange, onClear }) {
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
        <label htmlFor="valor_inicial">Valor Inicial:</label>
        <input
          id='valor_inicial'
          name='valor_inicial'
          type='number'
          placeholder='Ingrese el valor inicial'
          defaultValue={valorInicial}
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
  const formatComplex = (num) => {
    if (typeof num === 'object' && 'real' in num && 'imag' in num) {
      return `${num.real.toFixed(6)} ${num.imag >= 0 ? '+' : '-'} ${Math.abs(num.imag).toFixed(6)}i`;
    }
    return num.toFixed(6);
  };

  return (
    <div className="card resultado">
      <h3>Resultado</h3>
      <h4>Raíces:</h4>
      <ul>
        {result.raices.map((raiz, index) => (
          <li key={index}>{formatComplex(raiz)}</li>
        ))}
      </ul>
      <h4>Errores:</h4>
      <ul>
        {result.errores.map(([iteracion, error], index) => (
          <li key={index}>Iteración {iteracion}: {infinity(error)}</li>
        ))}
      </ul>
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

function replaceConstantE(functionString) {
  // Valor aproximado de la constante e
  const eValue = Math.E;

  // Reemplaza todas las instancias de 'e' con su valor numérico
  const newFunctionString = functionString.replace(/\be\b/g, eValue);

  return newFunctionString;
}

function infinity(error) {
  if (error === 10000) {
    return 'infinito'
  }else{
    return error + '%'
  }
}

export default PuntoFijo;