import React from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router";
import { AppLayout } from "./components/layout/AppLayout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import AIStudio from "./pages/AIStudio";
import Scheduler from "./pages/Scheduler";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Connections from "./pages/Connections";
import Admin from "./pages/Admin";
import Billing from "./pages/Billing";
import CurrentlyContents from "./pages/CurrentlyContents";
import { useAuth } from "./contexts/AuthContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

function Root() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  if (isLanding) {
    return <Landing />;
  }

  return (
    <ProtectedRoute>
      <AppLayout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/studio" element={<AIStudio />} />
          <Route path="/scheduler" element={<Scheduler />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/currently-contents" element={<CurrentlyContents />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AppLayout>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Root />} />
      </Routes>
    </BrowserRouter>
  );
}

