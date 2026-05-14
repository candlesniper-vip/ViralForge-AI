import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { Activity } from "lucide-react";

export function HeatmapWidget() {
  // Mock data for the heatmap area chart
  const data = Array.from({ length: 24 }).map((_, i) => ({
    hour: `${i}:00`,
    engagement: Math.floor(Math.random() * 50) + (i > 10 && i < 15 ? 50 : 0) + (i > 18 && i < 22 ? 40 : 0)
  }));

  return (
    <Card className="bg-black/40 border-white/5 h-full flex flex-col items-center justify-center min-h-[300px]">
      <CardHeader className="w-full flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-indigo-400" />
          <CardTitle className="text-lg">Engagement Heatmap</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="w-full flex-1 pt-4 pb-0 px-0">
        <div className="h-full w-full min-h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', borderRadius: '8px' }}
                itemStyle={{ color: '#e5e5e5' }}
                labelStyle={{ color: '#737373', marginBottom: '4px' }}
                cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area 
                type="monotone" 
                dataKey="engagement" 
                stroke="#6366f1" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorEngagement)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between px-6 pb-4 text-xs text-neutral-500 font-mono mt-2">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>23:59</span>
        </div>
      </CardContent>
    </Card>
  );
}
