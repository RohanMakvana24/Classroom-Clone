import React from "react";


const ClassCard  = ({ title, students }) => {
  return (
    <div
      className="card1"
      style={{
        background: "url('https://static.vecteezy.com/system/resources/previews/004/965/420/non_2x/deer-in-the-forest-beautiful-sunset-scenery-illustration-free-vector.jpg')",
        color: "white",
        backgroundSize : "cover",
        borderRadius: "7px",
        overflow: "hidden",
        boxShadow : "black 0px 0px 2px"
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
        <h4 style={{ fontWeight: "bold", margin: "0 0 10px" }}>{title}</h4>
        <p style={{ margin: "0", fontSize: "14px" , color : "white" }}>{students} students</p>
      </div>
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
      >
        <i
          className="fas fa-ellipsis-v"
          style={{
            fontSize: "20px",
            color: "rgba(255, 255, 255, 0.7)",
          }}
        ></i>
      </div>
    </div>
  );
};
export default ClassCard