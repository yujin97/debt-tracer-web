export function NavigationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col items-stretch p-10">
      <div className="block h-12">Navigation Bar</div>
      {children}
    </div>
  );
}
