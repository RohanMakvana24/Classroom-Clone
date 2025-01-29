import React from 'react'
import "remixicon/fonts/remixicon.css";
import "../../assets/css/loginForm.css"
import { Link } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

 
const SignupForm = () => {
  return (
    <div className="container">
         <DotLottieReact
      src="https://lottie.host/453c0d82-74a8-4d6f-b254-5910adb70e4b/CvY3mDmWFx.lottie"
      loop
      autoplay
      style={{
        height: "200px",
        width: "200px",
        margin : "0 auto",
        marginTop: "-50px",  // Adjust the negative margin as needed
      }}

    />
      <h1>  <img style={{ height :'22px' , width : '22px' , marginBottom : '5px'
      }} src="https://img.icons8.com/?size=100&id=asrpF0KlPITb&format=png&color=000000" />  Welcome <img style={{ height :'22px' , width : '22px' , marginBottom : '5px'
      }} src="https://img.icons8.com/?size=100&id=asrpF0KlPITb&format=png&color=000000" /> </h1>
      <p>Craate your profile to start your journey</p>
      <form>
        {/* Full Name Input */}
        <div className="form-group">
          <label htmlFor="full-name">Full Name:</label>
          <input
            type="text"
            id="full-name"
            name="full-name"
            placeholder="Enter your full name"
            required
          />
        </div>
        
        {/* E-Mail Input */}
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

        {/* Password Input */}
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

        {/* Profile Image Input */}
        <div className="form-group">
          <label htmlFor="profile-image">Profile Image:</label>
          <input
            type="file"
            id="profile-image"
            name="profile-image"
            accept="image/*"
          />
        </div>

        <button type="submit">LOGIN</button>
      </form>
      <p className="mt-3">
        Don't have an Account? <Link to="/login">SignIn</Link>
      </p>
      <br/>
      <p className="last-policy-description">
        By signing up, you agree to our last policy terms and conditions.
      </p>
    </div>
  )
}

export default SignupForm