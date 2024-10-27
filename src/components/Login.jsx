import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the import path as necessary
import './Login.css';

function Login() {
  const { isRegistering, message, toggleForm, handleSubmit } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    handleSubmit(e, formData.email, formData.password);
  };

  return (
    <div className="login-container">
      <h1>{isRegistering ? 'Register' : 'Login'}</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      {message && <p className="message">{message}</p>}
      <p>
        {isRegistering ? 'Already have an account?' : "Don't have an account?"}
        <Link to="#" onClick={toggleForm}>
          {isRegistering ? 'Login' : 'Register'}
        </Link>
      </p>
    </div>
  );
}

export default Login;
