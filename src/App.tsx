import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [identity, setIdentity] = useState(null);

  useEffect(() => {
    const fetchIdentity = async () => {
      try {
        const response = await fetch('/api/identity');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setIdentity(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchIdentity();
  }, []);

  return (
    <div className="App">
      <h1>Identity</h1>
      {identity ? <pre>{JSON.stringify(identity, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}

export default App;