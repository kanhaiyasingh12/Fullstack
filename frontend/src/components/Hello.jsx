import React from 'react';

const Hello = () => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <h1>{import.meta.env.VITE_TEST_MESSAGE}</h1>
      <p>Current API URL: <code>{import.meta.env.VITE_API_BASE_URL}</code></p>
    </div>
  );
};

export default Hello;
