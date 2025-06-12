"use client";

import { useState } from "react";
import { SYNERGY_LOGO_SVG } from "./constants";
import Link from "next/link";

const navItems = [
  {
    label: "Features",
    href: "/#features",
  },
  {
    label: "Token Generator",
    href: "/token",
  },
  {
    label: "Notes",
    href: "/notes",
  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex-shrink-0 flex items-center space-x-2"
            >
              {SYNERGY_LOGO_SVG}
              <span className="font-bold text-xl text-[#3b82f6]">
                SynergyKit
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="text-[#6b7280] hover:text-[#2563eb] px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/auth/login"
                className="ml-4 bg-[#3b82f6] text-white hover:bg-[#2563eb] px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="bg-[#60a5fa] inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#3b82f6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#2563eb] focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="text-[#6b7280] hover:bg-[#60a5fa] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <Link
                href="/auth/login"
                className="w-full bg-[#3b82f6] text-white hover:bg-[#2563eb] px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
