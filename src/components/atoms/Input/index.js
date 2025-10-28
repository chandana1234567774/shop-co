"use client";

export default function Input({ placeholder, className, ...props }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`outline-none border border-gray-300 rounded-full px-4 py-2 focus:border-gray-600 transition ${className}`}
      {...props}
    />
  );
}
