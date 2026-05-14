import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Sparkles, Globe, TrendingUp, Flame, PlayCircle, Hash, RefreshCcw, ArrowUpRight, Heart, MessageCircle, Share2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateAIText } from "@/lib/gemini";
import Markdown from "react-markdown";

const platforms = ["Global", "TikTok", "Twitter / X", "Instagram", "LinkedIn", "YouTube"];
const languages = [
  "All Languages", "Afaan Oromo", "Afrikaans", "Albanian", "Amharic", "Arabic", "Armenian", "Azerbaijani", "Basque", "Belarusian", "Bengali", "Bosnian", "Bulgarian", "Catalan", "Cebuano", "Chichewa", "Chinese", "Corsican", "Croatian", "Czech", "Danish", "Dutch", "English", "Esperanto", "Estonian", "Filipino", "Finnish", "French", "Frisian", "Galician", "Georgian", "German", "Greek", "Gujarati", "Haitian Creole", "Hausa", "Hawaiian", "Hebrew", "Hindi", "Hmong", "Hungarian", "Icelandic", "Igbo", "Indonesian", "Irish", "Italian", "Japanese", "Javanese", "Kannada", "Kazakh", "Khmer", "Kinyarwanda", "Korean", "Kurdish", "Kyrgyz", "Lao", "Latin", "Latvian", "Lithuanian", "Luxembourgish", "Macedonian", "Malagasy", "Malay", "Malayalam", "Maltese", "Maori", "Marathi", "Mongolian", "Myanmar (Burmese)", "Nepali", "Norwegian", "Odia", "Pashto", "Persian", "Polish", "Portuguese", "Punjabi", "Romanian", "Russian", "Samoan", "Scots Gaelic", "Serbian", "Sesotho", "Shona", "Sindhi", "Sinhala", "Slovak", "Slovenian", "Somali", "Spanish", "Sundanese", "Swahili", "Swedish", "Tajik", "Tamil", "Tatar", "Telugu", "Thai", "Turkish", "Turkmen", "Ukrainian", "Urdu", "Uyghur", "Uzbek", "Vietnamese", "Welsh", "Xhosa", "Yiddish", "Yoruba", "Zulu"
];
const contentTopics = [
  "All Topics", "Technology & Gadgets", "Software Engineering", "Artificial Intelligence",
  "Business & Entrepreneurship", "Finance & Investing", "Marketing & SEO", "Design & Aesthetics",
  "Lifestyle & Vlogs", "Health & Wellness", "Fitness & Sports", "Fashion & Style", "Beauty & Makeup",
  "Travel & Adventure", "Food & Cooking", "Gaming & Esports", "Music & Audio", "Movies & TV Shows",
  "Books & Literature", "Education & Learning", "Science & Nature", "News & Politics",
  "Personal Development", "Photography & Videography", "Art & Illustration", "DIY & Crafts",
  "Home & Decor", "Parenting & Family", "Pets & Animals", "Humor & Comedy",
  "History & Mythology", "Automotive & Cars", "Real Estate & Architecture", "Conspiracy Theories",
  "Crypto & Web3", "True Crime", "Pop Culture & Gossip", "Language Learning", "ASMR & Relaxation",
  "Spirituality & Astrology", "Dance & Choreography", "Magic & Illusions", "Storytelling & Reading",
  "Animation & Motion Graphics", "Productivity & Time Management", "Relationships & Dating",
  "Survival & Bushcraft", "Gardening & Agriculture", "Anime & Manga", "Cosplay & Costuming",
  "Board Games & Tabletop", "Collectibles & Antiques", "Outdoor & Camping", "Mental Health Awareness",
  "Environment & Sustainability", "Philosophy & Ethics", "Career Advice", "Remote Work & Digital Nomad",
  "Esports & Streaming", "Virtual Reality & AR", "Robotics & Drones", "Data Science & Analytics",
  "Cybersecurity & Hacking", "Cloud Computing"
];
const regions = [
  "Worldwide", "North America", "Europe", "Asia", "Latin America", "Africa", "Oceania",
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Democratic Republic of the Congo", "Republic of the Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "East Timor (Timor-Leste)", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "North Korea", "South Korea", "Kosovo", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (Burma)",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen", "Zambia", "Zimbabwe"
];

export default function CurrentlyContents() {
  const [selectedPlatform, setSelectedPlatform] = useState("Global");
  const [selectedRegion, setSelectedRegion] = useState("Worldwide");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem("userPreferredLanguage") || "All Languages";
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);

  const [selectedTrendIndex, setSelectedTrendIndex] = useState<number>(0);
  const [contentIdea, setContentIdea] = useState<string | null>(null);
  const [isGeneratingIdea, setIsGeneratingIdea] = useState(false);

  const simulatedTrending = [
    { title: "AI Prompt Engineering Challenges", platform: "LinkedIn", views: "4.2M", likes: "125K", comments: "12K", shares: "34K", velocity: "Very High", niche: "Tech & SaaS", icon: Hash },
    { title: "Day in the Life Vlogs (Raw Cut)", platform: "TikTok", views: "18.5M", likes: "2.1M", comments: "89K", shares: "142K", velocity: "Viral", niche: "Lifestyle", icon: PlayCircle },
    { title: "Synthwave Audio Edits", platform: "Instagram", views: "12M", likes: "1.4M", comments: "45K", shares: "210K", velocity: "High", niche: "Aesthetics", icon: Flame },
    { title: "Tech Stack Breakdowns", platform: "Twitter / X", views: "8.1M", likes: "340K", comments: "11K", shares: "56K", velocity: "Rising", niche: "Development", icon: TrendingUp },
  ];

  const fetchLiveTrends = async () => {
    setIsAnalyzing(true);
    try {
      const topicContext = selectedTopic === "All Topics" ? "" : ` specifically focusing on the niche of **${selectedTopic}**`;
      const languageContext = selectedLanguage === "All Languages" ? "" : ` Output the report primarily in **${selectedLanguage}**.`;
      const prompt = `Act as an expert social media analyst. Give a concise but detailed report on the *most viral and currently trending content* right now for ${selectedPlatform} in ${selectedRegion}${topicContext}.${languageContext} 
Focus on:
1. The top 3 macro-trends (e.g., specific audio, format, topic).
2. Why they are working.
3. How a creator can hijack these trends today.
Use markdown formatting with headers and bullet points.`;
      
      const response = await generateAIText(prompt);
      setAiReport(response);
    } catch (error) {
      console.error(error);
      setAiReport("Failed to fetch live trends from AI. Ensure API key is configured.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateContentIdea = async () => {
    setIsGeneratingIdea(true);
    const trend = simulatedTrending[selectedTrendIndex];
    try {
      const languageContext = selectedLanguage === "All Languages" ? "" : ` Provide the output in **${selectedLanguage}**.`;
      const prompt = `Act as an expert social media strategist. Generate a creative content idea for ${trend.platform} based on the trending signal: "${trend.title}" in the ${trend.niche} niche.${languageContext} 
Focus on:
1. The format (e.g., Hooks, Body, Call to Action).
2. Key points to cover.
3. Visual or audio suggestions.
Make it actionable and use markdown formatting.`;
      
      const response = await generateAIText(prompt);
      setContentIdea(response);
    } catch (error) {
      console.error(error);
      setContentIdea("Failed to fetch content idea from AI.");
    } finally {
      setIsGeneratingIdea(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-10">
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1 flex items-center gap-2">
            <Globe className="h-6 w-6 text-fuchsia-400" />
            Currently Contents
          </h1>
          <p className="text-neutral-400 text-sm">AI-curated global viral trends happening right now across all networks.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 block">Topic / Niche</label>
            <select 
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
            >
              {contentTopics.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex-1 w-full">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 block">Platform</label>
            <select 
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
            >
              {platforms.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="flex-1 w-full">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 block">Country / Region</label>
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
            >
              {regions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="flex-1 w-full">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 block">Language</label>
            <select 
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                localStorage.setItem("userPreferredLanguage", e.target.value);
              }}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
            >
              {languages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="flex-shrink-0 mt-6 sm:mt-0 w-full md:w-auto">
            <Button onClick={fetchLiveTrends} disabled={isAnalyzing} variant="neon" className="w-full sm:w-auto whitespace-nowrap bg-fuchsia-600 hover:bg-fuchsia-500 ring-fuchsia-500/50">
              {isAnalyzing ? <RefreshCcw className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
              {isAnalyzing ? "Analyzing..." : "Generate Deep Dive"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={cn(
          "bg-black/60 relative overflow-hidden transition-all duration-500 border border-white/5",
          (isAnalyzing || aiReport) && "border-fuchsia-500/30 shadow-[0_0_30px_-10px_rgba(217,70,239,0.2)]"
        )}>
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-indigo-500/5 pointer-events-none" />
          <CardHeader className="border-b border-white/5 pb-4 relative z-10">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-fuchsia-400" />
              Live AI Trend Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 relative z-10 min-h-[300px]">
             {isAnalyzing ? (
               <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                 <div className="relative w-16 h-16">
                   <div className="absolute inset-0 border-4 border-fuchsia-500/20 rounded-full" />
                   <div className="absolute inset-0 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin" />
                 </div>
                 <p className="text-neutral-400 animate-pulse">Scanning global content signals for {selectedPlatform} in {selectedRegion}...</p>
               </div>
             ) : aiReport ? (
               <div className="prose prose-invert prose-sm max-w-none text-neutral-300">
                  <Markdown>{aiReport}</Markdown>
               </div>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-center py-12 border-2 border-dashed border-white/5 rounded-xl bg-white/5">
                  <Globe className="h-10 w-10 text-neutral-600 mb-3" />
                  <p className="text-neutral-500 max-w-[250px] mx-auto text-sm">Hit "Generate AI Deep Dive" to get a real-time synthesis of what's working right now.</p>
               </div>
             )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h3 className="text-lg font-display font-medium text-white">Baseline Trending Signals</h3>
          <div className="grid grid-cols-1 gap-4">
            {simulatedTrending.map((trend, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedTrendIndex(i)}
                className={cn(
                  "bg-black/40 border rounded-xl p-4 flex items-start gap-4 transition-colors group cursor-pointer",
                  selectedTrendIndex === i ? "border-fuchsia-500/50 bg-fuchsia-500/10" : "border-white/5 hover:bg-white/5"
                )}
              >
                <div className={cn("p-3 rounded-lg shrink-0", selectedTrendIndex === i ? "bg-fuchsia-500/20" : "bg-white/5")}>
                  <trend.icon className={cn("h-5 w-5", selectedTrendIndex === i ? "text-fuchsia-400" : "text-indigo-400")} />
                </div>
                <div className="flex-1">
                   <div className="flex items-start justify-between">
                     <h4 className={cn("font-semibold transition-colors", selectedTrendIndex === i ? "text-fuchsia-300" : "text-white group-hover:text-fuchsia-300")}>{trend.title}</h4>
                     <ArrowUpRight className={cn("h-4 w-4 transition-opacity", selectedTrendIndex === i ? "text-fuchsia-400 opacity-100" : "text-neutral-500 opacity-0 group-hover:opacity-100")} />
                   </div>
                   <div className="flex flex-col gap-3 mt-3">
                     <div className="flex items-center gap-2 text-xs">
                       <span className="text-neutral-400 bg-white/5 px-2 py-0.5 rounded">{trend.platform}</span>
                       <span className="text-neutral-400 bg-white/5 px-2 py-0.5 rounded">{trend.niche}</span>
                     </div>
                     <div className="flex items-center gap-4 text-xs text-neutral-500 font-mono">
                       <div className="flex items-center gap-1.5 text-emerald-400" title="Views">
                         <Eye className="h-3.5 w-3.5" />
                         <span>{trend.views}</span>
                       </div>
                       <div className="flex items-center gap-1.5" title="Likes">
                         <Heart className="h-3.5 w-3.5" />
                         <span>{trend.likes}</span>
                       </div>
                       <div className="flex items-center gap-1.5" title="Comments">
                         <MessageCircle className="h-3.5 w-3.5" />
                         <span>{trend.comments}</span>
                       </div>
                       <div className="flex items-center gap-1.5" title="Shares">
                         <Share2 className="h-3.5 w-3.5" />
                         <span>{trend.shares}</span>
                       </div>
                     </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full border-dashed border-white/10 text-neutral-400 font-medium">
            Load More Signals
          </Button>

          {/* New Section for Content Idea Generation */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-display font-medium text-white mb-1">Content Idea</h3>
                <p className="text-sm text-neutral-400">Generate idea for: <span className="text-fuchsia-300">"{simulatedTrending[selectedTrendIndex].title}"</span></p>
              </div>
              <Button 
                onClick={generateContentIdea} 
                disabled={isGeneratingIdea} 
                variant="neon" 
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-500 ring-indigo-500/50"
              >
                {isGeneratingIdea ? <RefreshCcw className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
                Generate Content Idea
              </Button>
            </div>
            
            <Card className={cn(
              "bg-black/60 relative overflow-hidden transition-all duration-500 border border-white/5",
              isGeneratingIdea && "border-indigo-500/30 shadow-[0_0_30px_-10px_rgba(99,102,241,0.2)]"
            )}>
              <CardContent className="pt-6 min-h-[200px] relative">
                {isGeneratingIdea ? (
                   <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8">
                     <div className="relative w-12 h-12">
                       <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full" />
                       <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                     </div>
                     <p className="text-neutral-400 animate-pulse text-sm">Brainstorming viral concept for {simulatedTrending[selectedTrendIndex].platform}...</p>
                   </div>
                ) : contentIdea ? (
                   <div className="prose prose-invert prose-sm prose-indigo max-w-none text-neutral-300">
                      <Markdown>{contentIdea}</Markdown>
                   </div>
                ) : (
                   <div className="flex flex-col items-center justify-center text-center py-8">
                      <Sparkles className="h-8 w-8 text-neutral-600 mb-3" />
                      <p className="text-neutral-500 text-sm max-w-[300px]">Select a trending signal above and generate a bespoke content idea to capitalize on the trend.</p>
                   </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
