// src/components/atoms/Input.jsx
import React from "react";

const Input = ({ label, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md p-1"
        type="text"
      />
    </div>
  );
};

export default Input;
