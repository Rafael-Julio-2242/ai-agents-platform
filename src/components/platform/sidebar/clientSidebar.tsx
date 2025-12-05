"use client";

import { Bot } from "lucide-react";
import {
  SidebarData,
  SidebarFooterData,
  SidebarHeaderData,
  SidebarNavGroupData,
  SidebarSectionData,
} from "./types";
import AppSidebar from "./sidebar";

interface ClientSidebarProps {
  children?: React.ReactNode;
  className?: string;
}

export default function ClientSidebar({
  children,
  className,
}: ClientSidebarProps) {
  const sidebarHeaderData: SidebarHeaderData = {
    teams: [
      {
        name: "Development",
        isActive: true,
      },
    ],
  };

  const sidebarFooterData: SidebarFooterData = {
    user: {
      name: "Rafael Julio",
      email: "rafael.julio@example.com",
    },
  };

  const agentSection: SidebarSectionData = {
    title: "Agents",
  };

  const manageAgentsGroup: SidebarNavGroupData = {
    title: "Manage Agents",
    url: "#",
    icon: <Bot />,
    items: [
      {
        title: "View Agents",
        url: "#",
        menuButtons: [
          { title: "Test 1" },
          {
            title: "Test 2",
            onClick: () => {
              alert("Test 2 clicked");
            },
          },
          { title: "Test 3", hasSeparator: true },
        ],
      },
      {
        title: "Create Agent",
        url: "#",
      },
    ],
    isActive: false,
  };

  const sidebarData: SidebarData = {
    header: sidebarHeaderData,
    footer: sidebarFooterData,
    content: [agentSection, manageAgentsGroup],
  };

  return (
    <AppSidebar sidebarData={sidebarData} className={className}>
      {children}
    </AppSidebar>
  );
}
