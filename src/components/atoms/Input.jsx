// src/components/atoms/Input.jsx
import React from "react";

const Input = ({
  label,
  value,
  onChange,
  placeholder = "",
  classNames = "",
  type = "text",
}) => {
  return (
    <div className={`mb-4 ${classNames}`}>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md p-2"
        placeholder={placeholder}
        onClick={(e) => e.stopPropagation()}
        type={type}
      />
    </div>
  );
};

export default Input;
