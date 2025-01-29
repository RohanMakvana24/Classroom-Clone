import React, { useState } from 'react'
import "../../assets/css/otpVerification.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const OTPVerification = () => {
    const [otp, setOtp] = useState("");

    const handleChange = (e) => {
      const value = e.target.value.replace(/[^0-9]/g, ""); // Ensure only numbers
      setOtp(value.slice(0, 6)); // Limit OTP to 4 digits
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Entered OTP:", otp);
      // Add OTP verification logic here
    };
  
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ backgroundColor: "white" ,   marginTop : "18px" , border : "none"}}
      >
        <div
          className="card p-4"
          style={{ width: "350px", marginTop: "-62px", border: "none" }}
        >
          <div className="text-center mb-4">
            {/* <img
              src="https://img.freepik.com/premium-vector/vector-illustration-depicting-woman-entering-onetime-password-as-part-validation-process_210682-949.jpg?w=740" // Replace with your image
              alt="Verification"
              className="img-fluid mb-3"
            /> */}
            <DotLottieReact
              src="https://lottie.host/136e0148-c03f-4508-8b5f-b6f20150f88e/mHOElaCxDs.lottie"
              loop
              autoplay
                className="img-fluid mb-3"
            />
  
            <h4 className="fw-bold">Verification</h4>
            <p className="text-muted">You will get an OTP via SMS</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="otp-container mb-4">
              <input
                type="text"
                className="form-control otp-input"
                value={otp}
                placeholder="X X X X X X"
                onChange={handleChange}
                maxLength="6"
                style={{
                  textAlign: "center",
                  fontSize: "1.5rem",
                  letterSpacing: "10px",
                  borderRadius: "10px",
                }}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 py-2"
              style={{
                backgroundColor: "#6f42c1",
                border: "none",
                borderRadius: "10px",
              }}
            >
              VERIFY
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-muted small">
              Didn’t receive the verification OTP?{" "}
              <a href="#resend" className="text-primary fw-bold">
                Resend again
              </a>
            </p>
          </div>
        </div>
      </div>
    );
}

export default OTPVerification