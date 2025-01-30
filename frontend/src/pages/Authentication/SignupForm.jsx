import React from "react";
import "remixicon/fonts/remixicon.css";
import "../../assets/css/loginForm.css";
import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useFormik } from "formik";
import SignupSchema from "../../ValidationSchema/Authentication/SignupSchema";

const SignupForm = () => {
  // Formik To handle Singup Form
  const formik = useFormik({
    initialValues: { fullname: "", email: "", password: "", profile: "" },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="container">
      <DotLottieReact
        src="https://lottie.host/453c0d82-74a8-4d6f-b254-5910adb70e4b/CvY3mDmWFx.lottie"
        loop
        autoplay
        style={{
          height: "200px",
          width: "200px",
          margin: "0 auto",
          marginTop: "-50px", // Adjust the negative margin as needed
        }}
      />
      <h1>
        <img
          style={{ height: "22px", width: "22px", marginBottom: "5px" }}
          src="https://img.icons8.com/?size=100&id=asrpF0KlPITb&format=png&color=000000"
        />
        Welcome
        <img
          style={{ height: "22px", width: "22px", marginBottom: "5px" }}
          src="https://img.icons8.com/?size=100&id=asrpF0KlPITb&format=png&color=000000"
        />
      </h1>
      <p>Craate your profile to start your journey</p>
      <form onSubmit={formik.handleSubmit}>
        {/* Full Name Input */}
        <div className="form-group">
          <label htmlFor="full-name">Full Name:</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            style={{ fontSize : "13px" , height : "40px"}}
            className={`form-control ${formik.touched.fullname && formik.errors.fullname ? "is-invalid" : ""}`}
            value={formik.values.fullname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your full name"
          />
          {formik.touched.fullname && formik.errors.fullname && (
            <span style={{ color: "red", fontSize: "13px", marginLeft: "2px" }}>
              {" "}
              {formik.errors.fullname}
            </span>
          )}
        </div>

        {/* E-Mail Input */}
        <div className="form-group">
          <label htmlFor="email">E-Mail:</label>
          <input
            type="email"
            id="email"
            style={{ fontSize : "13px" , height : "40px"}}
            name="email"
            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter email"
          />

          {formik.touched.email && formik.errors.email && (
            <span style={{ color: "red", fontSize: "13px", marginLeft: "2px" }}>
              {" "}
              {formik.errors.email}
            </span>
          )}
        </div>

        {/* Password Input */}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
            style={{ fontSize : "13px" , height : "40px"}}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Password"
          />
          {formik.touched.password && formik.errors.password && (
            <span style={{ color: "red", fontSize: "13px", marginLeft: "2px" }}>
              {" "}
              {formik.errors.password}
            </span>
          )}
        </div>

        {/* Profile Image Input */}
        <div className="form-group">
          <label htmlFor="profile-image">Profile Image:</label>
          <input
            type="file"
            id="profile-image"
            name="profile"
            className={`form-control ${formik.touched.profile && formik.errors.profile ? 'is-invalid' : ''}`}
            onChange={(event) => {
              const profile = event.currentTarget.files[0];
              formik.setFieldValue("profile", profile);
            }}
            accept="image/*"
          />
          {formik.touched.profile && formik.errors.profile && (
            <span style={{ color: "red", fontSize: "13px", marginLeft: "2px" }}>
              {formik.errors.profile}
            </span>
          )}
        </div>
        <button type="submit">SIGNUP</button>
      </form>
      <p className="mt-3">
        Don't have an Account? <Link to="/login">SignIn</Link>
      </p>
      <br />
      <p className="last-policy-description">
        By signing up, you agree to our last policy terms and conditions.
      </p>
    </div>
  );
};

export default SignupForm;
