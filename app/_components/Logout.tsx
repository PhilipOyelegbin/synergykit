"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer bg-rose-400 text-white hover:bg-rose-600 px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
    >
      Logout
    </button>
  );
}
