import FeatureCard from "./FeatureCard";
import { TOKEN_ICON_SVG, NOTE_ICON_SVG } from "./constants";

export default function Feature() {
  const features = [
    {
      icon: TOKEN_ICON_SVG,
      path: "/token",
      title: "Secure Token Generator",
      description:
        "Effortlessly create strong, secure tokens for your applications and services. Customizable, reliable, and built for modern security needs.",
    },
    {
      icon: NOTE_ICON_SVG,
      path: "/notes",
      title: "Intuitive Note Application",
      description:
        "Capture, organize, and access your thoughts and ideas with a beautifully simple note-taking experience. Sync across devices and stay productive.",
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-[#3b82f6] tracking-wide uppercase">
            Our Core Utilities
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[#1f2937] sm:text-4xl">
            Everything You Need, All in One Place
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <FeatureCard
                icon={feature.icon}
                path={feature.path}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
