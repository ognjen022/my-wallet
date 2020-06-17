import React from 'react';
import spinner from './assets/loader.gif';
import './Spinner.css';

const Spinner = () => {
  return <img className="Spinner" src={spinner} alt="Loading.." />;
};

export default Spinner;
