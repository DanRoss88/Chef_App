import { useState, useEffect } from 'react';
import axios from 'axios';


const API = 'http://localhost:3010'; // Replace with your API endpoint

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async () => {
    try {
      const response = await axios.post(`${API}/api/auth/login`, {
        username,
        password
      });
      // Store token in localStorage or cookie
      localStorage.setItem('authToken', response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Login failed:', error.response?.data || error.message);
      } else {
        console.error('Login failed:', error);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    // Check for token on component mount
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div>
      {!isAuthenticated ? (
        <>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={login}>Login</button>
        </>
      ) : (
        <>
          <h1>Welcome, Chef!</h1>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Auth;