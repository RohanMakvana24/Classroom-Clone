import React, { useState } from "react";
import "../assets/css/homePage.css";
import Navbar from "../component/layout/Navbar";
import Sidebar from "../component/layout/Sidebar";
import ClassCard from "../component/ClassCard";
import ClassWork from "../component/class/ClassWork";
import People from '../component/class/People'
import Stream from "../component/class/Stream";
import SidebarDesk from './../component/layout/SidebarDesk';
const OneClassPage = () => {
  const styles = {
    headerImage: {
      backgroundImage:
        'url("https://static.vecteezy.com/system/resources/previews/011/134/640/non_2x/development-illustration-vector.jpg")',
      backgroundSize: "cover", // Ensures the image covers the container
      backgroundPosition: "center", // Centers the image
      height: "200px",
      position: "relative",
    },

    headerImageImg: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "100%",
      height: "auto",
    },
    customizeBtn: {
      position: "absolute",
      top: "10px",
      right: "10px",
    },
    card: {
      backgroundColor: "#fff",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "16px",
    },
    code: {
      fontSize: "24px",
      color: "#1a73e8",
    },
    announcementInput: {
      border: "none",
      outline: "none",
      width: "100%",
    },
    streamImage: {
      maxWidth: "10%",
      height: "auto",
    },
    badge: {
      width: "40px",
      height: "40px",
    },
  };
  const [ActiveTab, setActiveTab] = useState("stream");
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
                <ul class="nav nav-tabs">
                  <li class="nav-item">
                    <a onClick={() => setActiveTab('stream')} class={`nav-link ${ActiveTab === 'stream' ? 'active' : ''}`} aria-current="page">
                      Stream
                    </a>
                  </li>
                  <li class="nav-item">
                    <a onClick={() => setActiveTab('classwork')} class={`nav-link ${ActiveTab === 'classwork' ? 'active' : ''}`} >
                      Classwork
                    </a>
                  </li>
                  <li class="nav-item">
                    <a onClick={() => setActiveTab('people')} class={`nav-link ${ActiveTab === 'people' ? 'active' : ''}`} >
                      People
                    </a>
                  </li>
                </ul>
                {ActiveTab === "stream" && <Stream />}
                {ActiveTab === "classwork" && <ClassWork />}
                {ActiveTab === "people" && <People />}
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

export default OneClassPage;
