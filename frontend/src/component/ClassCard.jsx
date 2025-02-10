import React from "react";

const ClassCard = ({ title, students }) => {
  return (
    <div
      className="card1"
      style={{
        background:
          "url('https://static.vecteezy.com/system/resources/previews/004/965/420/non_2x/deer-in-the-forest-beautiful-sunset-scenery-illustration-free-vector.jpg')",
        color: "white",
        backgroundSize: "cover",
        borderRadius: "7px",
        overflow: "hidden",
        boxShadow: "black 0px 0px 2px",
        position: "relative",
      }}
    >
      <div
        className="card-body"
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "150px",
        }}
      >
        <h4
          style={{ fontWeight: "bold", fontSize: "20px", margin: "0 0 10px" }}
        >
          {title}
        </h4>
        <p style={{ margin: "0", fontSize: "14px", color: "white" }}>
          {students} students
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div className="dropdown">
          <i
            className="fas fa-ellipsis-v"
            style={{
              fontSize: "20px",
              color: "rgba(255, 255, 255, 0.7)",
              cursor: "pointer",
            }}
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></i>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <a className="dropdown-item" href="#">
                Edit
              </a>
            </li>
            <li>
              <a className="dropdown-item">Copy Invite Link </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
