"use client";

import React, { useState } from "react";
import {
  USER_ICON_SVG,
  EMAIL_ICON_SVG,
  LOCK_ICON_SVG,
  GOOGLE_ICON_SVG,
} from "../../../_components/constants";
import Link from "next/link";

// interface SignupFormProps {
//   onNavigateToSignin: () => void;
// }

const InputField: React.FC<{
  id: string;
  name: string;
  type: string;
  autoComplete: string;
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ id, name, type, autoComplete, placeholder, icon, value, onChange }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      required
      className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-[#1f2937] focus:outline-none focus:ring-[#3b82f6] focus:border-[#3b82f6] focus:z-10 sm:text-sm"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // TODO: Implement actual signup logic
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "content-type": "application/json" },
    });
    if (!response.ok) {
      console.log("An error occured", response?.statusText);
    }
    const data = await response.json();
    console.log("Signup attempt log:", data);
    alert("Signup functionality not implemented yet. Check console for data.");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <InputField
        id="full-name"
        name="name"
        type="text"
        autoComplete="name"
        placeholder="Full Name"
        icon={USER_ICON_SVG}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <InputField
        id="email-address"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Email address"
        icon={EMAIL_ICON_SVG}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        id="password"
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder="Password"
        icon={LOCK_ICON_SVG}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputField
        id="confirm-password"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        placeholder="Confirm Password"
        icon={LOCK_ICON_SVG}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3b82f6] hover:bg-[#2563eb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563eb] transition duration-150 ease-in-out mt-2"
        >
          Create Account
        </button>
      </div>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-[#6b7280]">Or sign up with</span>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={() => alert("Social login not implemented.")}
          className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-[#6b7280] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#60a5fa] transition duration-150 ease-in-out"
        >
          <span className="sr-only">Sign up with Google</span>
          {GOOGLE_ICON_SVG}
          <span className="ml-2">Sign up with Google</span>
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-[#6b7280]">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-[#3b82f6] hover:text-[#2563eb]"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}
