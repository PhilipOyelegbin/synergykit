import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-[#3b82f6] to-[#34d399] text-white animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          <span className="block">Empower Your Workflow with</span>
          <span className="block text-yellow-300 mt-2">
            SynergyKit Utilities
          </span>
        </h1>
        <p className="mt-6 max-w-lg mx-auto text-lg sm:text-xl md:text-2xl text-blue-100">
          Seamlessly generate secure tokens and organize your thoughts with our
          intuitive note-taking application. All in one powerful suite.
        </p>
        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            href="/auth/signup"
            className="w-full block sm:w-auto bg-white text-[#2563eb] hover:bg-gray-100 px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-md transition duration-150 ease-in-out transform hover:scale-105"
          >
            Get Started Free
          </Link>
          <Link
            href="#features"
            className="w-full block sm:w-auto items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#2563eb] hover:bg-[#3b82f6] transition duration-150 ease-in-out transform hover:scale-105"
          >
            Explore Features
          </Link>
        </div>
      </div>
    </section>
  );
}
