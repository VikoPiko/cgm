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
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col p-4 dark:bg-[#161616] bg-white">
            <header className="sticky top-0 text-white py-0 z-10">
              <Header />
            </header>
            <main className="flex flex-grow w-full justify-between font-inter ">
              {children}
            </main>

            {/* Disclaimer and information */}
            <div className="text-xs font-thin text-center dark:text-white text-black mt-8 mb-4 flex justify-center w-full">
              <div className="md:w-[1000px] w-[350px]">
                <p>
                  “CGM,” the CGM logo and the Octagon Symbol are trademarks of
                  CGM Bank, N.A. CGM Bank, N.A. is a wholly-owned subsidiary of
                  CGM Bank & Co.
                </p>
                <p>
                  "CGM Private Client" is the brand name for a banking and
                  investment product and service offering, requiring a CGM
                  Private Client Checking℠ account.
                </p>
                <p>
                  Investing involves market risk, including possible loss of
                  principal, and there is no guarantee that investment
                  objectives will be achieved. Past performance is not a
                  guarantee of future results.
                </p>
                <p>
                  CGM Wealth Management is a business of CGM Bank & Co., which
                  offers investment products and services through CGM Securities
                  LLC (CGMS), a registered broker-dealer and investment adviser,
                  member FINRA and SIPC. Insurance products are made available
                  through CGM Insurance Agency, Inc. (CIA), a licensed insurance
                  agency, doing business as CGM Insurance Agency Services, Inc.
                  in Florida. Certain custody and other services are provided by
                  CGM Bank, N.A. (CGB). CGMS, CIA, and CGB are affiliated
                  companies under the common control of CGM Bank & Co. Products
                  not available in all states.
                </p>
                <p>
                  Bank deposit accounts, such as checking and savings, may be
                  subject to approval. Deposit products and related services are
                  offered by CGM Bank, N.A. Member FDIC.
                </p>
                <p className="mt-4">
                  {[
                    { text: "About CGM", href: "/" },
                    { text: "Media Center", href: "/" },
                    { text: "Careers", href: "/" },
                    { text: "Site map", href: "/" },
                    { text: "Privacy & Security", href: "/" },
                    { text: "Terms of use", href: "/" },
                    { text: "Accessibility", href: "/" },
                    { text: "AdChoices", href: "/" },
                    { text: "Give feedback", href: "/feedback" },
                  ].map((link, index, arr) => (
                    <span key={link.text}>
                      <a
                        href={link.href}
                        className="dark:text-blue-300 text-blue-600 underline hover:dark:text-blue-400 hover:text-blue-800"
                      >
                        {link.text}
                      </a>
                      {index < arr.length - 1 && (
                        <span key={`separator-${index}`}> | </span>
                      )}
                    </span>
                  ))}
                </p>

                <p className="self-center text-xs font-thin -mb-[7px] pt-2 dark:text-white text-black">
                  &copy; CGM Bank 2025 | All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
