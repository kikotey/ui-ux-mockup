import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export function Input({
  register,
  name,
  label,
  icon,
  placeholder,
  disabled,
  className,
  registerOptions = {},
  type = "text", // Added a type prop with a default value of "text"
  ...rest
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputStyle = `
    block
    w-full
    p-4
    rounded-full
    ${disabled ? "bg-gray-300" : "bg-teal-30"}
    focus:outline-none
    focus:ring
    focus:border-blue-300
    placeholder:text-gray-800
    transition-all
    rounded-full
    pl-11
  `;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className={className}>
      {label && (
        <label className="block font-spSemiBold text-black-300">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          {...register(name, registerOptions)}
          {...rest}
          type={isPasswordVisible ? "text" : type} // Toggle between "text" and the original type
          placeholder={placeholder}
          className={inputStyle}
          disabled={disabled}
        />
        {type === "password" && (
          <div
            className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-400 stroke-2" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400 stroke-2" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
