import React from 'react';

import Alert from 'react-bootstrap/Alert';

const HomePage = () => {
  return (
    <Alert variant="secondary" style={{ padding: '0.5rem' }}>
      <h1
        style={{ textShadow: 'rgba(132, 132, 132, 0.4) 1px 1px 1px' }}
        className="text-center pb-1 pt-2 text-secondary"
      >
        Fournies
      </h1>
    </Alert>
  );
};

export default HomePage;
