import React from "react";
import classNames from "classnames";

const Badge = ({ children, variant = "primary" }) => {
  const badgeClass = classNames(
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium",
    {
      "bg-blue-100 text-blue-800": variant === "primary",
      "bg-green-100 text-green-800": variant === "success",
      "bg-red-100 text-red-800": variant === "error",
      "bg-yellow-100 text-yellow-800": variant === "warning",
      "bg-gray-100 text-gray-800": variant === "secondary",
      "border border-gray-300 text-gray-800": variant === "outline",
    }
  );

  return <span className={badgeClass}>{children}</span>;
};

export default Badge;
