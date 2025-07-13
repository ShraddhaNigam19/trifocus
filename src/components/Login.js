import React, { useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // ✅ Redirect after successful login
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>TriFocus</h1>
        <p className="tagline">Plan your day. Build habits. Get things done.</p>

        <div className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>

          <button className="google-btn" onClick={handleGoogleSignIn}>
            Sign in with Google
          </button>

          <div className="divider">or</div>

          <p className="signup-link">
            Don't have an account?{" "}
            <a onClick={() => navigate("/signup")}>Sign up</a>
          </p>

          <div className="signup-link">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;
