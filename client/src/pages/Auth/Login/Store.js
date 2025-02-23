// // if (email === '' || password === '') {
// //     setError('Please fill in all fields');
// //   } else {
// //     // Call API to login
// //     console.log('Login:', email, password);
// //   }
// // } else {
// //   // Signup logic here
// //   if (email === '' || password === '' || confirmPassword === '') {
// //     setError('Please fill in all fields');
// //   } else if (password !== confirmPassword) {
// //     setError('Passwords do not match');
// //   } else {
// //     // Call API to signup
// //     console.log('Signup:', email, password);
// //   }
// // }
// const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (isLogin) {
//       // Login logic here
//       if (email === '' || password === '') {
//         setError('Please fill in all fields');
//       } else {
//         // Call API to login
//         console.log('Login:', email, password);
//       }
//     } else {
//       // Signup logic here
//       if (email === '' || password === '' || confirmPassword === '') {
//         setError('Please fill in all fields');
//       } else if (password !== confirmPassword) {
//         setError('Passwords do not match');
//       } else {
//         // Call API to signup
//         console.log('Signup:', email, password);
//       }
//     }
//   };

// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     try {
//       const url = isLogin ? 'http://localhost:3000/api/auth/login' : 'http://localhost:3000/api/auth/register';
//       const body = isLogin
//         ? { email, password }
//         : { email, password, confirmPassword };

//       if (!isLogin && password !== confirmPassword) {
//         setError('Passwords do not match');
//         setIsLoading(false);
//         return;
//       }

//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();

//       if (isLogin) {
//         localStorage.setItem('token', data.token); // Save token to localStorage
//         alert('Login successful');
//         // Redirect or update UI as needed
//       } else {
//         alert('Signup successful');
//         setIsLogin(true); // Switch to login after successful signup
//       }
//     } catch (error) {
//       setError('An error occurred: ' );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//new upaded one 8/30/2024


//newest update on 12/18/2024
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
