import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PLATFORMS, PlatformId } from "@/lib/platforms";
import { X, Settings, Image as ImageIcon, Hash, FileText, BarChart, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface PlatformSettingsModalProps {
  platformId: PlatformId;
  isOpen: boolean;
  onClose: () => void;
}

export function PlatformSettingsModal({ platformId, isOpen, onClose }: PlatformSettingsModalProps) {
  const platform = PLATFORMS.find(p => p.id === platformId);
  const [activeTab, setActiveTab] = useState<'publishing' | 'media' | 'hashtags' | 'trends' | 'ai'>('publishing');

  if (!platform) return null;

  const Icon = platform.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-[#0a0a0c] border border-white/10 rounded-2xl w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className={`p-6 border-b border-white/10 flex items-center justify-between ${platform.bg} bg-opacity-5`}>
              <div className="flex items-center gap-4">
                <div className={cn("p-3 rounded-xl bg-black/20 backdrop-blur-md border border-white/10 shadow-lg", platform.color)}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-white">{platform.name} Settings</h2>
                  <p className="text-sm text-neutral-400">Manage platform-specific AI optimizations</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-1 min-h-0">
              {/* Sidebar Tabs */}
              <div className="w-48 border-r border-white/5 bg-black/20 p-4 space-y-1 overflow-y-auto shrink-0">
                {[
                  { id: 'publishing', label: 'Publishing Rules', icon: FileText },
                  { id: 'media', label: 'Media Formatting', icon: ImageIcon },
                  { id: 'hashtags', label: 'Hashtag Rules', icon: Hash },
                  { id: 'trends', label: 'Trend Optimization', icon: TrendingUp },
                  { id: 'ai', label: 'AI Suite', icon: Sparkles },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left",
                      activeTab === tab.id 
                        ? "bg-white/10 text-white" 
                        : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
                    )}
                  >
                    <tab.icon className={cn("h-4 w-4", tab.id === 'ai' && activeTab !== 'ai' && "text-indigo-400")} />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {activeTab === 'ai' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-white mb-4">Dedicated AI Optimization</h3>
                    {platform.aiOptimizations ? (
                      <div className="space-y-3">
                        {platform.aiOptimizations.map((opt, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/5">
                            <div className="flex items-center gap-3">
                              <Sparkles className="h-4 w-4 text-indigo-400" />
                              <span className="text-sm font-medium text-white">{opt}</span>
                            </div>
                            <label className="flex items-center cursor-pointer">
                              <input type="checkbox" defaultChecked className="sr-only peer" />
                              <div className="w-9 h-5 bg-black/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500 relative border border-white/10"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-neutral-500">
                        <Sparkles className="h-8 w-8 mx-auto mb-3 opacity-20" />
                        <p className="text-sm">Standard AI models apply for {platform.name}.<br/>No dedicated modules configured.</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'publishing' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-white mb-4">Publishing Rules</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">Max Character Length Strictness</label>
                      <div className="bg-black/40 border border-white/5 rounded-lg p-3">
                        <div className="flex justify-between text-xs text-neutral-500 mb-2">
                           <span>Strict Limit ({platform.maxChars || 280})</span>
                           <span>AI Fluid</span>
                        </div>
                        <input type="range" className="w-full accent-indigo-500" defaultValue="80" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">Algorithm Throttling</label>
                      <label className="flex items-center gap-3 text-sm text-neutral-400 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded border-white/10 bg-black/40 text-indigo-500 focus:ring-indigo-500/50" />
                        Delay posts automatically to avoid {platform.name} spam filters
                      </label>
                    </div>
                  </div>
                )}

                {activeTab === 'media' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-white mb-4">Media Formatting & AI Cropping</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border border-indigo-500/30 bg-indigo-500/10 p-4 rounded-xl cursor-pointer hover:bg-indigo-500/20 transition-colors">
                        <div className="h-20 w-16 border-2 border-indigo-500/50 rounded-lg mx-auto mb-3 flex items-center justify-center text-indigo-400 font-bold text-xs">9:16</div>
                        <p className="text-center text-sm font-medium text-indigo-300">Auto-crop Vertical</p>
                      </div>
                      <div className="border border-white/10 bg-white/5 p-4 rounded-xl cursor-pointer hover:bg-white/10 transition-colors opacity-50">
                        <div className="h-16 w-16 border-2 border-neutral-500 rounded-lg mx-auto mb-3 flex items-center justify-center text-neutral-400 font-bold text-xs">1:1</div>
                        <p className="text-center text-sm font-medium text-neutral-400">Square Native</p>
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-3 text-sm text-neutral-400 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded border-white/10 bg-black/40 text-indigo-500" />
                        Use AI to automatically optimize resolution for {platform.name}
                      </label>
                    </div>
                  </div>
                )}

                {activeTab === 'hashtags' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-white mb-4">Hashtag Generation Rules</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">Hashtag Density (Limit: {platform.hashtagLimit || 'Unlimited'})</label>
                      <select className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500">
                        <option>Maximum allowable (Algorithm Optimized)</option>
                        <option>Minimalist (1-3 tags)</option>
                        <option>Hidden in comments (if supported)</option>
                        <option>No hashtags (Organic play)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">Banned Hashtags (Will be automatically pruned)</label>
                      <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-white text-sm placeholder-neutral-600" placeholder="e.g. #test, #irrelevant" />
                    </div>
                  </div>
                )}

                {activeTab === 'trends' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-white mb-4">Trend Optimization</h3>
                    
                    <div className="bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10 border border-indigo-500/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-fuchsia-400" />
                        <h4 className="font-medium text-white">AI Audience Tuning</h4>
                      </div>
                      <p className="text-sm text-neutral-400 mb-4">Allow the AI to rewrite your hook based on the top 100 currently trending posts on {platform.name}.</p>
                      <label className="flex items-center gap-3 text-sm text-neutral-300 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded border-white/10 bg-black/40 text-fuchsia-500" />
                        Enable real-time trend rewriting
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-black/40 flex justify-end gap-3">
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
              <Button variant="neon" onClick={onClose} className="px-6">Save Optimization Settings</Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
