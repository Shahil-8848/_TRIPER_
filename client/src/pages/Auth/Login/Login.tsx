import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext"; // Import AuthContext

const LoginSignup: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, signup } = useAuth(); // Access login and signup functions from AuthContext
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        // Log in the user
        const loggedInUser = await login(email, password);
        if (loggedInUser) {
          // Redirect to the home page on successful login
          navigate("/");
        }
      } else {
        // Sign up the user
        await signup(username, email, password);
        setIsLogin(true); // Switch to login form after successful signup
      }
    } catch (error: any) {
      console.error("Error occurred during submission:", error);
      alert(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
      setEmail("");
      setPassword("");
      setUsername("");
    }
  };

  useEffect(() => {
    // Clear all input fields on component mount
    setEmail("");
    setPassword("");
    setUsername("");
  }, []);

  return (
    <div className="login-signup-container">
      <div className="login-signup-card">
        <h2 className="title">{isLogin ? "Login" : "Signup"}</h2>
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
                autoComplete="off"
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
              autoComplete="off"
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
            className={`custom-button ${isLoading ? "loading" : ""}`}
            type="submit"
            disabled={isLoading}
          >
            <span>
              {isLoading ? "Loading..." : isLogin ? "Login" : "Signup"}
            </span>
          </button>

          <button
            className="toggle-button"
            type="button"
            onClick={handleToggle}
          >
            {isLogin ? "Create an account" : "Already have an account?"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
