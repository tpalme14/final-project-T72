import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is already logged in, redirect to dashboard
    if (localStorage.getItem('token')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      username,
      password
    };

    try {
      const response = await fetch('http://142.93.3.229:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        onLogin();
        navigate('/dashboard');
      } else {
        setError(data.err);
      }
    } catch (error) {
      setError('An error occurred during login.');
    }
  };


  return (
    <div className="login-container">
      <h3>Please Login Below</h3>
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
      {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
    </form>
    </div>
  );
}
  
  export default Login;