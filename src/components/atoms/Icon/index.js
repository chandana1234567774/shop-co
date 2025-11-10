import React from "react";

export const Icon = ({
  name,
  size = 24,
  color = "currentColor",
  className = "",
}) => {
  return (
    <div className={className} style={{ width: size, height: size, color }}>
    </div>
  );
};
