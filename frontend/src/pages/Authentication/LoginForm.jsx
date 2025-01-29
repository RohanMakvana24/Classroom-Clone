import React from 'react'
import { Link } from "react-router-dom";
import "../../assets/css/loginForm.css"
import "remixicon/fonts/remixicon.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const LoginForm = () => {
  return (
    <div className="container">
    <DotLottieReact
      src="https://lottie.host/bd0132da-e60f-4b84-9802-465119089b4f/izT9anDj4k.lottie"
      loop
      autoplay
      style={{
        height: "150px",
        width: "150px",
        margin : "0 auto",
        marginTop: "-30px",  // Adjust the negative margin as needed
      }}

    />
    <h1>Welcome Back,</h1>
    <p>Make it work, make it right, make it fast.</p>
    <form>
      <div className="form-group">
        <label htmlFor="email">E-Mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
      </div>
      <button type="submit">LOGIN</button>
      <Link to="/forgot-password" className="forgot-password">
        Forget Password?
      </Link>
    </form>
    <p>OR</p>
    <Link to="" className="google-btn">
      <i className="ri-google-fill"></i> Sign-in with Google
    </Link>

    <p className="mt-3">
      Don't have an Account? <Link to="/signup">SignUp</Link>
    </p>
  </div>
  )
}

export default LoginForm