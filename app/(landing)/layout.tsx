const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full w-full">{children}</div>
    </main>
  );
};
export default LandingLayout;
