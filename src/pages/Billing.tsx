import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Check, CreditCard, Receipt, Users, Zap, Briefcase, Building, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    description: "For solo creators and personal brands.",
    price: "$29",
    period: "/mo",
    icon: Zap,
    features: ["Connect up to 3 platforms", "AI Caption Writer", "100 AI Tokens/mo", "Basic Analytics", "Standard Support"],
    current: false,
    color: "text-blue-400",
    border: "border-blue-500/20",
    bg: "bg-blue-500/10"
  },
  {
    name: "Pro (Owner)",
    description: "Special unlimited plan for the software owner.",
    price: "$0",
    period: "/mo",
    icon: Briefcase,
    features: ["Connect unlimited platforms", "AI Viral Predictor", "Unlimited AI Tokens", "Advanced Analytics", "Priority Support", "Trend Analyzer"],
    current: true,
    color: "text-emerald-400",
    border: "border-emerald-500/50",
    bg: "bg-emerald-500/10",
    popular: true
  },
  {
    name: "Agency",
    description: "For marketing teams and agencies.",
    price: "$199",
    period: "/mo",
    icon: Users,
    features: ["Unlimited platforms", "Team billing (up to 5)", "5,000 AI Tokens/mo", "Client Reporting", "White-label options", "Custom Integrations"],
    current: false,
    color: "text-fuchsia-400",
    border: "border-fuchsia-500/20",
    bg: "bg-fuchsia-500/10"
  },
  {
    name: "Enterprise",
    description: "For large organizations with custom needs.",
    price: "Custom",
    period: "",
    icon: Building,
    features: ["Everything in Agency", "Unlimited AI Tokens", "Dedicated Account Manager", "SLA Guarantee", "On-premise deployment"],
    current: false,
    color: "text-yellow-400",
    border: "border-yellow-500/20",
    bg: "bg-yellow-500/10"
  }
];

export default function Billing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-10">
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Billing & Subscription</h1>
          <p className="text-neutral-400 text-sm">Manage your plan, invoices, and team usage limits.</p>
        </div>
      </div>

      {/* Usage Info */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-start gap-3">
        <Zap className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-emerald-300">Owner Privileges Active</h4>
          <p className="text-sm text-emerald-400/80 mt-1">You have unlimited AI tokens and platform connections forever as the software owner. Enjoy!</p>
          <div className="w-full bg-black/40 rounded-full h-2 mt-3 overflow-hidden border border-emerald-500/20">
            <div className="bg-emerald-400 h-2 rounded-full w-full"></div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center mb-6">
          <div className="bg-black/40 border border-white/10 rounded-full p-1 flex items-center">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={cn("px-4 py-1.5 rounded-full text-sm font-medium transition-colors", billingCycle === 'monthly' ? "bg-white/10 text-white" : "text-neutral-500 hover:text-neutral-300")}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle('annual')}
              className={cn("px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2", billingCycle === 'annual' ? "bg-white/10 text-white" : "text-neutral-500 hover:text-neutral-300")}
            >
              Annually <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-full border border-emerald-400/20">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <Card key={plan.name} className={cn("relative bg-black/40 flex flex-col", plan.border, plan.current ? "shadow-[0_0_30px_-10px_rgba(79,70,229,0.3)] border-2" : "border")}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-500 text-white text-[10px] uppercase tracking-wider font-bold rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn("p-2 rounded-lg border", plan.bg, plan.border)}>
                    <plan.icon className={cn("h-4 w-4", plan.color)} />
                  </div>
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                </div>
                <CardDescription className="min-h-[40px]">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-3xl font-display font-bold text-white">
                    {plan.price !== 'Custom' && billingCycle === 'annual' 
                      ? `$${Math.floor(parseInt(plan.price.replace('$','')) * 0.8)}` 
                      : plan.price}
                  </span>
                  <span className="text-neutral-500 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                      <Check className={cn("h-4 w-4 shrink-0 mt-0.5", plan.color)} />
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={plan.current ? "outline" : plan.popular ? "neon" : "glass"} 
                  className={cn("w-full", plan.current && "border-indigo-500/50 text-indigo-300 pointer-events-none")}
                  disabled={plan.current}
                >
                  {plan.current ? "Current Plan" : plan.price === "Custom" ? "Contact Sales" : "Upgrade"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Invoice History */}
      <Card className="bg-black/40 border-white/5">
        <CardHeader className="border-b border-white/5 pb-4">
          <CardTitle className="flex items-center gap-2 text-lg"><Receipt className="h-5 w-5 text-neutral-400" /> Invoice History</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 p-0">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-neutral-500 uppercase border-b border-white/5">
              <tr>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { date: "Oct 01, 2026", amount: "$79.00", status: "Paid" },
                { date: "Sep 01, 2026", amount: "$79.00", status: "Paid" },
                { date: "Aug 01, 2026", amount: "$79.00", status: "Paid" },
              ].map((invoice, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-neutral-300">{invoice.date}</td>
                  <td className="px-6 py-4 font-mono text-white">{invoice.amount}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">{invoice.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-indigo-400 hover:text-indigo-300">Download PDF</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

    </div>
  );
}
