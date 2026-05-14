import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Twitter, Linkedin, Instagram, ArrowUpRight, MessageCircle, Share2, Heart, Youtube, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export function ActivityFeed() {
  const activities = [
    { 
      id: 1, 
      type: "published", 
      platform: "twitter", 
      icon: Twitter, 
      color: "text-sky-400", 
      content: "The future of SaaS isn't just about building software. It's about AI automated systems...",
      time: "2m ago",
      engagement: { likes: 142, retweets: 24, comments: 12 }
    },
    { 
      id: 2, 
      type: "viral_alert", 
      platform: "linkedin", 
      icon: Linkedin, 
      color: "text-blue-500", 
      content: "Your post '10 Principles of High-Converting Landing Pages' is gaining massive traction.",
      time: "45m ago",
      alert: true
    },
    { 
      id: 3, 
      type: "scheduled", 
      platform: "instagram", 
      icon: Instagram, 
      color: "text-fuchsia-500", 
      content: "Neon Aesthetics UI Kit - Carousel (5 slides)",
      time: "Scheduled for 14:00 PM"
    },
    { 
      id: 4, 
      type: "published", 
      platform: "youtube", 
      icon: Youtube, 
      color: "text-red-500", 
      content: "Building ViralForge AI in 24 Hours (Full Walkthrough)",
      time: "3h ago",
      engagement: { views: "4.2K", likes: 890, comments: 142 }
    }
  ];

  return (
    <Card className="bg-black/40 border-white/5 h-full">
      <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
        <CardTitle className="text-lg">Recent Omni-Activity</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 text-xs text-neutral-400">Filter</Button>
      </CardHeader>
      <CardContent className="pt-4 space-y-5">
        {activities.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="relative flex flex-col items-center">
              <div className={cn("h-8 w-8 rounded-full flex items-center justify-center border border-white/10 bg-black/50 z-10", item.alert ? "bg-emerald-500/20 border-emerald-500/40" : "")}>
                <item.icon className={cn("h-4 w-4", item.color, item.alert && "text-emerald-400")} />
              </div>
              <div className="w-px h-full bg-white/5 absolute top-8" />
            </div>
            
            <div className="flex-1 pb-4">
              <div className="flex justify-between items-start mb-1">
                <span className={cn("text-xs font-medium uppercase tracking-wider", item.alert ? "text-emerald-400" : "text-neutral-500")}>
                  {item.type === 'viral_alert' ? 'Viral Alert' : item.type}
                </span>
                <span className="text-xs text-neutral-500">{item.time}</span>
              </div>
              
              <p className="text-sm text-neutral-300 mb-2 leading-relaxed">
                {item.content}
              </p>
              
              {item.engagement && (
                <div className="flex items-center gap-4 mt-2">
                  {item.engagement.views && (
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-300 cursor-pointer">
                      <Activity className="h-3.5 w-3.5" /> {item.engagement.views}
                    </div>
                  )}
                  {item.engagement.likes && (
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-pink-400 cursor-pointer transition-colors">
                      <Heart className="h-3.5 w-3.5" /> {item.engagement.likes}
                    </div>
                  )}
                  {item.engagement.retweets && (
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-emerald-400 cursor-pointer transition-colors">
                      <Share2 className="h-3.5 w-3.5" /> {item.engagement.retweets}
                    </div>
                  )}
                  {item.engagement.comments && (
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-blue-400 cursor-pointer transition-colors">
                      <MessageCircle className="h-3.5 w-3.5" /> {item.engagement.comments}
                    </div>
                  )}
                  
                  <div className="ml-auto flex items-center gap-1 text-xs text-indigo-400 font-medium cursor-pointer hover:text-indigo-300">
                    View <ArrowUpRight className="h-3 w-3" />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
