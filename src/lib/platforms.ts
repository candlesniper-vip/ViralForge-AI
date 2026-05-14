import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter, 
  Linkedin, 
  MessageCircle, 
  Ghost, 
  MessageSquare, 
  Pin,
  Send,
  AtSign,
  Hash,
  Share2
} from "lucide-react";
import React from "react";

export type PlatformId = 
  | 'twitter' 
  | 'instagram' 
  | 'linkedin' 
  | 'facebook' 
  | 'tiktok' 
  | 'youtube' 
  | 'pinterest' 
  | 'reddit' 
  | 'threads' 
  | 'telegram' 
  | 'discord' 
  | 'snapchat' 
  | 'whatsapp';

export interface Platform {
  id: PlatformId;
  name: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  maxChars?: number;
  hashtagLimit?: number;
  aiOptimizations?: string[];
}

export const PLATFORMS: Platform[] = [
  { id: 'twitter', name: 'X (Twitter)', icon: Twitter, color: 'text-sky-400', bg: 'bg-sky-400/10', maxChars: 280, hashtagLimit: 3, aiOptimizations: ['Thread formatting', 'Viral engagement formatting', 'Trend targeting', 'Hook optimization'] },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-fuchsia-500', bg: 'bg-fuchsia-500/10', maxChars: 2200, hashtagLimit: 30, aiOptimizations: ['Reel optimization', 'Explore-page hashtag optimization', 'Carousel formatting', 'Story adaptation', 'Caption optimization'] },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-500', bg: 'bg-blue-500/10', maxChars: 3000, hashtagLimit: 5, aiOptimizations: ['Professional formatting', 'B2B engagement optimization', 'Career-focused optimization'] },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-600/10', maxChars: 63206, hashtagLimit: 5 },
  { id: 'tiktok', name: 'TikTok', icon: Share2, color: 'text-emerald-400', bg: 'bg-emerald-400/10', maxChars: 2200, hashtagLimit: 5, aiOptimizations: ['Trending sounds', 'Viral hook suggestions', 'Viral hashtags', 'AI short-form optimization', 'Best posting time AI'] },
  { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-500', bg: 'bg-red-500/10', maxChars: 5000, hashtagLimit: 15, aiOptimizations: ['SEO title optimization', 'Thumbnail text suggestions', 'Shorts optimization', 'Description optimization', 'Tag recommendations'] },
  { id: 'pinterest', name: 'Pinterest', icon: Pin, color: 'text-red-600', bg: 'bg-red-600/10', maxChars: 500, hashtagLimit: 5 },
  { id: 'reddit', name: 'Reddit', icon: MessageSquare, color: 'text-orange-500', bg: 'bg-orange-500/10', maxChars: 40000 },
  { id: 'threads', name: 'Threads', icon: AtSign, color: 'text-white', bg: 'bg-white/10', maxChars: 500, hashtagLimit: 0 },
  { id: 'telegram', name: 'Telegram', icon: Send, color: 'text-sky-500', bg: 'bg-sky-500/10', maxChars: 4096 },
  { id: 'discord', name: 'Discord', icon: MessageSquare, color: 'text-indigo-400', bg: 'bg-indigo-400/10', maxChars: 2000 },
  { id: 'snapchat', name: 'Snapchat', icon: Ghost, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
];
