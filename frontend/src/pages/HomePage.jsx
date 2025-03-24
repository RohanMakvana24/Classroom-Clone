import React, { useDeferredValue, useEffect, useState } from "react";
import "../assets/css/homePage.css";
import ClassCard from "../component/ClassCard";
import { Link } from "react-router-dom";
import Navbar from "../component/layout/Navbar";
import Sidebar from "../component/layout/Sidebar";
import SidebarDesk from "../component/layout/SidebarDesk";
import axios from "axios";
import { useSelector } from "react-redux";
const HomePage = () => {
  const styles = {
    heading: {
      fontSize: "20px",
      fontWeight: "600",
      color: "whites",
    },
    formGroup: {
      height: "62px",
      marginBottom: "1px",
    },
    label: {
      display: "block",
      fontSize: "14px",
      color: "#555",
      marginBottom: "5px",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "14px",
      outline: "none",
      transition: "border-color 0.2s",
    },
    inputFocus: {
      borderColor: "#007bff",
      boxShadow: "0 0 4px rgba(0, 123, 255, 0.3)",
    },
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
    },
    cancelButton: {
      padding: "8px 16px",
      backgroundColor: "#f0f0f0",
      color: "#555",
      border: "1px solid #ccc",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    cancelButtonHover: {
      backgroundColor: "#e0e0e0",
    },
    createButton: {
      padding: "8px 16px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    createButtonHover: {
      backgroundColor: "#0056b3",
    },
    required: {
      color: "red",
    },
  };

  const [Class, setClass] = useState([]);
  const [Images, setImages] = useState([]);
  const [loading , setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);

  // ~~ Get All Class ~~ //
    const fetchClass = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/api/v1/class/get-all-classes/${
            user._id
          }`
        );
        setClass(response.data.data);
      } catch (error) {
        console.log(error);
      }
      finally{
        setLoading(false);
      }
    };
  
  useEffect(()=>{
    fetchClass();
  } , [user._id])


  return (
    <>
      <div className="mainOP">
        {/* Navbar */}
        <Navbar  fetchClass={fetchClass} />

        {/* Offcanvas Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="container-fluid">
          <div className="row">
            <SidebarDesk />
            <main className="col-lg-10 ms-auto px-6">
              <div className="container-fluid mt-4">
                <div className="row g-3">
                  { loading ? (  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>) 
                     :  Class.length > 0 ? (
                    Class.map((classItem, idx) => (
                      <div
                        className="col-12 col-sm-6 col-md-4 col-lg-3"
                        key={classItem._id} // Use a unique key from API
                      >
                        <ClassCard 
                          classId={classItem._id}
                          title={classItem.className} // Assuming `name` is the class title
                          students={classItem.studentCount || 0} // Assuming `studentCount` exists
                        />
                      </div>
                    ))
                  ) : (
                    <p>No classes available</p>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
