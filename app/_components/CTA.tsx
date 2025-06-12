import Link from "next/link";

export default function CTA() {
  return (
    <section id="cta" className="bg-[#1f2937]">
      <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Ready to elevate your productivity?</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-blue-100">
          Join SynergyKit today and experience the power of integrated
          utilities. It is free to get started!
        </p>
        <Link
          href="/auth/signup"
          className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-[#3b82f6] bg-white hover:bg-gray-100 sm:w-auto transition duration-150 ease-in-out transform hover:scale-105"
        >
          Sign Up for Free
        </Link>
      </div>
    </section>
  );
}
