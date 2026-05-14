import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Calendar,
  Clock,
  Plus,
  Settings2,
  RotateCw,
  Globe,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Video,
  Image as ImageIcon,
} from "lucide-react";
import { PLATFORMS, PlatformId } from "@/lib/platforms";
import { cn } from "@/lib/utils";
import { ComposePostModal } from "@/components/ui/ComposePostModal";

export default function Scheduler() {
  const [activeFilters, setActiveFilters] = useState<PlatformId[]>([
    "twitter",
    "linkedin",
    "instagram",
    "youtube",
    "tiktok",
  ]);
  const [view, setView] = useState<"month" | "week" | "day">("week");
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const toggleFilter = (id: PlatformId) => {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const timeSlots = Array.from({ length: 12 }).map((_, i) => `${i + 8}:00`);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">
            Omni-Channel Scheduler
          </h1>
          <p className="text-neutral-400 text-sm">
            Campaign orchestration, auto-reposting, and AI timing.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-neutral-300">
            <Globe className="h-4 w-4" />
            <select className="bg-transparent focus:outline-none cursor-pointer">
              <option>PST (America/Los_Angeles)</option>
              <option>EST (America/New_York)</option>
              <option>UTC (Coordinated Universal Time)</option>
            </select>
          </div>
          <Button variant="outline" className="gap-2 text-neutral-300">
            <Settings2 className="h-4 w-4" /> Queue Settings
          </Button>
          <Button variant="neon" className="gap-2 shrink-0" onClick={() => setIsComposeOpen(true)}>
            <Plus className="h-4 w-4" />
            <span>New Campaign</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="xl:col-span-1 space-y-4">
          <Card className="bg-black/40 border-white/5">
            <CardHeader className="pb-3 border-b border-white/5 flex flex-row items-center justify-between">
              <CardTitle className="text-sm">Active Networks</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-2 h-[200px] overflow-y-auto custom-scrollbar">
              {PLATFORMS.map((platform) => {
                const isActive = activeFilters.includes(platform.id);
                return (
                  <div
                    key={platform.id}
                    onClick={() => toggleFilter(platform.id)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <div
                      className={cn(
                        "p-1.5 rounded-md border transition-all",
                        isActive
                          ? "bg-white/10 border-white/10"
                          : "bg-transparent border-transparent",
                      )}
                    >
                      <platform.icon
                        className={cn(
                          "h-4 w-4",
                          platform.color,
                          !isActive && "opacity-40 grayscale",
                        )}
                      />
                    </div>
                    <span
                      className={cn(
                        "text-sm",
                        isActive ? "text-white" : "text-neutral-500",
                      )}
                    >
                      {platform.name}
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-white/5">
            <CardHeader className="pb-3 border-b border-white/5">
              <CardTitle className="text-sm">Automation Hub</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white mb-1 flex items-center gap-2">
                    <RotateCw className="h-3.5 w-3.5 text-indigo-400" />{" "}
                    Evergreen Recycling
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-[200px]">
                    Automatically requeue high-performing posts after 30 days.
                  </p>
                </div>
                <label className="flex items-center cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-black/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-indigo-500 relative border border-white/10"></div>
                </label>
              </div>

              <div className="flex items-start justify-between pt-3 border-t border-white/5">
                <div>
                  <h4 className="text-sm font-medium text-white mb-1 flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-emerald-400" /> AI
                    Auto-Timing
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-[200px]">
                    Let ViralForge determine the best posting time per platform.
                  </p>
                </div>
                <label className="flex items-center cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-black/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-500 relative border border-white/10"></div>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Calendar View */}
        <div className="xl:col-span-3 space-y-4 flex flex-col h-full min-h-[600px]">
          {/* Calendar Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-black/40 border border-white/5 rounded-xl p-2 gap-4 shrink-0">
            <div className="flex items-center gap-2 px-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-neutral-400"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium text-white min-w-[120px] text-center">
                October 21 - 27, 2026
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-neutral-400"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-1 bg-black/50 p-1 rounded-lg border border-white/5">
              <Button
                onClick={() => setView("day")}
                variant={view === "day" ? "glass" : "ghost"}
                size="sm"
                className="h-7 text-xs px-3"
              >
                Day
              </Button>
              <Button
                onClick={() => setView("week")}
                variant={view === "week" ? "glass" : "ghost"}
                size="sm"
                className="h-7 text-xs px-3"
              >
                Week
              </Button>
              <Button
                onClick={() => setView("month")}
                variant={view === "month" ? "ghost" : "ghost"}
                size="sm"
                className="h-7 text-xs px-3 opacity-50 cursor-not-allowed"
              >
                Month
              </Button>
            </div>
          </div>

          {/* Calendar Grid (Week View Simulation) */}
          <Card className="flex-1 overflow-hidden flex flex-col bg-black/20 border-white/5 p-4">
            <div className="grid grid-cols-8 gap-2 mb-2 border-b border-white/5 pb-2">
              <div className="col-span-1"></div> {/* Time column header */}
              {days.map((day, idx) => (
                <div key={day} className="col-span-1 text-center">
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    {day}
                  </p>
                  <div
                    className={cn(
                      "inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mt-1",
                      idx === 2
                        ? "bg-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]"
                        : "text-white",
                    )}
                  >
                    {21 + idx}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar relative pr-2">
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className="grid grid-cols-8 gap-2 min-h-[100px] border-b border-white/5 last:border-0 group"
                >
                  <div className="col-span-1 text-xs text-neutral-500 font-mono text-right pr-4 pt-2">
                    {time}
                  </div>

                  {/* Grid columns for drag & drop zones */}
                  {days.map((day, dIdx) => (
                    <div
                      key={`${day}-${time}`}
                      className="col-span-1 border-l border-white/5 relative p-1 transition-colors hover:bg-white/5 border-dashed"
                      onClick={() => setIsComposeOpen(true)}
                    >
                      {/* Mock Post 1 */}
                      {day === "Tue" && time === "14:00" && (
                        <div 
                          className="absolute inset-1 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 border border-indigo-500/50 rounded-lg p-2 cursor-grab active:cursor-grabbing hover:border-indigo-400 transition-colors z-10 shadow-lg backdrop-blur-md flex flex-col overflow-hidden"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex justify-between items-start mb-1 shrink-0">
                            <div className="flex -space-x-1">
                              <div className="h-4 w-4 rounded bg-sky-500 flex items-center justify-center ring-1 ring-black">
                                {React.createElement(PLATFORMS[0].icon, {
                                  className: "h-2.5 w-2.5 text-white",
                                })}
                              </div>
                              <div className="h-4 w-4 rounded bg-blue-600 flex items-center justify-center ring-1 ring-black">
                                {React.createElement(PLATFORMS[2].icon, {
                                  className: "h-2.5 w-2.5 text-white",
                                })}
                              </div>
                            </div>
                            <MoreHorizontal className="h-3 w-3 text-indigo-300" />
                          </div>
                          <p className="text-[10px] font-medium text-white leading-tight line-clamp-2 mt-1 shrink-0">
                            SaaS Automation Guide
                          </p>
                          <div className="flex items-center gap-1 mt-auto text-[9px] text-indigo-300 font-medium">
                            <Video className="h-2.5 w-2.5" /> Video
                          </div>
                        </div>
                      )}

                      {/* Mock Post 2 */}
                      {day === "Thu" && time === "9:00" && (
                        <div 
                           className="absolute inset-1 bg-gradient-to-br from-fuchsia-500/20 to-pink-500/10 border border-fuchsia-500/50 rounded-lg p-2 cursor-grab active:cursor-grabbing hover:border-fuchsia-400 transition-colors z-10 shadow-lg backdrop-blur-md flex flex-col overflow-hidden"
                           onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex justify-between items-start mb-1 shrink-0">
                            <div className="flex -space-x-1">
                              <div className="h-4 w-4 rounded bg-fuchsia-500 flex items-center justify-center ring-1 ring-black">
                                {React.createElement(PLATFORMS[1].icon, {
                                  className: "h-2.5 w-2.5 text-white",
                                })}
                              </div>
                              <div className="h-4 w-4 rounded border border-neutral-700 bg-black flex items-center justify-center ring-1 ring-black">
                                {React.createElement(PLATFORMS[4].icon, {
                                  className: "h-2 w-2 text-white",
                                })}
                              </div>
                            </div>
                          </div>
                          <p className="text-[10px] font-medium text-white leading-tight line-clamp-2 mt-1 shrink-0">
                            Neon UI Kit Drop
                          </p>
                          <div className="flex items-center gap-1 mt-auto text-[9px] text-fuchsia-300 font-medium">
                            <ImageIcon className="h-2.5 w-2.5" /> Carousel
                          </div>
                        </div>
                      )}

                      {/* Add Button on Hover */}
                      <div className="absolute inset-0 m-2 border-2 border-dashed border-white/0 group-hover:border-white/10 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-all bg-black/20 z-0">
                        <Plus className="h-4 w-4 text-neutral-400" />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <ComposePostModal 
        isOpen={isComposeOpen} 
        onClose={() => setIsComposeOpen(false)} 
      />
    </div>
  );
}
