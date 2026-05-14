import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PLATFORMS, PlatformId } from "@/lib/platforms";
import { cn } from "@/lib/utils";
import { 
  ImageIcon, 
  Film, 
  Link2, 
  Smile, 
  Sparkles, 
  Send, 
  CalendarClock, 
  Save, 
  TrendingUp, 
  Hash, 
  Wand2,
  ListTodo
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function ComposerWindow() {
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformId[]>(['twitter', 'linkedin', 'instagram']);
  const [showMediaZone, setShowMediaZone] = useState(false);

  const togglePlatform = (id: PlatformId) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <Card className="border-indigo-500/30 shadow-[0_0_40px_-15px_rgba(79,70,229,0.3)] bg-gradient-to-b from-indigo-500/10 to-black/60 overflow-visible relative z-20">
      
      {/* Platform Strip */}
      <div className="px-4 py-3 border-b border-white/5 flex flex-wrap gap-2 items-center bg-black/40 rounded-t-2xl">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mr-2">Publish To:</span>
        {PLATFORMS.filter(p => ['twitter', 'linkedin', 'instagram', 'facebook', 'tiktok', 'youtube'].includes(p.id)).map(platform => {
          const isSelected = selectedPlatforms.includes(platform.id);
          return (
            <button
              key={platform.id}
              onClick={() => togglePlatform(platform.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border",
                isSelected 
                  ? "bg-white/10 border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]" 
                  : "bg-transparent border-transparent text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
              )}
            >
              <platform.icon className={cn("h-3.5 w-3.5", isSelected ? platform.color : "text-neutral-600")} />
              {platform.name}
            </button>
          );
        })}
        <Button variant="ghost" size="sm" className="h-7 text-xs ml-auto text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10">
          <ListTodo className="h-3 w-3 mr-1" /> View Queue
        </Button>
      </div>

      <CardContent className="p-0 flex flex-col">
        {/* Editor Area */}
        <div className="relative">
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-transparent p-6 text-xl text-white placeholder-neutral-500/70 border-none focus:ring-0 resize-none flex-1 min-h-[160px] custom-scrollbar leading-relaxed" 
            placeholder="What's happening across the universe?"
          />
          
          <AnimatePresence>
            {content.length > 5 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute right-4 top-4"
              >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-400/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold cursor-pointer shadow-[0_0_15px_rgba(52,211,153,0.15)] hover:bg-emerald-500/30 transition-colors backdrop-blur-md">
                  <TrendingUp className="h-3.5 w-3.5" /> 98% Viral Potential
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Media Zone (Toggleable) */}
        <AnimatePresence>
          {showMediaZone && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mx-6 mb-4 mt-2 border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center bg-black/40 hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="flex gap-4 mb-3">
                  <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center bg-black/60 group-hover:bg-white/10 transition-colors">
                    <ImageIcon className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center bg-black/60 group-hover:bg-white/10 transition-colors">
                    <Film className="h-5 w-5 text-fuchsia-400" />
                  </div>
                </div>
                <p className="text-sm font-medium text-white mb-1">Drag and drop media</p>
                <p className="text-xs text-neutral-500">Supports images, videos, carousel arrays, and custom thumbnails</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tools & Actions */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
            
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowMediaZone(!showMediaZone)}
                className={cn("text-neutral-400 hover:text-indigo-400 hover:bg-indigo-500/10", showMediaZone && "text-indigo-400 bg-indigo-500/10")}
              >
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-fuchsia-400 hover:bg-fuchsia-500/10"><Film className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-blue-400 hover:bg-blue-500/10"><Link2 className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-yellow-400 hover:bg-yellow-500/10"><Smile className="h-5 w-5" /></Button>
              
              <div className="w-px h-6 bg-white/10 mx-2 self-center" />
              
              <Button variant="glass" size="sm" className="gap-2 h-9 text-indigo-300">
                <Sparkles className="h-4 w-4" /> AI Enhance
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 h-9 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10">
                <Wand2 className="h-4 w-4" /> Auto-Hashtags
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-neutral-400 hover:text-white px-3">
                <Save className="h-4 w-4 md:mr-2" /> <span className="hidden md:inline">Save Draft</span>
              </Button>
              <Button variant="glass" className="px-4 border-indigo-500/30">
                <CalendarClock className="h-4 w-4 md:mr-2 text-indigo-400" /> <span className="hidden md:inline">Schedule</span>
              </Button>
              <Button variant="neon" className="px-6 shadow-[0_0_20px_rgba(79,70,229,0.5)]">
                <Send className="h-4 w-4 mr-2" /> Publish Everywhere
              </Button>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  );
}
