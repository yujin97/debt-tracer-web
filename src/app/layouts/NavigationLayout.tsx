export function NavigationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="sticky top-0 z-40 w-full">Navigation Bar</div>
      {children}
    </>
  );
}
