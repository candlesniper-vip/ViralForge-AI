import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, Activity, CalendarDays, Brain, Shield, ChevronRight, CheckCircle2, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";

const features = [
  {
    title: "AI Viral Predictor",
    description: "Our proprietary AI analyzes 10,000+ data points to score your content's virality potential before you publish.",
    icon: Brain,
    color: "from-fuchsia-500 to-pink-500"
  },
  {
    title: "Omni-Channel Scheduling",
    description: "Write once, publish everywhere. Auto-optimize formats for X, LinkedIn, TikTok, and Instagram visually.",
    icon: CalendarDays,
    color: "from-indigo-500 to-blue-500"
  },
  {
    title: "Deep Analytics",
    description: "Consolidated dashboard showing real-time engagement, growth curves, and audience heatmaps.",
    icon: Activity,
    color: "from-emerald-500 to-teal-500"
  },
  {
    title: "Enterprise Security",
    description: "Military-grade encryption, role-based access, and complete OAuth compliance for team safety.",
    icon: Shield,
    color: "from-orange-500 to-red-500"
  }
];

export default function Landing() {
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[-100px] w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-100px] right-[20%] w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[140px]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4wMyIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCA2MGg2ME02MCAwdjYwIi8+PC9nPjwvc3ZnPg==')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_20px_rgba(79,70,229,0.4)]">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-white">ViralForge<span className="text-indigo-400">AI</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={signInWithGoogle} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors hidden sm:block cursor-pointer">
              Sign In
            </button>
            <Button onClick={signInWithGoogle} variant="neon" className="rounded-full px-6">Get Started</Button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8">
                <Sparkles className="h-4 w-4" /> Introducing ViralForge AI 2.0
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight mb-8 leading-[1.1]">
                Predict Virality. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-400">
                  Scale Your Influence.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                The enterprise-grade AI platform for scheduling, analyzing, and predicting social media performance. Ditch the guesswork and let algorithms drive your growth.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button onClick={signInWithGoogle} variant="neon" size="lg" className="h-14 px-8 text-lg rounded-full group w-full sm:w-auto">
                  Start Your Free Trial
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="glass" size="lg" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto">
                  <PlayCircle className="h-5 w-5 mr-2 text-neutral-400" />
                  Watch Demo
                </Button>

              </div>

              <div className="mt-12 flex items-center justify-center gap-8 text-neutral-500 text-sm">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> No credit card required</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> 14-day free trial</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Cancel anytime</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="py-12 px-6">
           <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="max-w-6xl mx-auto relative"
           >
             <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-2xl blur opacity-30" />
             <div className="relative rounded-xl border border-white/10 bg-black/80 overflow-hidden shadow-2xl backdrop-blur-xl aspect-video flex flex-col">
               {/* Browser bar */}
               <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
                 <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-red-400/80" />
                   <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                   <div className="w-3 h-3 rounded-full bg-green-400/80" />
                 </div>
               </div>
               
               {/* Mock UI */}
               <div className="flex-1 p-8 grid grid-cols-3 gap-6 bg-[#050505]">
                 <div className="col-span-1 space-y-4">
                   <div className="h-32 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 flex flex-col justify-end">
                     <div className="w-12 h-12 bg-indigo-500/20 rounded-lg mb-2" />
                     <div className="w-24 h-4 bg-indigo-400/40 rounded" />
                   </div>
                   <div className="h-64 bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col gap-3">
                      <div className="w-full h-8 bg-white/10 rounded" />
                      <div className="w-3/4 h-4 bg-white/5 rounded" />
                      <div className="w-1/2 h-4 bg-white/5 rounded" />
                   </div>
                 </div>
                 <div className="col-span-2 flex flex-col gap-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-24 bg-white/5 border border-white/5 rounded-xl" />
                      <div className="h-24 bg-white/5 border border-white/5 rounded-xl" />
                      <div className="h-24 bg-emerald-500/10 border border-emerald-500/20 rounded-xl" />
                    </div>
                    <div className="flex-1 bg-white/5 border border-white/5 rounded-xl p-6 flex flex-col justify-end">
                       <div className="flex gap-4 items-end h-full w-full">
                         {[40, 20, 60, 80, 50, 90, 70].map((h, i) => (
                           <div key={i} className="flex-1 bg-indigo-400 rounded-t-sm" style={{ height: `${h}%` }} />
                         ))}
                       </div>
                    </div>
                 </div>
               </div>
             </div>
           </motion.div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Unfair Advantage Setup.</h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">Everything you need to dominate social channels, centralized in one absurdly powerful terminal.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                     <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-neutral-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/30 to-fuchsia-600/30 blur-2xl rounded-3xl" />
            <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 p-12 rounded-3xl text-center">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">Stop Posting. Start Predicting.</h2>
              <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">Join 14,000+ creators and enterprise teams scaling their presence with ViralForge AI.</p>
              <Link to="/dashboard">
                <Button variant="neon" size="lg" className="h-14 px-10 text-lg rounded-full">
                  Create Free Account
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/40 py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-400" />
            <span className="font-display font-bold text-white">ViralForge<span className="text-indigo-400">AI</span></span>
          </div>
          <div className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} ViralForge Inc. All rights reserved.
          </div>
          <div className="flex gap-4 text-sm text-neutral-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
