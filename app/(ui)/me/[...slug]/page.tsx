"use client";

import { useEffect, useState } from "react";
import AppLayout from "../../AppLayout";
import { useParams } from "next/navigation";
import Link from "next/link";

function Page() {
  const token = useParams()?.slug?.[0];
  const [profileStatus, setProfileStatus] = useState(false);

  useEffect(() => {
    const fetchProfileStatus = async () => {
      const response = await fetch(`/api/verify`, {
        method: "POST",
        body: JSON.stringify({ token }),
      });
      if (!response.ok) {
        setProfileStatus(false);
      } else {
        setProfileStatus(true);
      }
    };

    fetchProfileStatus();
  }, [token]);

  return (
    <AppLayout title="">
      <section className="space-y-6">
        {!profileStatus && (
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full text-center border border-gray-200">
            <div className="mb-6">
              <svg
                className="mx-auto h-20 w-20 text-rose-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>

            <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Verification Failed!
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We were unable to verify your account. The code might be incorrect
              or expired. Please contact support.
            </p>

            <div className="flex flex-col md:flex-row justify-between gap-4">
              <Link
                href="/"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out"
              >
                Go Home
              </Link>
              <Link
                href="mailto: test@synergykit.com.ng"
                className="w-full flex justify-center py-3 px-4 border border-blue-600 rounded-lg shadow-sm text-lg font-semibold text-blue-600 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out"
              >
                Contact Support
              </Link>
            </div>
          </div>
        )}

        {profileStatus && (
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full text-center border border-gray-200">
            <div className="mb-6">
              <svg
                className="mx-auto h-20 w-20 text-lime-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>

            <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Account Verified!
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Congratulations! Your account has been successfully verified. You
              can now access all features.
            </p>

            <Link
              href="/note"
              className="w-full sm:w-fit mx-auto flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            >
              Go to Note
            </Link>
          </div>
        )}
      </section>
    </AppLayout>
  );
}

export default Page;
