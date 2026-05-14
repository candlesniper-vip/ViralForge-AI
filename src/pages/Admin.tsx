import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Users, 
  CreditCard, 
  Activity, 
  ShieldAlert, 
  Database, 
  Sparkles, 
  MessageSquareWarning, 
  LifeBuoy,
  Globe,
  TrendingUp,
  Search,
  MoreVertical,
  ArrowUpRight
} from "lucide-react";

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'revenue' | 'system' | 'ai'>('overview');

  const metrics = [
    { label: "Total Users", value: "142,503", change: "+12.4%", icon: Users, color: "text-blue-400" },
    { label: "MRR", value: "$1.24M", change: "+8.2%", icon: CreditCard, color: "text-emerald-400" },
    { label: "API Requests (24h)", value: "84.2M", change: "+15.3%", icon: Database, color: "text-fuchsia-400" },
    { label: "AI Tokens Used", value: "2.4B", change: "+24.1%", icon: Sparkles, color: "text-indigo-400" },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Admin Control Panel</h1>
          <p className="text-neutral-400 text-sm">Global system monitoring and platform management.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1 bg-black/40 border border-white/5 rounded-xl w-fit">
        {[
          { id: 'overview', label: 'Global Overview', icon: Globe },
          { id: 'users', label: 'User Management', icon: Users },
          { id: 'revenue', label: 'Revenue Analytics', icon: TrendingUp },
          { id: 'system', label: 'System & Security', icon: ShieldAlert },
          { id: 'ai', label: 'AI Operations', icon: Sparkles },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === tab.id ? "bg-white/10 text-white" : "text-neutral-500 hover:text-neutral-300"}`}
          >
            <tab.icon className="h-4 w-4" /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <Card key={metric.label} className="bg-black/40 border-white/5 p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className={`p-2 bg-white/5 rounded-lg border border-white/10`}>
                    <metric.icon className={`h-4 w-4 ${metric.color}`} />
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">{metric.change}</span>
                </div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{metric.label}</p>
                <h3 className="text-3xl font-bold text-white mt-1">{metric.value}</h3>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/40 border-white/5">
              <CardHeader className="border-b border-white/5 pb-4">
                <CardTitle className="text-lg flex items-center gap-2"><Activity className="h-5 w-5 text-indigo-400" /> Platform Health</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                {[
                  { name: "API Gateway", status: "Operational", uptime: "99.99%" },
                  { name: "AI Inference Engine", status: "High Load", uptime: "99.95%" },
                  { name: "Database Cluster", status: "Operational", uptime: "99.99%" },
                  { name: "OAuth Providers", status: "Operational", uptime: "100%" }
                ].map((service, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/5">
                    <div>
                      <h4 className="text-sm font-medium text-white">{service.name}</h4>
                      <p className="text-xs text-neutral-500 mt-0.5">Uptime: {service.uptime}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full border ${service.status === 'Operational' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                      <div className={`h-1.5 w-1.5 rounded-full ${service.status === 'Operational' ? 'bg-emerald-400' : 'bg-yellow-400'}`} />
                      {service.status}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-white/5">
              <CardHeader className="border-b border-white/5 pb-4">
                <CardTitle className="text-lg flex items-center gap-2"><MessageSquareWarning className="h-5 w-5 text-red-400" /> Moderation Alerts</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                 {[
                   { user: "agency_xyz", type: "Spam Flag", target: "Twitter", risk: "Low" },
                   { user: "viral_hustler", type: "API Abuse", target: "TikTok", risk: "High" },
                   { user: "crypto_bot_99", type: "TOS Violation", target: "LinkedIn", risk: "Critical" },
                 ].map((alert, i) => (
                   <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/5">
                     <div>
                       <h4 className="text-sm font-medium text-white flex items-center gap-2">{alert.user} <span className="text-[10px] text-neutral-500 border border-white/10 px-1 rounded">{alert.target}</span></h4>
                       <p className="text-xs text-neutral-400 mt-0.5">{alert.type}</p>
                     </div>
                     <Button variant="outline" size="sm" className="h-7 text-xs border-white/10 text-neutral-300">Review</Button>
                   </div>
                 ))}
                 <Button variant="ghost" className="w-full text-neutral-400 text-xs">View all alerts <ArrowUpRight className="h-3 w-3 ml-1"/></Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <Card className="bg-black/40 border-white/5">
          <CardHeader className="border-b border-white/5 pb-4 flex flex-row items-center justify-between">
            <CardTitle>User Directory</CardTitle>
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input type="text" placeholder="Search users, emails, IDs..." className="bg-black/40 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm w-64 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
             <table className="w-full text-sm text-left">
                <thead className="text-xs text-neutral-500 uppercase bg-black/40 border-b border-white/5">
                  <tr>
                    <th className="px-6 py-3 font-medium">User</th>
                    <th className="px-6 py-3 font-medium">Plan</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Joined</th>
                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { name: "Alex Chen", email: "alex@viralcorp.com", plan: "Enterprise", status: "Active", joined: "Oct 12, 2025" },
                    { name: "Sarah Jenkins", email: "sarahj@gmail.com", plan: "Pro", status: "Active", joined: "Jan 04, 2026" },
                    { name: "Tech Hustlers", email: "admin@techhustlers.io", plan: "Agency", status: "Suspended", joined: "Mar 15, 2026" },
                    { name: "Mike Ross", email: "ross@pearson.law", plan: "Starter", status: "Active", joined: "May 10, 2026" },
                  ].map((user, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-xs text-neutral-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs border ${user.plan === 'Enterprise' ? 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20' : user.plan === 'Agency' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-white/5 text-neutral-300 border-white/10'}`}>{user.plan}</span>
                      </td>
                      <td className="px-6 py-4">
                         <span className={`px-2 py-1 rounded-full text-xs flex w-fit items-center gap-1.5 ${user.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>
                           <div className={`h-1.5 w-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                           {user.status}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-neutral-400">{user.joined}</td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-white"><MoreVertical className="h-4 w-4"/></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </CardContent>
        </Card>
      )}

      {/* Additional tabs could be stubbed here or added as requested */}
      {(activeTab === 'revenue' || activeTab === 'system' || activeTab === 'ai') && (
        <Card className="bg-black/40 border-white/5 h-[400px] flex items-center justify-center">
           <div className="text-center text-neutral-500">
             <TrendingUp className="h-10 w-10 mx-auto mb-3 opacity-20" />
             <p>Analytics section rendering...</p>
           </div>
        </Card>
      )}

    </div>
  );
}
