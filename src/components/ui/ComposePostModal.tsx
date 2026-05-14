import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Send, Image as ImageIcon, Video, X, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { PLATFORMS, PlatformId } from "@/lib/platforms";
import { motion, AnimatePresence } from "motion/react";

interface ComposePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialContent?: string;
}

export function ComposePostModal({ isOpen, onClose, initialContent = "" }: ComposePostModalProps) {
  const [content, setContent] = useState(initialContent);
  const [connections, setConnections] = useState<Record<string, any>>({});
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformId[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    if (isOpen) {
      setContent(initialContent || "");
      setPublishSuccess(false);
      setIsPublishing(false);
    }
  }, [isOpen, initialContent]);

  useEffect(() => {
    if (!auth.currentUser) return;
    const unsubscribe = onSnapshot(
      collection(db, `users/${auth.currentUser.uid}/connections`),
      (snapshot) => {
        const newConnections: Record<string, any> = {};
        snapshot.forEach(doc => {
          if (doc.data().isConnected) {
            newConnections[doc.id] = doc.data();
          }
        });
        setConnections(newConnections);
        
        // Auto-select connected platforms by default
        setSelectedPlatforms(
          PLATFORMS.map(p => p.id).filter(id => newConnections[id]) as PlatformId[]
        );
      }
    );
    return () => unsubscribe();
  }, [auth.currentUser]);

  const togglePlatform = (id: PlatformId) => {
    if (!connections[id]) return; // Cannot select if not connected
    
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handlePublish = async () => {
    if (!content || selectedPlatforms.length === 0) return;
    
    setIsPublishing(true);
    
    // Simulate API call to publish to platforms
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsPublishing(false);
    setPublishSuccess(true);
    
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  if (!isOpen) return null;

  const connectedPlatformIds = Object.keys(connections);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#0f0f11] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
          <h2 className="text-lg font-display font-semibold text-white">Compose Post</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {publishSuccess ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-10"
              >
                <div className="h-16 w-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Publishing Successful!</h3>
                <p className="text-neutral-400 text-center max-w-md">
                  Your post has been successfully dispatched to {selectedPlatforms.length} platform{selectedPlatforms.length > 1 ? 's' : ''}.
                  {selectedPlatforms.includes('instagram') && connections['instagram']?.username && (
                     <span className="block mt-2 font-medium text-indigo-300">
                       Successfully posted to Instagram as @{connections['instagram'].username}!
                     </span>
                  )}
                </p>
              </motion.div>
            ) : (
              <motion.div key="compose" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">
                    Post to Connected Platforms
                  </label>
                  
                  {connectedPlatformIds.length === 0 ? (
                    <div className="flex items-center gap-2 text-sm text-orange-400 bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                      <AlertCircle className="h-4 w-4" />
                      You haven't connected any social platforms yet. Go to Connections to link your accounts.
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {PLATFORMS.map(platform => {
                        const isConnected = !!connections[platform.id];
                        const isSelected = selectedPlatforms.includes(platform.id);
                        
                        if (!isConnected) return null;

                        return (
                          <button
                            key={platform.id}
                            onClick={() => togglePlatform(platform.id)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 border ${
                              isSelected 
                                ? "bg-white/10 border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]" 
                                : "bg-black/40 border-white/5 text-neutral-500 hover:text-neutral-300 hover:border-white/10"
                            }`}
                          >
                            <platform.icon className={`h-4 w-4 ${isSelected ? platform.color : "text-neutral-600"}`} />
                            <div className="text-left">
                              <div className="leading-none">{platform.name}</div>
                              {connections[platform.id].username && (
                                <div className="text-[10px] text-neutral-500 mt-1 leading-none">@{connections[platform.id].username}</div>
                              )}
                            </div>
                            {isSelected && <CheckCircle2 className="h-3 w-3 ml-1 text-emerald-400" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What do you want to share with your audience?"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 min-h-[150px] resize-y transition-all text-sm"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-9 px-3 text-neutral-400 hover:text-white">
                      <ImageIcon className="h-4 w-4 mr-2" /> Image
                    </Button>
                    <Button variant="ghost" size="sm" className="h-9 px-3 text-neutral-400 hover:text-white">
                      <Video className="h-4 w-4 mr-2" /> Video
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-500">
                      {content.length} characters
                    </span>
                    <Button 
                      variant="neon" 
                      onClick={handlePublish}
                      disabled={!content || selectedPlatforms.length === 0 || isPublishing}
                      className="min-w-[120px]"
                    >
                      {isPublishing ? (
                         <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Publishing...</>
                      ) : (
                        <><Send className="h-4 w-4 mr-2" /> Publish Now</>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
