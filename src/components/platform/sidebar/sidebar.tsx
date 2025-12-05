"use client";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "../../animate-ui/components/radix/sidebar";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../animate-ui/components/radix/dropdown-menu";
import {
  ChevronRight,
  ChevronsUpDown,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  SidebarData,
  SidebarNavGroupData,
  SidebarNavItemData,
  SidebarSectionData,
  SidebarTeam,
  validateSidebarType,
} from "./types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/animate-ui/primitives/radix/collapsible";
import Link from "next/link";

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

  function renderSidebarContentItem(
    item: SidebarNavItemData | SidebarNavGroupData | SidebarSectionData,
    index: number,
    isSubItem: boolean = false
  ): React.ReactNode {
    if (validateSidebarType(item, "section")) {
      // Formata e retorna seção

      return (
        <SidebarGroupLabel key={`${item.title}_${index}`}>
          {item.icon !== undefined && (item.icon as React.ReactNode)}
          {item.title}
        </SidebarGroupLabel>
      );
    }

    if (validateSidebarType(item, "group")) {
      // Formata e retorna grupo
      const groupItem = item as SidebarNavGroupData;
      return (
        <Collapsible
          key={`${groupItem.title}_${index}`}
          asChild
          defaultOpen={groupItem.isActive}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={groupItem.title}>
                {groupItem.icon !== undefined &&
                  (groupItem.icon as React.ReactNode)}
                {groupItem.title}
                <ChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {groupItem.items.map((subItem, subIndex) =>
                  renderSidebarContentItem(subItem, subIndex)
                )}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    }

    if (validateSidebarType(item, "item")) {
      // Formata e retorna item
      const navItem = item as SidebarNavItemData;

      if (isSubItem) {
        return (
          <SidebarMenuSubItem key={`${navItem.title}_${index}`}>
            <SidebarMenuSubButton asChild>
              <Link href={navItem.url}>
                <span>{navItem.title}</span>
              </Link>
            </SidebarMenuSubButton>
            {navItem.menuButtons !== undefined &&
              navItem.menuButtons.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                      <MoreHorizontal />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-48 rounded-lg"
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                  >
                    {navItem.menuButtons!.map((menuButton, menuIndex) => {
                      if (menuButton.hasSeparator) {
                        return (
                          <React.Fragment
                            key={`${menuButton.title}_separator_${menuIndex}`}
                          >
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              key={`${menuButton.title}_${menuIndex}`}
                              onClick={menuButton.onClick}
                            >
                              {menuButton.icon !== undefined &&
                                (menuButton.icon as React.ReactNode)}
                              {menuButton.title}
                            </DropdownMenuItem>
                          </React.Fragment>
                        );
                      }

                      return (
                        <DropdownMenuItem
                          key={`${menuButton.title}_${menuIndex}`}
                          onClick={menuButton.onClick}
                        >
                          {menuButton.icon !== undefined &&
                            (menuButton.icon as React.ReactNode)}
                          {menuButton.title}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
          </SidebarMenuSubItem>
        );
      }

      return (
        <SidebarMenuItem key={`${navItem.title}_${index}`}>
          <SidebarMenuButton asChild>
            <Link href={navItem.url}>
              {navItem.icon !== undefined && (navItem.icon as React.ReactNode)}
              <span>{navItem.title}</span>
            </Link>
          </SidebarMenuButton>
          {navItem.menuButtons !== undefined &&
            navItem.menuButtons.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  {navItem.menuButtons!.map((menuButton, menuIndex) => {
                    if (menuButton.hasSeparator) {
                      return (
                        <React.Fragment
                          key={`${menuButton.title}_separator_${menuIndex}`}
                        >
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            key={`${menuButton.title}_${menuIndex}`}
                            onClick={menuButton.onClick}
                          >
                            {menuButton.icon !== undefined &&
                              (menuButton.icon as React.ReactNode)}
                            {menuButton.title}
                          </DropdownMenuItem>
                        </React.Fragment>
                      );
                    }

                    return (
                      <DropdownMenuItem
                        key={`${menuButton.title}_${menuIndex}`}
                        onClick={menuButton.onClick}
                      >
                        {menuButton.icon !== undefined &&
                          (menuButton.icon as React.ReactNode)}
                        {menuButton.title}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
        </SidebarMenuItem>
      );
    }

    return <></>;
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
                {header.titleIcon !== undefined &&
                  (header.titleIcon as React.ReactNode)}
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
          {content.map((item, index) => renderSidebarContentItem(item, index))}
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <SidebarTrigger className="-ml-1" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
