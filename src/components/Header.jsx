import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { Link } from "@tanstack/react-router";

export function Header() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible((prev) => !prev);
  };
  return (
    <div className="w-full z-10 flex flex-col">
      <div className=" bg-teal-50 py-2 px-4 flex justify-between items-center">
        <img src="./kikotey_logo.svg" className="w-10 h-10" />
        <Bars3Icon
          className="w-8 h-8 fill-white cursor-pointer"
          onClick={toggleVisible}
        />
      </div>
      {visible && (
        <div className="absolute mt-12 w-full flex flex-col h-full bg-teal-50 p-12 gap-y-6">
          <Link
            to="/"
            className="text-3xl text-white tracking-tighter"
            onClick={toggleVisible}
          >
            Sponsorship
          </Link>
          <Link
            to="/createPassword"
            className="text-3xl text-white tracking-tighter"
            onClick={toggleVisible}
          >
            Create password
          </Link>
        </div>
      )}
    </div>
  );
}
