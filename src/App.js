import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

// Get API URL from runtime config (injected at container startup)
const API_URL = 'https://express-server.react-express-mono-repo.local.getwebstack.dev:9443';

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');
  const [userGreeting, setUserGreeting] = useState('');
  const [envData, setEnvData] = useState(null);
  const [envLoading, setEnvLoading] = useState(false);

  useEffect(() => {
    // Fetch message from API
    fetch(`${API_URL}/api/message`)
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const fetchEnvVars = () => {
    setEnvLoading(true);
    fetch(`${API_URL}/api/env-test`)
      .then(response => response.json())
      .then(data => {
        setEnvData(data);
        setEnvLoading(false);
      })
      .catch(err => {
        console.error('Error fetching env vars:', err);
        setEnvLoading(false);
      });
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      fetch(`${API_URL}/api/users/${userName}`)
        .then(response => response.json())
        .then(data => {
          setUserGreeting(data.greeting);
        })
        .catch(err => {
          console.error('Error fetching user:', err);
        });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Full Stack Test App</h1>
        
        <div style={{ marginTop: '30px' }}>
          <h2>API Message:</h2>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          {!loading && !error && (
            <p style={{ fontSize: '20px', color: '#61dafb' }}>{message}</p>
          )}
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2>Try the User API:</h2>
          <form onSubmit={handleUserSubmit}>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              style={{
                padding: '10px',
                fontSize: '16px',
                borderRadius: '5px',
                border: 'none',
                marginRight: '10px'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#61dafb',
                color: '#282c34',
                cursor: 'pointer'
              }}
            >
              Get Greeting
            </button>
          </form>
          {userGreeting && (
            <p style={{ fontSize: '20px', color: '#61dafb', marginTop: '20px' }}>
              {userGreeting}
            </p>
          )}
        </div>

        <div style={{ marginTop: '40px', borderTop: '2px solid #61dafb', paddingTop: '30px' }}>
          <h2>Environment Variables Test:</h2>
          <button
            onClick={fetchEnvVars}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#61dafb',
              color: '#282c34',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            {envLoading ? 'Loading...' : 'Test Environment Variables'}
          </button>

          {envData && (
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'left',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <h3 style={{ color: '#61dafb', marginTop: '0' }}>Environment Variables Status:</h3>
              <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                <p><strong>Environment:</strong> <span style={{ color: '#98c379' }}>{envData.environment}</span></p>
                <p><strong>DATABASE_URL:</strong> <span style={{ color: envData.hasDatabaseUrl ? '#98c379' : '#e06c75' }}>
                  {envData.hasDatabaseUrl ? '✓ Set' : '✗ Not Set'}
                </span></p>
                <p><strong>API_KEY:</strong> <span style={{ color: envData.hasApiKey ? '#98c379' : '#e06c75' }}>
                  {envData.hasApiKey ? '✓ Set' : '✗ Not Set'}
                </span></p>
                <p style={{ fontSize: '12px', color: '#888', marginTop: '15px' }}>
                  Timestamp: {envData.timestamp}
                </p>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
