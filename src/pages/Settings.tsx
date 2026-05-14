import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Settings as SettingsIcon, Bell, Shield, Key, Moon, Sun, Monitor, Smartphone, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Settings() {
  const { profile } = useAuth();
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-10">
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Account Settings</h1>
          <p className="text-neutral-400 text-sm">Manage your profile, preferences, and workspace security.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <div className="space-y-1">
          {[
            { id: "profile", label: "Profile", icon: SettingsIcon, active: true },
            { id: "notifications", label: "Notifications", icon: Bell, active: false },
            { id: "security", label: "Security & Login", icon: Shield, active: false },
            { id: "api", label: "API Keys", icon: Key, active: false },
            { id: "appearance", label: "Appearance", icon: Monitor, active: false },
          ].map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                item.active 
                  ? "bg-white/10 text-white shadow-[inset_0_1px_rgba(255,255,255,0.1)] border border-white/5" 
                  : "text-neutral-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 space-y-6">
          <Card className="bg-black/40 border-white/5">
            <CardHeader className="border-b border-white/5 pb-4">
              <CardTitle className="text-lg">Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 p-[2px] shrink-0">
                  <div className="h-full w-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                    {profile?.photoURL ? (
                      <img src={profile.photoURL} alt="Avatar" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-2xl font-bold text-white uppercase">{profile?.displayName?.charAt(0) || profile?.email?.charAt(0) || "U"}</span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="border-white/10 text-white">Change Avatar</Button>
                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">Remove</Button>
                  </div>
                  <p className="text-xs text-neutral-500 mt-2">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Display Name</label>
                  <input type="text" defaultValue={profile?.displayName || ""} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="e.g. CreatorName" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Email Address</label>
                  <input type="email" disabled defaultValue={profile?.email || ""} className="w-full bg-white/5 border border-white/5 rounded-lg px-4 py-2 text-sm text-neutral-500 cursor-not-allowed" />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button variant="neon" className="px-6 rounded-full">Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-white/5">
            <CardHeader className="border-b border-white/5 pb-4">
              <CardTitle className="text-lg">Two-Factor Authentication (2FA)</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-medium text-white mb-1 flex items-center gap-2">
                    Authenticator App
                    {is2FAEnabled && (
                      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                        <Check className="h-3 w-3" /> Enabled
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-neutral-400 max-w-md">Use an app like Authy or Google Authenticator to get daily codes to secure your account.</p>
                </div>
                {is2FAEnabled ? (
                  <Button variant="outline" onClick={() => setIs2FAEnabled(false)} className="border-red-500/20 text-red-400 hover:bg-red-500/10 shrink-0">Disable 2FA</Button>
                ) : (
                  <Button variant="outline" onClick={() => setShow2FAModal(true)} className="border-white/10 text-white shrink-0">Enable 2FA</Button>
                )}
              </div>

              {show2FAModal && !is2FAEnabled && (
                 <div className="mt-4 p-4 border border-indigo-500/50 bg-indigo-500/10 rounded-xl space-y-4 animate-in fade-in zoom-in-95">
                    <h5 className="text-sm font-medium text-white">Scan QR Code</h5>
                    <p className="text-xs text-neutral-300">Scan this code with your authenticator app, then enter the 6-digit code below to verify.</p>
                    <div className="bg-white p-2 w-32 h-32 rounded-lg mx-auto flex items-center justify-center">
                       {/* Mock QR Code */}
                       <div className="w-full h-full bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=otpauth://totp/AIStudio:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=AIStudio')] bg-contain bg-center bg-no-repeat" />
                    </div>
                    <div className="flex gap-2">
                       <input 
                         type="text" 
                         maxLength={6}
                         placeholder="000000" 
                         className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-center tracking-widest text-white text-lg focus:outline-none focus:ring-1 focus:ring-indigo-500" 
                       />
                       <Button variant="neon" onClick={() => {
                         setIs2FAEnabled(true);
                         setShow2FAModal(false);
                       }}>Verify</Button>
                    </div>
                 </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="border-red-500/20 bg-red-500/5">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                 <div>
                   <h4 className="text-base font-medium text-white mb-1">Delete Account</h4>
                   <p className="text-sm text-neutral-400">Permanently remove your account and all team data. This action cannot be undone.</p>
                 </div>
                 <Button variant="destructive" className="shrink-0">Delete Account</Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
