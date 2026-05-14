import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Sparkles, Wand2, Hash, Type, Target, Loader2, Gauge, Check, Send } from "lucide-react";
import { generateAIText } from "@/lib/gemini";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { PLATFORMS, PlatformId } from "@/lib/platforms";
import Markdown from "react-markdown";
import { ComposePostModal } from "@/components/ui/ComposePostModal";

export default function AIStudio() {
  const [topic, setTopic] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformId[]>(['twitter', 'instagram', 'linkedin']);
  const [loadingType, setLoadingType] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, string>>({});
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeContent, setComposeContent] = useState("");

  const togglePlatform = (id: PlatformId) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleGenerate = async (type: 'caption' | 'hook' | 'hashtags' | 'prediction') => {
    if (!topic || selectedPlatforms.length === 0) return;
    setLoadingType(type);
    
    try {
      const selectedPlatformObjs = PLATFORMS.filter(p => selectedPlatforms.includes(p.id));
      const platformNames = selectedPlatformObjs.map(p => p.name).join(", ");
      const platformSpecificRules = selectedPlatformObjs.map(p => {
        if (p.aiOptimizations && p.aiOptimizations.length > 0) {
          return `For ${p.name}, specifically focus on and provide: ${p.aiOptimizations.join(", ")}.`;
        }
        return '';
      }).filter(rule => rule !== '').join(' ');
      
      let prompt = "";
      let sys = `You are an elite social media manager and growth expert. Keep it concise, highly engaging, and tailored to the unique formatting, algorithmic rules, and media styles of the target platforms: ${platformNames}. Break down your response per platform. ${platformSpecificRules}`;
      
      switch(type) {
        case 'caption':
          prompt = `Write a viral, highly engaging social media caption about: "${topic}". Provide a separate optimized version for each of these platforms: ${platformNames}.`;
          break;
        case 'hook':
          prompt = `Generate 3 ultra-viral, scroll-stopping hooks (first sentences for video/post) about: "${topic}". Tailor the hooks specifically for each of these platforms: ${platformNames}.`;
          break;
        case 'hashtags':
          prompt = `Generate highly optimized, trending hashtags for a post about: "${topic}". Provide a distinct list of hashtags conforming to the limits and best practices for each of these platforms: ${platformNames}.`;
          break;
        case 'prediction':
          prompt = `Analyze the viral potential of a post about: "${topic}" across these platforms: ${platformNames}. Give a **viral potential score** out of 100 per platform, and a brief explanation why the algorithm will favor or punish it. **Use Markdown formatting:** Bullet points, bold texts for scores, etc. Format example: **[Platform]**: **[Score]/100** - [Reason].`;
          sys = "You are a predictive viral analytics AI with deep knowledge of social media algorithms.";
          break;
      }

      const res = await generateAIText(prompt, sys);
      setResults(prev => ({ ...prev, [type]: res }));
    } catch (err) {
      console.error(err);
      setResults(prev => ({ ...prev, [type]: "Error generating content. Please check your API key and connection." }));
    } finally {
      setLoadingType(null);
    }
  };

  const handlePublishClick = (content?: string) => {
    // Basic markdown strip for passing to compose modal
    const cleanContent = content ? content.replace(/\*\*/g, '').replace(/### /g, '').trim() : "";
    setComposeContent(cleanContent);
    setIsComposeOpen(true);
  };

  const ResultBox = ({ type, title, icon: Icon, content }: { type: string, title: string, icon: any, content?: string }) => (
    <Card className="flex flex-col h-full bg-black/40 border-white/10 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-white/5 space-y-0 relative z-10 w-full">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-indigo-400" />
          <CardTitle className="text-sm text-neutral-300">{title}</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          {content && type !== 'prediction' && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handlePublishClick(content)}
              className="h-7 text-xs px-2 shrink-0 border border-white/10 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
            >
              <Send className="h-3 w-3 mr-1" />
              Publish
            </Button>
          )}
          <Button 
            variant="glass" 
            size="sm" 
            onClick={() => handleGenerate(type as any)}
            disabled={!topic || selectedPlatforms.length === 0 || loadingType !== null}
            className="h-7 text-xs px-2 shrink-0 ml-2"
          >
            {loadingType === type ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Sparkles className="h-3 w-3 mr-1" />}
            Generate
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4 flex-1 overflow-y-auto custom-scrollbar relative z-10 min-h-[200px]">
        <AnimatePresence mode="wait">
          {content ? (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-invert prose-sm prose-indigo max-w-none text-white leading-relaxed"
            >
              <Markdown>{content}</Markdown>
            </motion.div>
          ) : (
            <div className="h-full min-h-[150px] flex items-center justify-center text-xs text-neutral-600 font-mono italic">
              Awaiting generic parameters...
            </div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-full flex flex-col pb-8">
      <div className="shrink-0 flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center">
            <Wand2 className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-white">AI Content Engine</h1>
            <p className="text-neutral-400 text-sm">Universal Viral Generator predicting social trends in real-time.</p>
          </div>
        </div>
        
        <Button variant="neon" className="gap-2" onClick={() => handlePublishClick()}>
          <Send className="h-4 w-4" />
          New Draft
        </Button>
      </div>

      <div className="shrink-0 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-2">
            Target Platforms
          </label>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map(platform => {
              const isSelected = selectedPlatforms.includes(platform.id);
              return (
                <button
                  key={platform.id}
                  onClick={() => togglePlatform(platform.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border",
                    isSelected 
                      ? "bg-white/10 border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]" 
                      : "bg-black/40 border-white/5 text-neutral-500 hover:text-neutral-300 hover:border-white/10"
                  )}
                >
                  <platform.icon className={cn("h-3.5 w-3.5", isSelected ? platform.color : "text-neutral-600")} />
                  {platform.name}
                  {isSelected && <Check className="h-3 w-3 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-2">
            Core Topic / Idea
          </label>
          <div className="relative">
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. A new AI tool that creates full SaaS platforms from a single prompt..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 resize-none h-24 transition-all"
            />
            <div className="absolute right-4 bottom-4">
               <div className={cn("h-2 w-2 rounded-full", topic.length > 5 ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" : "bg-neutral-600")} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-[600px]">
        <ResultBox type="hook" title="Viral Hooks" icon={Target} content={results.hook} />
        <ResultBox type="caption" title="Master Caption" icon={Type} content={results.caption} />
        <ResultBox type="hashtags" title="Optimized Hashtags" icon={Hash} content={results.hashtags} />
        <ResultBox type="prediction" title="Virality Predictor" icon={Gauge} content={results.prediction} />
      </div>
      
      <ComposePostModal 
        isOpen={isComposeOpen} 
        onClose={() => setIsComposeOpen(false)} 
        initialContent={composeContent}
      />
    </div>
  );
}
