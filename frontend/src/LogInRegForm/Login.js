import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LogIn = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userType, setUserType] = React.useState("");
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({ email, password, type: userType }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    if (data.EMAIL) {
      console.log(JSON.stringify(data));
      // Redirect to the dashboard
      navigate("/dashboard");
      localStorage.setItem("user", JSON.stringify(data));
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleLogIn}>
        <h1>WELCOME!</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <i className="bx bxs-user"></i>
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <i className="bx bxs-lock-alt"></i>
        </div>
        <div className="input-box">
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="" disabled>
              Who is logging in?
            </option>
            <option value="child">Child</option>
            <option value="parent">Parent</option>
            <option value="teacher">Teacher</option>
            <option value="doctor">Doctor</option>
          </select>
          <i className="bx bxs-down-arrow"></i>
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember Me
          </label>
          <a href="https://www.google.com/">Forgot Password</a>
        </div>
        <button type="submit" className="btn">
          LOGIN
        </button>
        <div className="register-link">
          <p>
            Don't have an account?{" "}
            <a href="https://www.google.com/">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
