import CTA from "./_components/CTA";
import Feature from "./_components/Feature";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f9fafb] text-[#1f2937]">
      <main className="flex-grow">
        <Hero />
        <Feature />
        <CTA />
      </main>
    </div>
  );
}
