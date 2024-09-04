// Calculator.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Calculator = ({ appendToFunction }) => {
  const handleClick = (value) => {
    appendToFunction(value);
  };

  return (
    <div className="container calculator">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-3">
              <button className="btn btn-secondary btn-lg btn-block m-1" onClick={() => handleClick('7')}>7</button>
            </div>
            <div className="col-3">
              <button className="btn btn-secondary btn-lg btn-block m-1" onClick={() => handleClick('8')}>8</button>
            </div>
            <div className="col-3">
              <button className="btn btn-secondary btn-lg btn-block m-1" onClick={() => handleClick('9')}>9</button>
            </div>
            <div className="col-3">
              <button className="btn btn-secondary btn-lg btn-block m-1" onClick={() => handleClick('/')}>/</button>
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <button className="btn btn-secondary btn-lg btn-block m-1" onClick={() => handleClick('4')}>4</button>
            </div>
            <div className="col-3">
              <button className="btn btn-secondary btn-lg btn-block m-1" onClick={() => handleClick('5')}>5</button>
            </div>
            <div className="col-3">
              <button className="btn btn-secondary btn-lg btn-block m-1" onClick={() => handleClick('6')}>6</button>
            </div>
            <div className="col-3">
              <button className="btn btn-secondary btn-lg btn-block m-1" onClick={() => handleClick('*')}>*</button>
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <button className="btn btn-secondary btn-lg btn-block m-1" onClick={() => handleClick('1')}>1</button>
            </div>
            <div className="col-3">
              <button className="btn btn-secondary btn-lg btn-block m-1" onClick={() => handleClick('2')}>2</button>
            </div>
            <div className="col-3">
              <button className="btn btn-secondary btn-lg btn-block m-1" onClick={() => handleClick('3')}>3</button>
            </div>
            <div className="col-3">
              <button className="btn btn-secondary btn-lg btn-block m-1" onClick={() => handleClick('-')}>-</button>
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <button className="btn btn-secondary btn-lg btn-block m-1" onClick={() => handleClick('0')}>0</button>
            </div>
            <div className="col-3">
              <button className="btn btn-secondary btn-lg btn-block m-1" onClick={() => handleClick('.')}>.</button>
            </div>
            <div className="col-3">
              <button className="btn btn-secondary btn-lg btn-block m-1" onClick={() => handleClick('=')}>=</button>
            </div>
            <div className="col-3">
              <button className="btn btn-secondary btn-lg btn-block m-1" onClick={() => handleClick('+')}>+</button>
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <button className="btn btn-secondary btn-lg btn-block m-1" onClick={() => handleClick('^')}>^</button>
            </div>
            <div className="col-3">
              <button className="btn btn-secondary btn-lg btn-block m-1" onClick={() => handleClick('(')}>(</button>
            </div>
            <div className="col-3">
              <button className="btn btn-secondary btn-lg btn-block m-1" onClick={() => handleClick(')')}>)</button>
            </div>
            <div className="col-3">
              <button className="btn btn-secondary btn-lg btn-block m-1" onClick={() => handleClick('\u2190')}>&larr;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;

