import React from "react";
import { clsx } from "clsx";

export const Button = ({ children, disabled, className, type, ...props }) => {
  return (
    <button
      className={clsx(
        "w-full p-3 rounded-full text-gray-50 leading-none",
        type === "primary" && "bg-teal-100 hover:bg-teal-50",
        type === "secondary" && "bg-black-200 hover:bg-black-50",
        disabled && "!bg-gray-300",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
