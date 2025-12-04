"use client";

export interface SidebarNavItemData {
  title: string;
  url: string;
  icon?: React.ReactNode;
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
  icon?: React.ReactNode;
}

export interface SidebarSectionData {
  title: string;
  icon?: React.ReactNode;
}

export interface SidebarHeaderData {
  title: string;
  icon?: React.ReactNode;
  teams?: {
    name: string;
    avatar?: React.ReactNode;
    isActive: boolean;
  }[];
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

export default function Sidebar({ sidebarData, className, children }: SidebarProps) {

}
