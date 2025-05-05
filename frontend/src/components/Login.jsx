import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../store/useAuth";
import toast from "react-hot-toast";
import Fotter from "./Fotter";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { email, password } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      toast.error("Please enter your email address");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!password) {
      toast.error("Please enter your password");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await login(formData);
      toast.success("Logged in successfully!");
      navigate('/');
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card border-0 shadow-lg p-4" style={{ maxWidth: "400px", width: "100%", borderRadius: "15px" }}>
        <div className="card-header bg-transparent border-0 text-center">
          <h2 className="mb-4 fw-bold text-primary">
            <i className="fas fa-sign-in-alt me-2"></i>
            Welcome Back
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="fas fa-envelope text-muted"></i>
              </span>
              <input
                type="email"
                className="form-control border-start-0"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="fas fa-lock text-muted"></i>
              </span>
              <input
                type="password"
                className="form-control border-start-0"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="btn btn-primary w-100 py-2 fw-bold"
            disabled={loading}
          >
            {loading ? (
              <>
                <span 
                  className="spinner-border spinner-border-sm me-2" 
                  role="status" 
                  aria-hidden="true"
                ></span>
                Signing In...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt me-2"></i>
                Sign In
              </>
            )}
          </button>

          {/* Forgot Password */}
          <div className="text-end mt-3">
            <Link to="/forgot-password" className="text-decoration-none small text-muted">
              Forgot Password?
            </Link>
          </div>
        </form>

        {/* Signup Link */}
        <div className="text-center mt-4 pt-3 border-top">
          <span className="text-muted">Don't have an account? </span>
          <Link 
            to="/signup" 
            className="text-decoration-none fw-semibold text-primary"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
    <Fotter />
    </>
  );
};

export default Login;