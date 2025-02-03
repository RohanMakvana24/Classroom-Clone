import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import 'remixicon/fonts/remixicon.css'
const EmailVerification = ({timeLeft , fullname , email}) => {
  const styles = {
    body1: {
      backgroundColor: "#f0f4f8",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    container1: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "30px",
      maxWidth: "600px",
      textAlign: "center",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    image: {
      width: "50px",
      marginBottom: "20px",
    },
    heading: {
      fontSize: "24px",
      marginBottom: "20px",
    },
    subHeading: {
      fontSize: "20px",
      marginBottom: "20px",
    },
    paragraph: {
      fontSize: "16px",
      marginBottom: "10px",
    },
    email: {
      fontWeight: "bold",
    },
    resendLink: {
      color: "#007bff",
      textDecoration: "none",
      cursor: "pointer",
    },
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };
  return (
    <div style={styles.body1}>
      <div style={styles.container1}>
        <h5> <i class="ri-school-fill"></i> <span> Classroom </span> </h5>     
        <h1 style={styles.heading}>Email Verification </h1>
        <h2 style={styles.subHeading}>
          Hey {fullname}, <br /> Just one more step... !!!
        </h2>
        <DotLottieReact
          src="https://lottie.host/4e51551d-b5f0-449e-98ee-f8272020b85d/fhPyLKMfOV.lottie"
          loop
          autoplay
          style={{ width: "300px", height: "300px", margin:"auto" }}

        />
        <p style={styles.paragraph}>
          To activate your account, click the link in the email we've sent to:
        </p>
        <p style={styles.email}>{email}</p>
        <p style={styles.paragraph}>Active your account within <span style={{ color : "red"}}>{formatTime(timeLeft)}</span></p>
 
       
      </div>
    </div>
  );
};

export default EmailVerification;
