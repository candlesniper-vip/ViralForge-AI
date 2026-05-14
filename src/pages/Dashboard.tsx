import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Activity, Users, TrendingUp, Sparkles, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PLATFORMS, PlatformId } from "@/lib/platforms";
import { PlatformSettingsModal } from "@/components/ui/PlatformSettingsModal";
import { ComposerWindow } from "@/components/dashboard/ComposerWindow";
import { TrendingTopics } from "@/components/dashboard/TrendingTopics";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { HeatmapWidget } from "@/components/dashboard/HeatmapWidget";
import { Link } from "react-router";

const stats = [
  { label: "Total Reach", value: "8.4M", change: "+44.5%", icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
  { label: "AI Engagement Shift", value: "14.2%", change: "+5.1%", icon: Activity, color: "text-emerald-400", bg: "bg-emerald-400/10" },
  { label: "Cross-platform Posts", value: "3,442", change: "+124%", icon: Sparkles, color: "text-indigo-400", bg: "bg-indigo-400/10" },
  { label: "Viral Prediction Acc.", value: "97%", change: "+2.0%", icon: TrendingUp, color: "text-pink-400", bg: "bg-pink-400/10" },
];

export default function Dashboard() {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId | null>(null);

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-10">
      
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-white mb-2">Omni-Channel Command</h1>
          <p className="text-neutral-400">Global posting engine active. All systems optimal.</p>
        </div>
      </div>

      {/* Main Composer Section - Takes full width prominence */}
      <ComposerWindow />

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-0 border-white/5 bg-black/40 hover:bg-black/60 transition-colors">
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <span className="text-xs font-bold px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full">
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Dashboard Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {/* Left Column (Activities & Charts) */}
        <div className="lg:col-span-2 xl:col-span-2 space-y-6">
          <ActivityFeed />
          <HeatmapWidget />
        </div>

        {/* Right Column (Trending & Platforms) */}
        <div className="lg:col-span-1 xl:col-span-2 space-y-6 grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
          <TrendingTopics />

          <Card className="flex flex-col bg-black/40 border-white/5 h-full max-h-[600px]">
            <CardHeader className="shrink-0 flex flex-row items-center justify-between border-b border-white/5 pb-4">
              <CardTitle className="text-lg">Connected Networks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 relative flex-1 overflow-y-auto custom-scrollbar pt-4">
              {PLATFORMS.map((platform) => (
                <div key={platform.id} className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 bg-white/5 border border-white/10 rounded-lg ${platform.color}`}>
                      <platform.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{platform.name}</p>
                      <p className="text-xs text-neutral-400">@{platform.id === 'facebook' || platform.id === 'linkedin' ? 'viralforge' : 'viralforge_' + platform.id.substring(0,3)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setSelectedPlatform(platform.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-white/10 rounded-md transition-all text-neutral-400 hover:text-white"
                      title="Optimization Settings"
                    >
                      <Settings className="h-4 w-4" />
                    </button>
                    <div title="Connected & Secure" className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  </div>
                </div>
              ))}
            </CardContent>
            <div className="p-4 pt-4 border-t border-white/5 shrink-0">
              <Link to="/connections">
                <Button variant="outline" className="w-full border-dashed border-white/20 hover:border-white/50 text-neutral-400 hover:text-white">
                    <Plus className="h-4 w-4 mr-2" /> Connect Integration
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {selectedPlatform && (
        <PlatformSettingsModal 
          platformId={selectedPlatform} 
          isOpen={!!selectedPlatform} 
          onClose={() => setSelectedPlatform(null)} 
        />
      )}
    </div>
  );
}
