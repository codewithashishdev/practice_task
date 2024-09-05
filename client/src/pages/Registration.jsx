import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Register = () => {
  const location = useLocation();
  const role = location.state?.role || "customer";
  const navigate = useNavigate();

  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: role,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(
        "http://localhost:4000/api/v1/auth/registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (data.status_code !== 200) {
        toast.error(data.message);
      } else {
        setFormData(initialFormData);
        navigate("/login");
      }
    } catch (err) {
      toast.error("An error occurred while registering");
      console.error("Error:", err);
    }
  };

  return (
    <>
      <div className="mountain">
        <div className="loginForm">
          <div className="heading">
            <h1>Registration</h1>
          </div>
          {/* form start*/}
          <form onSubmit={handleSubmit}>
            <div className="Form-group">
              <label htmlFor="firstName" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="Form-group">
              <label htmlFor="lastName" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="Form-group">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="Form-group">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="Form-group">
              <button className="registerBtn">Register</button>
            </div>
          </form>
          <div className="Form-group-Info">
            <p>
              Already a User?
              <span style={{ marginLeft: "5px" }}>
                <Link to="/login">Login Now</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
