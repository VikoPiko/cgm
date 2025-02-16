import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 text-white py-0 z-10">
              <Header />
            </header>
            <main className="flex flex-grow w-full justify-between font-inter ">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
