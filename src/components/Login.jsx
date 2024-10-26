import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    isRegistering: false,
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = formData.isRegistering
      ? 'http://localhost:8000/api/register/' // Registration API endpoint
      : 'http://localhost:8000/api/login/';   // Login API endpoint

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      console.log('Response:', response);

      const result = await response.json();
      if (response.ok) {
        setMessage(formData.isRegistering ? 'Registration successful' : 'Login successful');
        if (!formData.isRegistering) {
          localStorage.setItem('token', result.token); // Store token for session if logging in
          navigate('/wines'); // Redirect to the wine listing page after login
        } else {
          toggleForm(); // Switch to login form after successful registration
        }
      } else {
        setMessage(result.message || 'An error occurred during authentication.');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleForm = () => {
    setFormData({ ...formData, isRegistering: !formData.isRegistering });
    setMessage('');
  };

  return (
    <div className="login-container">
      <h1>{formData.isRegistering ? 'Register' : 'Login'}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required // Make field required
        />
        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          required // Make field required
        />
        <button type="submit">{formData.isRegistering ? 'Register' : 'Login'}</button>
      </form>
      {message && <p className="message">{message}</p>}
      <p>
        {formData.isRegistering ? 'Already have an account?' : "Don't have an account?"}
        <Link to="#" onClick={toggleForm}>
          {formData.isRegistering ? 'Login' : 'Register'}
        </Link>
      </p>
    </div>
  );
}

export default Login;
