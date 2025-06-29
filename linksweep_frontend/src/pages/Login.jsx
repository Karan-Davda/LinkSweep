import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import InputField from "../components/InputField";
import "./AuthPages.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(formData);

      if (result.success) {
        navigate("/Dashboard.jsx");
      } else {
        setError(result.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left side - 60% */}
      <div className="auth-left">
        <div className="auth-background">
          <div className="auth-overlay">
            <div className="auth-content">
              <div className="logo-section">
                <h1 className="logo">LinkSweep</h1>
                <div className="logo-icon">🔗</div>
              </div>
              <div className="quote-section">
                <h2 className="quote-title">Welcome Back!</h2>
                <p className="quote-text">
                  "Discover and organize the web's most valuable content with
                  intelligent link management."
                </p>
                <div className="quote-author">
                  - Your Digital Journey Starts Here
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - 40% */}
      <div className="auth-right">
        <div className="auth-form-container">
          <div className="auth-header">
            <h2 className="auth-title">Sign In</h2>
            <p className="auth-subtitle">
              Enter your credentials to access your account
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="auth-error">{error}</div>}

            <InputField
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange("email")}
              required
              icon="📧"
            />

            <InputField
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange("password")}
              required
              icon="🔒"
            />

            <div className="auth-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <button type="button" className="forgot-password">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="auth-button primary"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="auth-link">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;