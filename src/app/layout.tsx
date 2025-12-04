import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeTogglerButton } from "@/components/animate-ui/components/buttons/theme-toggler";
import AppSidebar, { SidebarData, SidebarFooterData, SidebarHeaderData, SidebarNavGroupData, SidebarSectionData } from "@/components/platform/sidebar";
import { Bot } from "lucide-react";

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
  authors: [{ name: "Rafal Julio", url: "" } ],

};

const sidebarHeaderData: SidebarHeaderData = {
  teams: [
    {
      name: "Development",
      isActive: true,
    }
  ]
}

const sidebarFooterData: SidebarFooterData = {
  user: {
    name: "Rafael Julio",
    email: "rafael.julio@example.com"
  }
}

const agentSection: SidebarSectionData = {
  title: "Agents",
}

const manageAgentsGroup: SidebarNavGroupData = {
  title: "Manage Agents",
  url: "#",
  icon: <Bot />,
  items: [
    {
      title: "View Agents",
      url: "#"
    },
    {
      title: "Create Agent",
      url: "#"
    }
  ],
  isActive: false
}


const sidebarData: SidebarData = {
  header: sidebarHeaderData,
  footer: sidebarFooterData,
  content: [
    agentSection,
    manageAgentsGroup
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppSidebar sidebarData={sidebarData} >
          <ThemeTogglerButton className='absolute top-2 right-4 hover:cursor-pointer'  />
          {children}
        </AppSidebar>
      </body>
    </html>
  );
}
