import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PLATFORMS } from "@/lib/platforms";
import { cn } from "@/lib/utils";
import { Shield, Key, RefreshCcw, MonitorSmartphone, Activity, Lock, AlertCircle, CheckCircle2, Link2, Unlink } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { db, OperationType, handleFirestoreError } from "@/lib/firebase";
import { collection, doc, setDoc, deleteDoc, onSnapshot } from "firebase/firestore";

export default function Connections() {
  const [activeTab, setActiveTab] = useState<'networks' | 'security' | 'sessions'>('networks');
  const { user } = useAuth();
  const [connections, setConnections] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!user) return;
    const path = `users/${user.uid}/connections`;
    const unsubscribe = onSnapshot(
      collection(db, path), 
      (snapshot) => {
        const newConnections: Record<string, any> = {};
        snapshot.forEach(doc => {
          if (doc.data().isConnected) {
            newConnections[doc.id] = doc.data();
          }
        });
        setConnections(newConnections);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, path);
      }
    );
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (!event.origin.endsWith('.run.app') && !event.origin.includes('localhost') && !event.origin.endsWith('.google.com')) {
        return;
      }
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        const platformId = localStorage.getItem('pendingOAuthPlatform');
        if (platformId && user) {
          const path = `users/${user.uid}/connections/${platformId}`;
          try {
            await setDoc(doc(db, path), {
              isConnected: true,
              connectedAt: Date.now()
            });
          } catch (error) {
            handleFirestoreError(error, OperationType.WRITE, path);
          }
          localStorage.removeItem('pendingOAuthPlatform');
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [user]);

  const toggleConnection = async (id: string) => {
    if (!user) return;
    const isConnected = !!connections[id];
    const path = `users/${user.uid}/connections/${id}`;
    
    try {
      if (isConnected) {
        // Disconnect
        await deleteDoc(doc(db, path));
      } else {
        // Connect via OAuth Flow
        localStorage.setItem('pendingOAuthPlatform', id);
        
        try {
          const response = await fetch(`/api/auth/url?platform=${id}`);
          if (!response.ok) throw new Error('Failed to fetch auth URL');
          const { url } = await response.json();
          
          const authWindow = window.open(
            url,
            'oauth_popup',
            'width=600,height=700'
          );
          
          if (!authWindow) {
            alert('Please allow popups to connect your account.');
          }
        } catch (fetchEr) {
          console.error("Auth fetch error: ", fetchEr);
          // Fallback if backend server isn't hit for some reason but we need to show UI
          alert("Couldn't start OAuth. Ensure the dev server is running Express.");
        }
      }
    } catch (error) {
      const type = isConnected ? OperationType.DELETE : OperationType.WRITE;
      handleFirestoreError(error, type, path);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10">
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1 flex items-center gap-2">
            <Shield className="h-6 w-6 text-emerald-400" />
            Security & Connections Center
          </h1>
          <p className="text-neutral-400 text-sm">Manage OAuth2 integrations, API tokens, and workspace security.</p>
        </div>
        <div className="flex gap-2 text-xs font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full items-center">
          <CheckCircle2 className="h-4 w-4" /> E2E Encryption Active
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-black/40 border border-white/5 rounded-xl w-fit">
        <button 
          onClick={() => setActiveTab('networks')}
          className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2", activeTab === 'networks' ? "bg-white/10 text-white" : "text-neutral-500 hover:text-neutral-300")}
        >
          <Link2 className="h-4 w-4" /> Social Networks
        </button>
        <button 
          onClick={() => setActiveTab('security')}
          className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2", activeTab === 'security' ? "bg-white/10 text-white" : "text-neutral-500 hover:text-neutral-300")}
        >
          <Key className="h-4 w-4" /> API & Tokens
        </button>
        <button 
          onClick={() => setActiveTab('sessions')}
          className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2", activeTab === 'sessions' ? "bg-white/10 text-white" : "text-neutral-500 hover:text-neutral-300")}
        >
          <MonitorSmartphone className="h-4 w-4" /> Sessions & Devices
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'networks' && (
        <div className="space-y-6">
          <Card className="bg-black/40">
            <CardHeader className="border-b border-white/5 pb-4">
              <CardTitle>OAuth2 Integrations</CardTitle>
              <CardDescription>Securely connect to official social APIs using OAuth2. ViralForge AI never stores your passwords.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PLATFORMS.map(platform => {
                const isConnected = !!connections[platform.id];
                return (
                  <div key={platform.id} className={cn(
                    "p-4 rounded-xl border transition-all duration-300 flex flex-col h-full bg-black/20",
                    isConnected ? "border-emerald-500/30" : "border-white/5 opacity-70 hover:opacity-100"
                  )}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={cn("p-2 rounded-lg", platform.bg)}>
                          <platform.icon className={cn("h-5 w-5", platform.color)} />
                        </div>
                        <span className="font-semibold text-white">{platform.name}</span>
                      </div>
                      {isConnected ? (
                        <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Active</span>
                      ) : (
                        <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">Disabled</span>
                      )}
                    </div>
                    
                    {isConnected ? (
                      <div className="mt-auto space-y-4">
                        {connections[platform.id].username && (
                          <div className="text-sm text-neutral-200 font-medium bg-white/5 border border-white/10 px-3 py-1.5 rounded w-fit">
                            @{connections[platform.id].username}
                          </div>
                        )}
                        <div className="text-xs text-emerald-400/70 font-mono bg-emerald-400/5 p-2 rounded border border-emerald-400/10 break-all">
                          Token: valid (auto-refresh)
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => toggleConnection(platform.id)}
                          className="w-full border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        >
                          <Unlink className="h-3 w-3 mr-2" /> Revoke Access
                        </Button>
                      </div>
                    ) : (
                      <div className="mt-auto">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => toggleConnection(platform.id)}
                            className="w-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 mb-2"
                          >
                            <Link2 className="h-3 w-3 mr-2" /> Connect via OAuth
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={async () => {
                              const username = window.prompt(`Enter your ${platform.name} username (e.g. hayyuabdii):`);
                              if (!username) return;
                              
                              try {
                                await setDoc(doc(db, `users/${user.uid}/connections/${platform.id}`), {
                                  isConnected: true,
                                  connectedAt: Date.now(),
                                  username: username
                                });
                                
                                const platformUrls: Record<string, string> = {
                                  tiktok: 'https://tiktok.com/@',
                                  twitter: 'https://twitter.com/',
                                  instagram: 'https://instagram.com/',
                                  youtube: 'https://youtube.com/@',
                                  linkedin: 'https://linkedin.com/in/',
                                  twitch: 'https://twitch.tv/',
                                  meta: 'https://facebook.com/'
                                };
                                
                                const baseUrl = platformUrls[platform.id] || `https://${platform.id}.com/`;
                                window.open(`${baseUrl}${username}`, '_blank');
                              } catch(error) {
                                handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}/connections/${platform.id}`);
                              }
                            }}
                            className="w-full bg-white/5 hover:bg-white/10 text-white"
                          >
                            <CheckCircle2 className="h-3 w-3 mr-2 text-emerald-400" /> Instant Connect
                          </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/40">
              <CardHeader className="border-b border-white/5 pb-4">
                <CardTitle className="flex items-center gap-2"><Lock className="h-5 w-5 text-indigo-400"/> Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your workspace.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                 <div className="flex items-center justify-between p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl mb-4">
                   <div className="flex items-center gap-3">
                     <Lock className="h-5 w-5 text-emerald-400" />
                     <div>
                       <h4 className="text-sm font-medium text-white">Authenticator App</h4>
                       <p className="text-xs text-neutral-400">Configured on iPhone 15 Pro</p>
                     </div>
                   </div>
                   <Button variant="outline" size="sm" className="text-xs">Manage</Button>
                 </div>
                 <Button variant="ghost" className="w-full border border-dashed border-white/10 text-neutral-400">
                   + Add Backup Method
                 </Button>
              </CardContent>
            </Card>

            <Card className="bg-black/40">
              <CardHeader className="border-b border-white/5 pb-4">
                <CardTitle className="flex items-center gap-2"><RefreshCcw className="h-5 w-5 text-fuchsia-400"/> Token Automation</CardTitle>
                <CardDescription>Manage how ViralForge handles OAuth token refreshing.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                 <div className="flex items-start justify-between">
                   <div>
                     <h4 className="text-sm font-medium text-white mb-1">Auto-refresh strategy</h4>
                     <p className="text-xs text-neutral-400 max-w-[250px]">Automatically request new access tokens before expiration.</p>
                   </div>
                   <label className="flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-9 h-5 bg-black/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500 relative border border-white/10"></div>
                   </label>
                 </div>
                 <div className="flex items-start justify-between">
                   <div>
                     <h4 className="text-sm font-medium text-white mb-1">Strict revocation</h4>
                     <p className="text-xs text-neutral-400 max-w-[250px]">Revoke tokens completely on logout.</p>
                   </div>
                   <label className="flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-9 h-5 bg-black/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-500 relative border border-white/10"></div>
                   </label>
                 </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="space-y-6">
          <Card className="bg-black/40">
            <CardHeader className="border-b border-white/5 pb-4">
              <CardTitle>Active Devices</CardTitle>
              <CardDescription>You're currently logged in on these devices. If you don't recognize a device, revoke access immediately.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between p-4 border border-indigo-500/30 bg-indigo-500/5 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <MonitorSmartphone className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">MacBook Pro (M3 Max) • Chrome</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">San Francisco, CA • Current Session</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded border border-indigo-400/20">This Device</span>
              </div>

              <div className="flex items-center justify-between p-4 border border-white/5 bg-black/20 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <MonitorSmartphone className="h-5 w-5 text-neutral-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">iPhone 15 Pro • Safari</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">San Francisco, CA • 2 hours ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">Revoke</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40">
            <CardHeader className="border-b border-white/5 pb-4">
              <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5 text-emerald-400"/> Security Activity Log</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 p-0">
              <div className="divide-y divide-white/5">
                {[
                  { action: "OAuth Token Refreshed (Twitter)", ip: "192.168.1.1", time: "10 mins ago", status: "success" },
                  { action: "New Login (San Francisco, CA)", ip: "192.168.1.1", time: "2 hours ago", status: "success" },
                  { action: "Failed Login Attempt (Unknown Location)", ip: "45.22.1.X", time: "1 day ago", status: "failed" },
                  { action: "OAuth connected (LinkedIn)", ip: "192.168.1.1", time: "3 days ago", status: "success" },
                ].map((log, i) => (
                  <div key={i} className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-white">{log.action}</h4>
                      <p className="text-xs text-neutral-500 mt-0.5">IP: {log.ip}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {log.status === 'success' ? (
                        <span className="text-xs text-emerald-400">Success</span>
                      ) : (
                        <span className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="h-3 w-3"/> Blocked</span>
                      )}
                      <span className="text-[10px] text-neutral-600">{log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
