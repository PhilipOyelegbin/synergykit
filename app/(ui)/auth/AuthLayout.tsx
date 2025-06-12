"use client";

import React from "react";
import { SYNERGY_LOGO_SVG } from "../../_components/constants";
import Link from "next/link";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <div className="min-h-[calc(100vh-128px)] flex flex-col items-center justify-center bg-gradient-to-br from-[#60a5fa] via-[#f9fafb] to-[#34d399] py-12 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Link
            className="mx-auto h-12 w-auto text-[#3b82f6] cursor-pointer flex items-center justify-center space-x-2"
            href="/"
            aria-label="Back to SynergyKit home"
          >
            {React.cloneElement(
              SYNERGY_LOGO_SVG as React.ReactElement<{ className?: string }>,
              { className: "h-10 w-auto text-[#3b82f6]" }
            )}
            <span className="font-bold text-3xl text-[#3b82f6]">
              SynergyKit
            </span>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#1f2937]">
            {title}
          </h2>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-2xl space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
