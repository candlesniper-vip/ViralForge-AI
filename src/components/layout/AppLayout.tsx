import React from "react";
import { Sidebar } from "./Sidebar";
import { motion } from "motion/react";
import { Bell, Search } from "lucide-react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-[#050505] overflow-hidden text-neutral-200">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-200px] left-[-100px] w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[140px] pointer-events-none" />

      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0 z-10 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-black/20 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input 
                type="text" 
                placeholder="Search campaigns, analytics..." 
                className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-white placeholder-neutral-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-black" />
            </button>
            <div className="h-8 py-1 px-3 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold text-indigo-200 uppercase tracking-wider">System Online</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-8 py-8 custom-scrollbar">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
