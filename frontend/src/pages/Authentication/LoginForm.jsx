import React from 'react'
import { Link, useFetcher } from "react-router-dom";
import "../../assets/css/loginForm.css"
import "remixicon/fonts/remixicon.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {useFormik} from 'formik'
import LoginSchema from '../../ValidationSchema/Authentication/LoginSchema';
const LoginForm = () => {

  //Formik for submiting form
  const formik = useFormik({
    initialValues : {email : '' , password : ''},
    validationSchema : LoginSchema,
    onSubmit : (values)=>{
       console.log(values)
    }
  })


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
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">E-Mail:</label>
        <input
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{ fontSize : "13px" , height : "40px"}}

          id="email"
          name="email"
          className = {`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid ' : ''}`}
          placeholder="Enter email"
        />
        {
          formik.touched && formik.errors.email && (<div style={{ color : "red" , fontSize : "13px" , marginLeft : "2px"}}> {formik.errors.email} </div>)
        }
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={formik.values.password}
          style={{ fontSize : "13px" , height : "40px"}}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`form-control ${formik.touched.password && formik.errors.email ? "is-invalid" : ""}`}
          name="password"
          placeholder="Password"
        />
        { 
          formik.touched.password && formik.errors.password  && (
            <div style={{ color : "red" , fontSize : "13px" , marginLeft : "2px"}} > {formik.errors.password} </div>
          )
        }
      </div>
      <button type="submit">LOGIN</button>
      <Link to="/forgot-password" className="forgot-password">
        Forget Password?
      </Link>
    </form>
    <p>OR</p>
    <Link to="" className="google-btn googleHover">
      <i className="ri-google-fill"></i> Sign-in with Google
    </Link>

    <p className="mt-3">
      Don't have an Account? <Link to="/signup">SignUp</Link>
    </p>
  </div>
  )
}

export default LoginForm