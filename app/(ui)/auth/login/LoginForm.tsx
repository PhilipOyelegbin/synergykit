"use client";

import { useEffect, useState } from "react";
import {
  EMAIL_ICON_SVG,
  LOCK_ICON_SVG,
  GOOGLE_ICON_SVG,
} from "../../../_components/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ErrorToast, SuccessToast } from "@/app/_components/toast";
import { signIn, useSession } from "next-auth/react";

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

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [sucMessage, setSucMessage] = useState("");
  const session = useSession();
  const navigate = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      console.log(response);
      if (response?.error) {
        setErrMessage(`${response?.error}`);
      } else if (response?.url) {
        setSucMessage("Login successful!");
        setEmail("");
        setPassword("");
        navigate.push("/notes");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrMessage("Internal server error. Please try again later.");
    }
  };

  useEffect(() => {
    if (session?.status === "authenticated") {
      navigate.replace("/notes");
    }

    if (errMessage) {
      const timer = setTimeout(() => {
        setErrMessage("");
      }, 10000);

      return () => clearTimeout(timer);
    }

    if (sucMessage) {
      const timer = setTimeout(() => {
        setSucMessage("");
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [session, navigate, errMessage, sucMessage]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
        autoComplete="current-password"
        placeholder="Password"
        icon={LOCK_ICON_SVG}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-[#3b82f6] focus:ring-[#60a5fa] border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-[#6b7280]"
          >
            Remember me
          </label>
        </div>
        <div className="text-sm">
          <Link
            href="/auth/forgot-password"
            className="font-medium text-[#3b82f6] hover:text-[#2563eb]"
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="cursor-pointer group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3b82f6] hover:bg-[#2563eb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563eb] transition duration-150 ease-in-out"
        >
          Sign In
        </button>
      </div>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-[#6b7280]">Or continue with</span>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={() => alert("Social login not implemented.")}
          className="cursor-pointer w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-[#6b7280] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#60a5fa] transition duration-150 ease-in-out"
        >
          <span className="sr-only">Sign in with Google</span>
          {GOOGLE_ICON_SVG}
          <span className="ml-2">Sign in with Google</span>
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-[#6b7280]">
        Do not have an account?{" "}
        <Link
          href="/auth/signup"
          className="font-medium text-[#3b82f6] hover:text-[#2563eb]"
        >
          Sign Up
        </Link>
      </p>

      {errMessage && <ErrorToast message={errMessage} />}
      {sucMessage && <SuccessToast message={sucMessage} />}
    </form>
  );
}
