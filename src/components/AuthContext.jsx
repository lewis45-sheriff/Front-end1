import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate(); // Use navigate from react-router-dom

  const handleAuthentication = () => {
    setIsAuthenticated(true);
    // Additional logic for authenticated user
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setMessage('');
  };

  const handleSubmit = async (e, email, password) => {
    e.preventDefault();
    const url = isRegistering
      ? 'http://localhost:8000/api/register/'
      : 'http://localhost:8000/api/login/';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(isRegistering ? 'Registration successful' : 'Login successful');
        if (!isRegistering) {
          localStorage.setItem('token', result.token);
          handleAuthentication();
          navigate('/wines');
        } else {
          toggleForm();
        }
      } else {
        setMessage(result.message || 'An error occurred during authentication.');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, message, toggleForm, handleSubmit, isRegistering }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
