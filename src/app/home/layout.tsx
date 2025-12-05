import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeTogglerButton } from "@/components/animate-ui/components/buttons/theme-toggler";
import ClientSidebar from "@/components/platform/sidebar/clientSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Agent Platform",
  description: "A platform to create and manage AI agents.",
  applicationName: "AI Agent Platform",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientSidebar>
          <ThemeTogglerButton className='absolute top-2 right-4 hover:cursor-pointer'  />
          {children}
        </ClientSidebar>
      </body>
    </html>
  );
}
