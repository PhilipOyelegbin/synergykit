"use client";

import { useState } from "react";
import { LOCK_ICON_SVG } from "../../../_components/constants";
import Link from "next/link";

// interface ResetPasswordFormProps {
//   disabled?: boolean;
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

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // TODO: Implement actual password reset logic
    console.log("Password reset attempt with new password:", password);
    alert(
      "Password has been reset (simulated). Please sign in with your new password."
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField
        id="new-password"
        name="newPassword"
        type="password"
        autoComplete="new-password"
        placeholder="Enter new password"
        icon={LOCK_ICON_SVG}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputField
        id="confirm-new-password"
        name="confirmNewPassword"
        type="password"
        autoComplete="new-password"
        placeholder="Confirm new password"
        icon={LOCK_ICON_SVG}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3b82f6] hover:bg-[#2563eb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563eb] transition duration-150 ease-in-out disabled:opacity-50"
        >
          Reset Password
        </button>
      </div>
      <p className="mt-6 text-center text-sm text-[#6b7280]">
        Changed your mind or password reset successfully?{" "}
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
