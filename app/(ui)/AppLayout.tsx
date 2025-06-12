interface AppPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

function AppLayout({ title, children }: AppPageLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#1f2937] mb-6 sm:mb-8 text-center sm:text-left">
        {title}
      </h1>
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl">{children}</div>
    </div>
  );
}

export default AppLayout;
