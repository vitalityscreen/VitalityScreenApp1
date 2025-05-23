import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ping`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => {
        console.error('API error:', err);
        setMessage('Failed to reach backend');
      });
  }, []);

  return (
    <div>
      <h1>Welcome to VitalityScreen</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
