import React, { useState } from "react";

export default function Icon({ openIcon, subjectName }) {
  const [isHovered, setIsHovered] = useState(false);

  // Assign images based on the subject name
  const images = {
    Math: "public/math-icon.png",
    Science: "public/science-icon.png",
    History: "public/history-icon.png",
    Default: "./folder (1).png",
  };

  return (
    <div
      className="subject-icons"
      style={{
        border: "1px solid white",
        height: "90px",
        paddingInline: "20px",
        borderRadius: "12px",
        cursor: "pointer",
        margin: "20px",
        position: "relative", // Needed for absolute tooltip
      }}
      onClick={openIcon}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={images[subjectName] || images.Default}
        alt={subjectName}
        style={{
          height: "60px",
          transition: "transform 0.3s ease-in-out",
        }}
      />
      <p style={{ fontFamily: "verdana" }}>{subjectName}</p>

      {/* Tooltip on hover */}
      {isHovered && (
        <div
          style={{
            position: "absolute",
            top: "100px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "10px",
            borderRadius: "8px",
            fontSize: "12px",
            textAlign: "center",
            width: "150px",
            zIndex: 10,
          }}
        >
          <p>{subjectName}</p>
          <img
            src={images[subjectName] || images.Default}
            alt={subjectName}
            style={{ height: "40px", marginTop: "5px" }}
          />
        </div>
      )}
    </div>
  );
}
