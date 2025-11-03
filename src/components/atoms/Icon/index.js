import React from "react";

export const Icon = ({
  name,
  size = 24,
  color = "currentColor",
  className = "",
}) => {
  // Map icon names to SVG paths or use an icon library
  return (
    <div className={className} style={{ width: size, height: size, color }}>
      {/* Icon SVG or component */}
    </div>
  );
};
