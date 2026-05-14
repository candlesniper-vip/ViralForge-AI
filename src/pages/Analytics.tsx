import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Download,
  Filter,
  TrendingUp,
  Sparkles,
  Activity,
  Eye,
  MousePointerClick,
  PlayCircle,
  BarChart3,
  Users,
  Share2,
  Save,
  MessageSquare,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const reachData = [
  { day: "Mon", Twitter: 4000, LinkedIn: 2400, Instagram: 2400, TikTok: 1400 },
  { day: "Tue", Twitter: 3000, LinkedIn: 1398, Instagram: 2210, TikTok: 2200 },
  { day: "Wed", Twitter: 2000, LinkedIn: 9800, Instagram: 2290, TikTok: 4000 },
  { day: "Thu", Twitter: 2780, LinkedIn: 3908, Instagram: 2000, TikTok: 4200 },
  { day: "Fri", Twitter: 1890, LinkedIn: 4800, Instagram: 2181, TikTok: 6000 },
  { day: "Sat", Twitter: 2390, LinkedIn: 3800, Instagram: 2500, TikTok: 8000 },
  { day: "Sun", Twitter: 3490, LinkedIn: 4300, Instagram: 2100, TikTok: 11000 },
];

const radarData = [
  { subject: "Engagement", A: 120, B: 110, fullMark: 150 },
  { subject: "Reach", A: 98, B: 130, fullMark: 150 },
  { subject: "Conversion", A: 86, B: 130, fullMark: 150 },
  { subject: "Retention", A: 99, B: 100, fullMark: 150 },
  { subject: "Virality", A: 85, B: 90, fullMark: 150 },
  { subject: "Shares", A: 65, B: 85, fullMark: 150 },
];

const bestContent = [
  {
    id: 1,
    title: "The future of SaaS isn't just software...",
    platform: "Twitter",
    views: "342K",
    engagement: "14.2%",
    score: 98,
  },
  {
    id: 2,
    title: "10 Principles of High-Converting Pages",
    platform: "LinkedIn",
    views: "128K",
    engagement: "8.5%",
    score: 92,
  },
  {
    id: 3,
    title: "Building ViralForge AI in 24 Hours",
    platform: "YouTube",
    views: "89K",
    engagement: "12.1%",
    score: 88,
  },
  {
    id: 4,
    title: "Neon Aesthetics UI Kit",
    platform: "Instagram",
    views: "45K",
    engagement: "6.2%",
    score: 75,
  },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">
            Deep Analytics Center
          </h1>
          <p className="text-neutral-400 text-sm">
            Enterprise cross-network performance & conversion tracking.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            className="bg-black/40 border border-white/10 rounded-lg p-2 text-sm text-neutral-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">This Quarter</option>
          </select>
          <Button variant="outline" className="gap-2 text-neutral-300">
            <Filter className="h-4 w-4" /> Filters
          </Button>
          <Button variant="glass" className="gap-2">
            <Download className="h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-black/40 p-5 border-white/5 hover:bg-black/60 transition-colors">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Eye className="h-5 w-5 text-indigo-400" />
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
              +12.5%
            </span>
          </div>
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Total Views
          </p>
          <h3 className="text-3xl font-bold text-white mt-1">2.4M</h3>
        </Card>

        <Card className="bg-black/40 p-5 border-white/5 hover:bg-black/60 transition-colors">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-fuchsia-500/10 rounded-lg">
              <Activity className="h-5 w-5 text-fuchsia-400" />
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
              +5.2%
            </span>
          </div>
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Avg. Engagement
          </p>
          <h3 className="text-3xl font-bold text-white mt-1">8.4%</h3>
        </Card>

        <Card className="bg-black/40 p-5 border-white/5 hover:bg-black/60 transition-colors">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <MousePointerClick className="h-5 w-5 text-emerald-400" />
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
              +18.1%
            </span>
          </div>
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Link CTR
          </p>
          <h3 className="text-3xl font-bold text-white mt-1">4.2%</h3>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-900/20 to-black/40 border-indigo-500/30 p-5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start mb-3 relative z-10">
            <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
              <Sparkles className="h-5 w-5 text-indigo-400" />
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
              +2.4%
            </span>
          </div>
          <p className="text-xs font-semibold text-indigo-300/80 uppercase tracking-wider relative z-10">
            AI Viral Score
          </p>
          <h3 className="text-3xl font-bold text-white mt-1 relative z-10 flex items-center gap-2">
            94{" "}
            <span className="text-sm font-medium text-neutral-500">/100</span>
          </h3>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Interaction Breakdown */}
        <Card className="bg-black/40 lg:col-span-1 border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Interaction Split</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400 flex items-center gap-2">
                  <Heart className="h-4 w-4 text-pink-400" /> Likes
                </span>
                <span className="text-white font-medium">842K</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-pink-400 w-[65%]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-blue-400" /> Comments
                </span>
                <span className="text-white font-medium">124K</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 w-[15%]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400 flex items-center gap-2">
                  <Share2 className="h-4 w-4 text-emerald-400" /> Shares
                </span>
                <span className="text-white font-medium">189K</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 w-[22%]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400 flex items-center gap-2">
                  <Save className="h-4 w-4 text-indigo-400" /> Saves
                </span>
                <span className="text-white font-medium">312K</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-400 w-[35%]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Global Reach Chart */}
        <Card className="bg-black/40 lg:col-span-3 border-white/5">
          <CardHeader>
            <CardTitle className="text-lg">
              Omni-Channel Audience Growth
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={reachData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorTwitter" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorLinkedIn"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorInstagram"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#d946ef" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorTikTok" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  stroke="#525252"
                  tick={{ fill: "#737373", fontSize: 12 }}
                  dy={10}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#525252"
                  tick={{ fill: "#737373", fontSize: 12 }}
                  dx={-10}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(10, 10, 10, 0.8)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                  }}
                  itemStyle={{ color: "#e5e5e5" }}
                />
                <Area
                  type="monotone"
                  dataKey="Twitter"
                  stackId="1"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorTwitter)"
                />
                <Area
                  type="monotone"
                  dataKey="LinkedIn"
                  stackId="1"
                  stroke="#818cf8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorLinkedIn)"
                />
                <Area
                  type="monotone"
                  dataKey="Instagram"
                  stackId="1"
                  stroke="#d946ef"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorInstagram)"
                />
                <Area
                  type="monotone"
                  dataKey="TikTok"
                  stackId="1"
                  stroke="#34d399"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorTikTok)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-black/40 border-white/5 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg">Top Performing Content</CardTitle>
            <Button variant="ghost" size="sm" className="text-indigo-400">
              View All
            </Button>
          </CardHeader>
          <CardContent className="px-0 pt-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-neutral-500 uppercase bg-black/40 border-y border-white/5">
                  <tr>
                    <th className="px-6 py-3 font-medium">Post Title</th>
                    <th className="px-6 py-3 font-medium text-center">
                      Platform
                    </th>
                    <th className="px-6 py-3 font-medium text-right">Views</th>
                    <th className="px-6 py-3 font-medium text-right">
                      Engagement
                    </th>
                    <th className="px-6 py-3 font-medium text-center">
                      AI Score
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {bestContent.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-white/5 transition-colors group"
                    >
                      <td className="px-6 py-4 font-medium text-neutral-200 truncate max-w-[200px]">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-2 py-1 bg-white/5 rounded text-xs text-neutral-400">
                          {item.platform}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-emerald-400 font-mono">
                        {item.views}
                      </td>
                      <td className="px-6 py-4 text-right text-neutral-300 font-mono">
                        {item.engagement}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 font-bold text-xs ring-2 ring-transparent group-hover:ring-indigo-500/20 transition-all">
                          {item.score}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="bg-gradient-to-b from-indigo-900/20 to-black/40 border-indigo-500/20 flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-400" /> AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            <div className="p-3 rounded-lg bg-black/40 border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <PlayCircle className="h-4 w-4 text-red-400" />
                <h4 className="text-sm font-semibold text-white">
                  Video Retention Drop
                </h4>
              </div>
              <p className="text-xs text-neutral-400">
                YouTube Shorts are experiencing a 40% drop-off at second 3. AI
                recommends tighter hooks and removing silent intro frames.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <h4 className="text-sm font-semibold text-white">
                  LinkedIn Peak Coming
                </h4>
              </div>
              <p className="text-xs text-neutral-400">
                Based on audience activity, your next B2B post should go live
                tomorrow at 08:30 AM EST for maximum reach.
              </p>
            </div>

            <Button variant="neon" className="w-full mt-auto">
              Apply AI Recommendations
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
