"use client";
import Link from "next/link";
import { useState } from "react";
import { UserSquare, ListChecks, User, LogOut, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase/client";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/auth/login");
  }

  return (
    <aside className={`bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between min-h-screen py-8 px-2 transition-all duration-200 ${collapsed ? 'w-16' : 'w-56'}`}>
      <div>
        <div className="flex items-center justify-between mb-6 px-1">
          {!collapsed && (
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">fatture in chat</span>
          )}
          <button
            className="flex items-center justify-center w-10 h-10 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? 'Espandi sidebar' : 'Collassa sidebar'}
          >
            {collapsed ? <ChevronsRight size={22} /> : <ChevronsLeft size={22} />}
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          <Link href="/clienti" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 font-medium transition-colors">
            <UserSquare size={22} />
            {!collapsed && <span>Clienti</span>}
          </Link>
          <Link href="/richieste" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 font-medium transition-colors">
            <ListChecks size={22} />
            {!collapsed && <span>Richieste</span>}
          </Link>
        </nav>
      </div>
      <div className="flex flex-col gap-2 mb-2">
        <Link href="/profilo" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 font-medium transition-colors">
          <User size={22} />
          {!collapsed && <span>Profilo</span>}
        </Link>
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900 font-medium transition-colors w-full text-left">
          <LogOut size={22} />
          {!collapsed && <span>Esci</span>}
        </button>
      </div>
    </aside>
  );
} 