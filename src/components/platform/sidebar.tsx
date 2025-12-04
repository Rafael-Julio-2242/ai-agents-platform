"use client";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "../animate-ui/components/radix/sidebar";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../animate-ui/components/radix/dropdown-menu";
import type { LucideIcon } from "lucide-react";
import { ChevronsUpDown, Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type SidebarTeam = {
  name: string;
  isActive: boolean;
  avatar?: React.ReactNode;
};

export interface SidebarNavItemData {
  title: string;
  url: string;
  icon?: LucideIcon | React.ReactNode;
  menuButtons?: {
    title: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    hasSeparator?: boolean;
  }[];
}

export interface SidebarNavGroupData {
  title: string;
  url: string;
  isActive: boolean;
  items: SidebarNavItemData[];
  icon?: LucideIcon | React.ReactNode;
}

export interface SidebarSectionData {
  title: string;
  icon?: LucideIcon | React.ReactNode;
}

export interface SidebarHeaderData {
  title?: string;
  titleClassName?: string;
  titleIcon?: LucideIcon | React.ReactNode;
  teams?: SidebarTeam[];
}

export interface SidebarFooterData {
  user: {
    name: string;
    email: string;
    avatar_url?: string;
  };
}

export interface SidebarData {
  header: SidebarHeaderData;
  footer: SidebarFooterData;
  content: (SidebarSectionData | SidebarNavGroupData | SidebarNavItemData)[];
}

export interface SidebarProps {
  sidebarData: SidebarData;
  className?: string;
  children?: React.ReactNode;
}

export default function AppSidebar({
  sidebarData,
  className,
  children,
}: SidebarProps) {
  const isMobile = useIsMobile();
  const { header, footer, content } = sidebarData;

  const [selectedTeam, setSelectedTeam] = useState<SidebarTeam>();

  if (header.teams && header.teams.length > 0 && !selectedTeam) {
    setSelectedTeam(
      header.teams.find((team) => team.isActive) || header.teams[0]
    );
  }

  function renderSidebarContentItem(item: SidebarNavItemData | SidebarNavGroupData | SidebarSectionData, index: number) {

  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="flex flex-col gap-2">
          {header.title && (
            <SidebarMenu
              className={cn(
                "text-xl font-bold text-black dark:text-white flex justify-between",
                header.titleClassName || ""
              )}
            >
              <SidebarMenuItem>
                {header.titleIcon as React.ReactNode}
                {header.title}
              </SidebarMenuItem>
            </SidebarMenu>
          )}
          {header.teams && header.teams.length > 0 && selectedTeam && (
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        {selectedTeam.avatar || selectedTeam.name.charAt(0)}
                      </div>

                      <span className="truncate font-semibold">
                        {selectedTeam.name}
                      </span>
                      <ChevronsUpDown className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    align="start"
                    side={isMobile ? "bottom" : "right"}
                    sideOffset={4}
                  >
                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                      Teams
                    </DropdownMenuLabel>
                    {header.teams &&
                      header.teams.length > 0 &&
                      header.teams.map((team, index) => (
                        <DropdownMenuItem
                          key={`${team.name}_${index}`}
                          onClick={() => setSelectedTeam(team)}
                          className="gap-2 p-2"
                        >
                          <div className="flex size-6 items-center justify-center rounded-sm border">
                            {team.avatar || team.name.charAt(0)}
                          </div>
                          {team.name}
                        </DropdownMenuItem>
                      ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 p-2">
                      <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                        <Plus className="size-4" />
                      </div>
                      <div className="font-medium text-muted-foreground">
                        Add team
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          )}
        </SidebarHeader>
        <SidebarContent>
          {}

        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <SidebarTrigger className="-ml-1" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
