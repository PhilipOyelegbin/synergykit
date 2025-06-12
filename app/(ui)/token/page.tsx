"use client";

import React, { useState } from "react";
import { COPY_ICON_SVG } from "../../_components/constants";
import { Token } from "@/app/_helper";
import AppLayout from "../AppLayout";

function TokenPage() {
  const [token, setToken] = useState("");
  const [tokenLength, setTokenLength] = useState(32);
  const [copied, setCopied] = useState(false);

  const generateToken = (tokenLength: number) => {
    setToken(Token.generate(tokenLength));
  };

  const copyToClipboard = () => {
    if (token) {
      navigator.clipboard
        .writeText(token)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          alert(
            "Failed to copy token. Make sure you are on a secure connection (HTTPS) or localhost."
          );
        });
    }
  };

  return (
    <AppLayout title="Token Generator">
      <div className="space-y-6">
        <div>
          <label
            htmlFor="tokenLength"
            className="block text-sm font-medium text-[#1f2937]"
          >
            Token Length:{" "}
            <span className="font-semibold text-[#3b82f6]">{tokenLength}</span>
          </label>
          <input
            type="range"
            id="tokenLength"
            name="tokenLength"
            min="8"
            max="128"
            step="1"
            value={tokenLength}
            onChange={(e) => setTokenLength(parseInt(e.target.value, 10))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3b82f6] mt-2"
            aria-label="Token length slider"
          />
        </div>

        <button
          onClick={() => generateToken(tokenLength)}
          className="w-full bg-[#3b82f6] text-white px-6 py-3 rounded-md hover:bg-[#2563eb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563eb] transition duration-150 ease-in-out font-medium text-lg"
        >
          Generate Token
        </button>

        {token && (
          <div className="space-y-2 pt-4">
            <label
              htmlFor="generatedToken"
              className="block text-sm font-medium text-[#1f2937]"
            >
              Generated Token:
            </label>
            <div className="relative flex items-center">
              <input
                id="generatedToken"
                type="text"
                readOnly
                value={token}
                className="w-full p-3 pr-12 bg-[#f9fafb] border border-gray-300 rounded-md text-[#1f2937] focus:outline-none selection:bg-[#60a5fa] selection:text-white"
                aria-label="Generated Token"
                onFocus={(e) => e.target.select()}
              />
              <button
                onClick={copyToClipboard}
                title={copied ? "Copied!" : "Copy to clipboard"}
                className={`absolute inset-y-0 right-0 px-4 flex items-center transition-colors duration-150 ease-in-out rounded-r-md
                            ${
                              copied
                                ? "bg-[#10b981] text-white"
                                : "bg-gray-200 text-[#1f2937] hover:bg-gray-300 focus:bg-gray-300"
                            }`}
                aria-label={
                  copied
                    ? "Token copied to clipboard"
                    : "Copy token to clipboard"
                }
              >
                {copied ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                ) : (
                  React.cloneElement(
                    COPY_ICON_SVG as React.ReactElement<{ className?: string }>,
                    { className: "w-5 h-5" }
                  )
                )}
              </button>
            </div>
            {copied && (
              <p className="text-sm text-[#10b981] text-right mt-1">
                Copied to clipboard!
              </p>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default TokenPage;
