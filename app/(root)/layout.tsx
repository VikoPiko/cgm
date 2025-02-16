// import MainHeader from "@/components/MainHeader";

// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return <main className="flex h-screen w-full font-inter">{children}</main>;
// }
import ClientSideUserFetcher from "@/components/ClientSideUserFetcher";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex h-screen w-full font-inter">
            <Sidebar />
            <div className="flex size-full flex-col">{children}</div>
            <ClientSideUserFetcher />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
