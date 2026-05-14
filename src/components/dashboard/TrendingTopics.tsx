import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Flame, TrendingUp, Sparkles, ArrowRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function TrendingTopics() {
  const topics = [
    { rank: 1, name: "AI OS Architectures", volume: "124K posts", score: 98, trend: "up", tags: ["tech", "ai", "saas"] },
    { rank: 2, name: "Neon Glassmorphism", volume: "89K posts", score: 92, trend: "up", tags: ["design", "ui", "webdev"] },
    { rank: 3, name: "Solo Founders 2026", volume: "56K posts", score: 85, trend: "up", tags: ["startup", "business"] },
    { rank: 4, name: "DeepSeek vs Gemini", volume: "210K posts", score: 99, trend: "hot", tags: ["ai", "tech", "news"] },
    { rank: 5, name: "Agentic Engineering", volume: "45K posts", score: 88, trend: "up", tags: ["engineering", "ai"] },
  ];

  return (
    <Card className="bg-black/40 border-white/5 h-full">
      <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-400" />
          <CardTitle className="text-lg">Trending Signals</CardTitle>
        </div>
        <Button variant="ghost" size="sm" className="h-8 text-xs text-indigo-400">View All</Button>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        {topics.map((topic, index) => (
          <div key={index} className="flex items-start justify-between group cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors -mx-2">
            <div className="flex gap-3">
              <div className="w-6 flex justify-center mt-0.5">
                <span className="text-sm font-bold text-neutral-500 group-hover:text-white transition-colors">#{topic.rank}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-200 group-hover:text-indigo-300 transition-colors">{topic.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-neutral-500">{topic.volume}</span>
                  <div className="h-1 w-1 rounded-full bg-white/20" />
                  <div className="flex gap-1">
                    {topic.tags.map(tag => (
                      <span key={tag} className="text-[9px] uppercase tracking-wider text-neutral-500 font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              {topic.trend === 'hot' ? (
                <div className="flex items-center gap-1 text-orange-400 bg-orange-400/10 px-1.5 rounded text-xs">
                  <Flame className="h-3 w-3" /> Hot
                </div>
              ) : (
                <div className="flex items-center gap-1 text-emerald-400 text-xs">
                  <TrendingUp className="h-3 w-3" />
                </div>
              )}
              <span className="text-xs font-medium text-neutral-400">Score {topic.score}</span>
            </div>
          </div>
        ))}

        <div className="pt-4 mt-2 border-t border-white/5">
          <div className="bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10 border border-indigo-500/20 p-3 rounded-xl">
             <div className="flex items-center gap-2 text-sm font-medium text-indigo-300 mb-1">
               <Sparkles className="h-4 w-4" /> AI Suggestion
             </div>
             <p className="text-xs text-neutral-400 mb-2 leading-relaxed">
               Merging "Neon Glassmorphism" with your recent "AI OS" posts has a 94% predicted conversion rate for your design audience.
             </p>
             <Button variant="ghost" size="sm" className="h-7 text-xs w-full bg-white/5 hover:bg-white/10 text-white">
               Generate Draft <ArrowRight className="h-3 w-3 ml-1" />
             </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
