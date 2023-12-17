import React, { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { registerRoute } from "../routing/routes";

export function SimulatedActions() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    navigate({to: registerRoute.fullPath, search: { email, emailCode } });
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    navigate({to: registerRoute.fullPath, search: { phone, phoneCode } });
  };

  return (
    <div>
      <form onSubmit={handleEmailSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Code:
          <input
            type="text"
            value={emailCode}
            onChange={(e) => setEmailCode(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <form onSubmit={handlePhoneSubmit}>
        <label>
          Phone:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <label>
          Code:
          <input
            type="text"
            value={phoneCode}
            onChange={(e) => setPhoneCode(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
