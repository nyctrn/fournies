import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <img
    src={spinner}
    style={{ width: '20px', margin: 'auto', display: 'block' }}
    alt="spinner"
  />
);

export default Spinner;
