import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteClass } from "../features/class/ClassSlice";
import { toast } from "react-toastify";
const ClassCard = ({ classId, title, students , fetchClass }) => {
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
      isInitialRender.current = false; // Skip initial render
      return;
    }

    if (rawImage && rawImage.length > 0) {
      // Get a random image object
      const randomIndex = Math.floor(Math.random() * rawImage.length);
      const randomImageObject = rawImage[randomIndex];

      // Access the URL of the random image
      setImage(randomImageObject.url);
    } else {
      console.error("The images array is empty.");
    }
  }, [rawImage]);

  const handleDeletClass = async () => {
      const result = await dispatch(deleteClass(classId));
      const toastClassDeleteId = toast.loading("Classs is deleting....");
      if (deleteClass.fulfilled.match(result)) {
        toast.update(toastClassDeleteId ,  {
          render : result.payload.message,
          type : "success",
          theme : "colored",
          isLoading : false,
          autoClose: 3000,
        })
        fetchClass();
      } else {
        const errorData = result.payload?.message;
        if(errorData){
          toast.update(toastClassDeleteId , {
            render : errorData ,
            type : "error",
            theme : "colored",
            isLoading : false,
            autoClose : 3000
          })
        }else{
          toast.update(toastClassDeleteId , {
            render : "Somenthin Went Wrong" ,
            type : "error",
            theme : "colored",
            isLoading : false,
            autoClose : 3000
          })
        }
      }
   
  };
  return (
    <div className="card text-white shadow-lg rounded-3 overflow-hidden">
      <div className="position-relative">
        <img
          src={image}
          className="card-img-top img-fluid"
          alt="Class Background"
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="position-absolute top-0 end-0 p-2">
          <div className="dropdown">
            <i
              className="fas fa-ellipsis-v text-dark fs-4"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ cursor: "pointer" }}
            ></i>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="#">
                  Edit
                </a>
              </li>
              <li>
                <a className="dropdown-item">Copy Invite Link</a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleDeletClass}>
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Link
        to={`/one-class?classId=${classId}`}
        className="card-body d-flex flex-column justify-content-between"
      >
        <Link
          to={`/one-class?classId=${classId}`}
          className="fw-bold text-dark mb-2"
        >
          {title}
        </Link>
        <p className="mb-0">{students} students</p>
      </Link>
    </div>
  );
};

export default ClassCard;
