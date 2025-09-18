import React from "react";
import "./SplitLayout.css"; // CSS file

const SplitLayout = ({ leftContent, rightContent, leftBg = "#222", rightBg = "#444" }) => {
  return (
    <div className="split-layout">
      <div
        className="split left"
        style={{
          backgroundImage: `url(${leftBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {leftContent}
      </div>

      <div
        className="split right"
        style={{ backgroundColor: rightBg }}
      >
        {rightContent}
      </div>
    </div>
  );
};

export default SplitLayout;
