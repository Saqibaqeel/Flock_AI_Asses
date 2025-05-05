import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../store/useAuth";
import toast from "react-hot-toast";
import Fotter from "./Fotter";

const SignUp = () => {
  const { Signup } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { fullName, email, password } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName.trim()) {
      toast.error("Please enter your full name");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await Signup(formData);
      toast.success("Account created successfully!");
      navigate('/');
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
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
            <i className="fas fa-user-plus me-2"></i>
            Create Account
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Full Name Input */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Full Name</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="fas fa-user text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                disabled={loading}
              />
            </div>
          </div>

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
                placeholder="At least 6 characters"
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
                Creating Account...
              </>
            ) : (
              <>
                <i className="fas fa-user-plus me-2"></i>
                Sign Up
              </>
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-4 pt-3 border-top">
          <span className="text-muted">Already have an account? </span>
          <Link 
            to="/login" 
            className="text-decoration-none fw-semibold text-primary"
          >
            Login Here
          </Link>
        </div>
      </div>
    </div>
    <Fotter />
    </>
  );
};

export default SignUp;