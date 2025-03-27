import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteClass } from "../features/class/ClassSlice";
import { toast } from "react-toastify";

const ClassCard = ({ classId, title, students, fetchClass }) => {
  const [image, setImage] = useState("");
  const [rawImage, setRawImage] = useState("");
  const isInitialRender = useRef(true);
  const dispatch = useDispatch();

  const fetchStaticImage = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/class/get-all-staticimages`
      );
      setRawImage(response.data.images);
    } catch (error) {
      console.error("Static Images API Error:", error);
    }
  };

  useEffect(() => {
    fetchStaticImage();
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (rawImage && rawImage.length > 0) {
      const randomIndex = Math.floor(Math.random() * rawImage.length);
      const randomImageObject = rawImage[randomIndex];
      setImage(randomImageObject.url);
    } else {
      console.error("The images array is empty.");
    }
  }, [rawImage]);

  const handleDeletClass = async () => {
    const result = await dispatch(deleteClass(classId));
    const toastClassDeleteId = toast.loading("Class is deleting...");

    if (deleteClass.fulfilled.match(result)) {
      toast.update(toastClassDeleteId, {
        render: result.payload.message,
        type: "success",
        theme: "colored",
        isLoading: false,
        autoClose: 3000,
      });
      fetchClass();
    } else {
      const errorData = result.payload?.message;
      toast.update(toastClassDeleteId, {
        render: errorData || "Something Went Wrong",
        type: "error",
        theme: "colored",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s, box-shadow 0.3s",
        overflow: "hidden",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-10px)";
        e.currentTarget.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)";
      }}
    >
      {/* Image Section */}
      <div
        style={{ position: "relative", height: "220px", overflow: "hidden" }}
      >
        <img
          src={image}
          alt="Class Background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            display: "flex",
            gap: "10px",
          }}
        >
          <div className="dropdown">
            <i
              className="fas fa-ellipsis-v"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                fontSize: "22px",
                color: "#000", // Set to black
                background: "transparent", // No background
                padding: "12px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            ></i>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link className="dropdown-item" to={`/edit-class/${classId}`}>
                  Edit
                </Link>
              </li>
              <li>
                <button className="dropdown-item">Copy Invite Link</button>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleDeletClass}>
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div
        style={{
          padding: "25px",
          textAlign: "center",
          background: "white",
        }}
      >
        <Link
          to={`/one-class?classId=${classId}`}
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#333",
            textDecoration: "none",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#007bff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
        >
          {title}
        </Link>
        <p
          style={{
            color: "#666",
            fontSize: "18px",
            marginTop: "12px",
          }}
        >
          {students} students
        </p>
      </div>
    </div>
  );
};

export default ClassCard;
