import React from "react";

export const Text = ({
  children,
  variant = "body",
  weight = "normal",
  color,
  className = "",
}) => {
  const Tag = variant.startsWith("h") ? variant : "p";

  const variantStyles = {
    h1: "text-4xl md:text-5xl",
    h2: "text-3xl md:text-4xl",
    h3: "text-2xl md:text-3xl",
    body: "text-base",
    caption: "text-sm",
    label: "text-xs",
  };

  const weightStyles = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  return (
    <Tag
      className={`${variantStyles[variant]} ${weightStyles[weight]} ${className}`}
      style={{ color }}
    >
      {children}
    </Tag>
  );
};
