import { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import PropTypes from "prop-types";
import Syllabus from "./Syllabus";

export default function Window({ subjectName, children, bringToFront, windowOrder }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const solutionRef = useRef(null);

  if (!isVisible) return null;

  const copySolutionToClipboard = () => {
    if (solutionRef.current) {
      const textToCopy = solutionRef.current.innerText;
      navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Solution copied to clipboard!");
      }).catch(err => {
        console.error("Failed to copy:", err);
      });
    }
  };

  return (
    <Rnd
      dragHandleClassName="drag-me"
      default={{ x: 100, y: 100, width: 300, height: 200 }}
      size={isFullScreen ? { width: "100vw", height: "100vh" } : undefined}
      position={isFullScreen ? { x: 0, y: 0 } : undefined}
      minWidth={880}
      minHeight={500}
      bounds="window"
      disableDragging={isFullScreen}
      style={{
        border: "1px solid #ccc",
        background: "#EDF4F2",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
        zIndex: windowOrder.indexOf(subjectName) + 10,  // ⭐ Dynamically zIndex set ho raha hai
        display: "flex",
        flexDirection: "column",
        position: "absolute",
      }}
      onMouseDown={() => bringToFront(subjectName)}  // ⭐ Jab click hoga, window top pe aayegi
    >
      {/* Window Header */}
      <div
        className="drag-me"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px",
          background: "rgb(8, 163, 73)",
          color: "#fff",
          borderRadius: "8px 8px 0 0",
          cursor: "grabbing",
        }}
      >
        <span>{subjectName}</span>
        <div>
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              marginRight: "8px",
              cursor: "pointer",
            }}
          >
            {isFullScreen ? "Restore" : "Full Screen"}
          </button>
          <button
            onClick={() => setIsVisible(false)}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            ✖
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: isFullScreen ? "row" : "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "auto",
          padding: "16px",
        }}
      >
        {/* Copy Solution Button */}
        <button
          onClick={copySolutionToClipboard}
          style={{
            background: "#007bff",
            color: "#fff",
            border: "none",
            padding: "8px 12px",
            borderRadius: "4px",
            cursor: "pointer",
            margin: isFullScreen ? "0 16px" : "16px 0",
          }}
        >
          📋 Copy Solution
        </button>

        {/* Syllabus and Gemini API Output Container */}
        <div
          ref={solutionRef}
          style={{
            display: "flex",
            flexDirection: isFullScreen ? "row" : "column",
            width: "100%",
            maxWidth: isFullScreen ? "100%" : "90%",
            textAlign: "center",
            justifyContent: "space-around",
          }}
        >
          {children}
          {isFullScreen && <Syllabus subjectName={subjectName} />}
        </div>
      </div>
    </Rnd>
  );
}

// Prop Validation
Window.propTypes = {
  subjectName: PropTypes.string.isRequired,
  children: PropTypes.node,
  bringToFront: PropTypes.func.isRequired,
  windowOrder: PropTypes.array.isRequired,
};

Window.defaultProps = {
  subjectName: "Untitled Window",
};
