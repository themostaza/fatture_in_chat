"use client";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";

const excluded = ["/", "/auth/login", "/auth/register"];

export function SidebarWrapper() {
  const pathname = usePathname();
  if (excluded.includes(pathname)) return null;
  return <Sidebar />;
} 