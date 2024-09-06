import React, { useState } from 'react';
import './Login.css';

const LoginSignup: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = isLogin
        ? 'http://localhost:3000/api/auth/login'
        : 'http://localhost:3000/api/auth/register';
      const body = isLogin ? { email, password } : { username, email, password };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.status === 400) {
        alert("The email is already taken, please use a different one.");
        console.log('This is a 400 status code error');
        return;
      }

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Network response was not ok');
      }

      if (isLogin) {
        localStorage.setItem('token', data.token);
        alert('Login successful');
        console.log(data);
      } else {
        alert('Signup successful');
        setIsLogin(true);
      }
    } catch (error: any) {
      console.error('Error occurred during submission:', error);
      alert(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-signup-container">
      <div className="login-signup-card">
        <h2 className="title">{isLogin ? 'Login' : 'Signup'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label className="label" htmlFor="username">
                Username
              </label>
              <input
                className="input"
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              className="input"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className={`custom-button ${isLoading ? 'loading' : ''}`}
            type="submit"
            disabled={isLoading}
          >
            <span>{isLoading ? 'Loading...' : isLogin ? 'Login' : 'Signup'}</span>
            <div className="tooltip">
              <div className="tooltip-text">This is a tooltip.</div>
              <div className="tooltip-arrow"></div>
            </div>
          </button>

          <button
            className="toggle-button"
            type="button"
            onClick={handleToggle}
          >
            {isLogin ? 'Create an account' : 'Already have an account?'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
