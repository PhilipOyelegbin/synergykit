"use client";

import { useState } from "react";
import { EMAIL_ICON_SVG } from "../../../_components/constants";
import Link from "next/link";

// interface ForgotPasswordFormProps {
//   onNavigateToSignin: () => void;
//   onRequestReset: (email: string) => void;
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

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField
        id="email-address"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Enter your email address"
        icon={EMAIL_ICON_SVG}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3b82f6] hover:bg-[#2563eb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563eb] transition duration-150 ease-in-out"
        >
          Send Password Reset Link
        </button>
      </div>
      <p className="mt-6 text-center text-sm text-[#6b7280]">
        Remember your password?{" "}
        <Link
          href="/auth/logn"
          className="font-medium text-[#3b82f6] hover:text-[#2563eb]"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}
