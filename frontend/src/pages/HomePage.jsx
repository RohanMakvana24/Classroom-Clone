import React from "react";
import "../assets/css/homePage.css";
import ClassCard from "../component/ClassCard";
import { Link } from "react-router-dom";
import Navbar from "../component/layout/Navbar";
import Sidebar from "../component/layout/Sidebar";
import SidebarDesk from "../component/layout/SidebarDesk";
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

  return (
    <>
      <div className="mainOP">
        {/* Navbar */}
        <Navbar />

        {/* Offcanvas Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="container-fluid">
          <div className="row">
           <SidebarDesk />

            <main className="col-lg-10 ms-auto px-6">
              <div className="container-fluid mt-4">
                <div className="row g-3">
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-3"
                      key={idx}
                    >
                      <ClassCard title={"BCA Sem 04 "} students={2} />
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Create Class Modal */}
        <div
          className="modal fade"
          id="creteClassModal"
          tabIndex="-1"
          aria-labelledby="createClassModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  style={styles.heading}
                  className="modal-title"
                  id="joinClassModalLabel"
                >
                  Create class
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div>
                  <div>
                    <form>
                      <div style={styles.formGroup}>
                        <label htmlFor="className" style={styles.label}>
                          Class name{" "}
                          <span style={styles.required}>(required)</span>
                        </label>
                        <input
                          type="text"
                          id="className"
                          placeholder="Class name"
                          style={styles.input}
                          onFocus={(e) =>
                            (e.target.style = {
                              ...styles.input,
                              ...styles.inputFocus,
                            })
                          }
                          onBlur={(e) => (e.target.style = styles.input)}
                          required
                        />
                      </div>
                      <div style={styles.formGroup}>
                        <label htmlFor="section" style={styles.label}>
                          Section
                        </label>
                        <input
                          type="text"
                          id="section"
                          placeholder="Section"
                          style={styles.input}
                        />
                      </div>
                      <div style={styles.formGroup}>
                        <label htmlFor="subject" style={styles.label}>
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          placeholder="Subject"
                          style={styles.input}
                        />
                      </div>
                      <div style={styles.formGroup}>
                        <label htmlFor="room" style={styles.label}>
                          Room
                        </label>
                        <input
                          type="text"
                          id="room"
                          placeholder="Room"
                          style={styles.input}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>

        {/*  Join Class Modal */}
        <div
          className="modal fade"
          id="joinClassModal"
          tabIndex="-1"
          aria-labelledby="joinClassModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="joinClassModalLabel">
                  Join class
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <strong>You're currently signed in as</strong>
                  <div className="d-flex align-items-center mt-2">
                    <div
                      className="rounded-circle bg-primary text-white text-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      <p style={{ color: "white", marginTop: "10px" }}> R </p>
                    </div>
                    <div className="ms-2">
                      <p className="mb-0">Rohan Makvana</p>
                      <small>rohanmakvana10@gmail.com</small>
                    </div>
                    <button type="button" className="btn btn-link ms-auto p-0">
                      Switch account
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="classCode" className="form-label">
                    Class code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="classCode"
                    placeholder="Class code"
                  />
                  <div className="form-text">
                    Ask your teacher for the class code, then enter it here.
                  </div>
                </div>

                <p className="text-muted">
                  <strong>To sign in with a class code:</strong>
                  <ul className="mb-0">
                    <li>Use an authorized account</li>
                    <li>
                      Use a class code with 5-7 letters or numbers, and no
                      spaces or symbols
                    </li>
                  </ul>
                </p>
                <a href="#" className="text-decoration-none">
                  Help Center article
                </a>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
