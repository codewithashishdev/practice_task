import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.status_code !== 200) {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: { backgroundColor: "red", color: "white" },
        });
      }else{
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: { backgroundColor: "rgb(255, 115, 0)", color: "white" }
        });
      }
    } catch (err) {
      toast.error("Error in registration", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { backgroundColor: "red", color: "white" },
      });
    }
  };
  return (
    <>
      <div className="mountain">
        <div className="loginForm">
          <div className="heading">
            <h1>Login</h1>
          </div>
          {/* form start*/}
          <form onSubmit={handleSubmit}>
            <div className="Form-group">
              <label htmlFor="employeeEmailId" className="form-label">
                Email
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
              <button className="registerBtn">Login</button>
            </div>
          </form>
          <div className="Form-group-Info">
            <p>
              New User?
              <span style={{ marginLeft: "5px" }}>
                <Link to="/">Register Here</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
