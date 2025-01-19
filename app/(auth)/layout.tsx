import Header from "@/components/Header"; // Adjust the path if needed

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Include the header at the top */}
      <header className="sticky top-0 bg-indigoDye text-white py-2 z-10">
        <Header />
      </header>
      {/* Main content area */}
      <main className="flex flex-grow w-full justify-between font-inter ">
        {children}
      </main>
    </div>
  );
}
