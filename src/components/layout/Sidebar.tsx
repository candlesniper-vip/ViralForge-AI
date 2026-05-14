import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Sparkles, CalendarDays, BarChart3, Settings, LogOut, Flame, Shield, MoreVertical, CreditCard, ShieldAlert, Globe, BadgeCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/contexts/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "AI Studio", href: "/studio", icon: Sparkles },
  { name: "Scheduler", href: "/scheduler", icon: CalendarDays },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Currently Contents", href: "/currently-contents", icon: Globe },
  { name: "Connections", href: "/connections", icon: Shield },
  { name: "Billing", href: "/billing", icon: CreditCard },
  { name: "Admin", href: "/admin", icon: ShieldAlert },
];

export function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { profile, logout } = useAuth();

  return (
    <motion.div 
      initial={false}
      animate={{ width: isCollapsed ? 88 : 256 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="flex h-screen flex-col border-r border-white/10 bg-black/60 backdrop-blur-2xl py-6 z-50 shrink-0 overflow-hidden"
    >
      <div className={cn("flex items-center px-4 mb-10", isCollapsed ? "justify-center" : "justify-between")}>
        {!isCollapsed ? (
          <>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                <Flame className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-display font-bold tracking-tight text-white whitespace-nowrap">ViralForge<span className="text-indigo-400">AI</span></span>
            </div>
            <button 
              onClick={() => setIsCollapsed(true)} 
              className="p-1 -mr-2 text-red-500 hover:text-red-400 transition-colors cursor-pointer"
              title="Collapse Sidebar"
            >
              <MoreVertical className="h-6 w-6" />
            </button>
          </>
        ) : (
          <button 
            onClick={() => setIsCollapsed(false)} 
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
            title="Expand Sidebar"
          >
            <MoreVertical className="h-6 w-6 text-red-500" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center rounded-lg py-2.5 text-sm font-medium transition-all relative overflow-hidden",
                isCollapsed ? "justify-center px-0" : "gap-3 px-3",
                isActive 
                  ? "text-white bg-white/10 shadow-[inset_0_1px_rgba(255,255,255,0.1)] border border-white/5" 
                  : "text-neutral-400 hover:bg-white/5 hover:text-white"
              )}
              title={isCollapsed ? item.name : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/10 pointer-events-none"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full" />}
              
              <item.icon className={cn("h-5 w-5 shrink-0 z-10", isActive ? "text-indigo-400" : "text-neutral-500 group-hover:text-neutral-300")} />
              
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span 
                    initial={{ opacity: 0, w: 0 }}
                    animate={{ opacity: 1, w: "auto" }}
                    exit={{ opacity: 0, w: 0 }}
                    className="z-10 whitespace-nowrap overflow-hidden block"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 space-y-1 px-4">
        <Link
          to="/settings"
          className={cn(
            "group flex items-center rounded-lg py-2.5 text-sm font-medium text-neutral-400 hover:bg-white/5 hover:text-white transition-colors",
             isCollapsed ? "justify-center px-0" : "gap-3 px-3"
          )}
          title={isCollapsed ? "Settings" : undefined}
        >
          <Settings className="h-5 w-5 shrink-0 text-neutral-500 group-hover:text-neutral-300" />
          {!isCollapsed && <span className="whitespace-nowrap">Settings</span>}
        </Link>
        <button 
          onClick={logout}
          className={cn(
            "w-full group flex items-center rounded-lg py-2.5 text-sm font-medium text-neutral-400 hover:bg-white/5 hover:text-red-400 transition-colors",
            isCollapsed ? "justify-center px-0" : "gap-3 px-3"
          )}
          title={isCollapsed ? "Log out" : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0 text-neutral-500 group-hover:text-red-400" />
          {!isCollapsed && <span className="whitespace-nowrap">Log out</span>}
        </button>
      </div>

      {/* User Profile Snippet */}
      <div className={cn("mt-6 flex items-center mx-4 rounded-xl border border-white/10 bg-white/5", isCollapsed ? "p-1 justify-center" : "p-3 gap-3")}>
        <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 p-[2px]">
          <div className="h-full w-full rounded-full bg-black/80 flex items-center justify-center backdrop-blur-md overflow-hidden">
            {profile?.photoURL ? (
              <img src={profile.photoURL} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
              <span className={cn("font-bold text-white", isCollapsed ? "text-xs" : "text-sm")}>
                {profile?.displayName?.charAt(0) || profile?.email?.charAt(0)?.toUpperCase() || "U"}
              </span>
            )}
          </div>
        </div>
        {!isCollapsed && (
          <>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-white">{profile?.displayName || profile?.email || "User"}</p>
              <p className="truncate text-xs text-neutral-500">Pro Plan</p>
            </div>
            <div className="shrink-0 pl-1" title="Verified Subscriber">
              <BadgeCheck className="h-5 w-5 text-blue-500 fill-blue-500/20" />
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
