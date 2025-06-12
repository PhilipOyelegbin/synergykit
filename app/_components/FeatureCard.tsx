import Link from "next/link";
import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  path: string;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  path,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="bg-[#f9fafb] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out h-full flex flex-col">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#60a5fa] text-white mx-auto mb-4">
          {/* The icon SVG already has its own color, so we just render it */}
          {/* Modified cast to be more specific to allow className prop */}
          {React.cloneElement(
            icon as React.ReactElement<{ className?: string }>,
            { className: "w-8 h-8 text-white" }
          )}
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold text-[#1f2937]">{title}</h3>
        <p className="mt-2 text-base text-[#6b7280]">{description}</p>
      </div>
      <div className="mt-auto pt-4">
        <Link
          href={path}
          className="text-sm font-semibold text-[#3b82f6] hover:text-[#2563eb] transition-colors duration-200"
        >
          Learn more &rarr;
        </Link>
      </div>
    </div>
  );
}
