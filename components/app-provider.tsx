"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultProfile, starterSavedProspects } from "@/lib/data";
import type { Profile, Prospect, SavedProspect } from "@/lib/types";

type AppContextValue = {
  profile: Profile;
  saved: SavedProspect[];
  updateProfile: (profile: Profile) => void;
  saveProspect: (prospect: Prospect) => void;
  updateStage: (id: string, stage: SavedProspect["stage"]) => void;
  addNote: (id: string, text: string) => void;
};

const AppContext = createContext<AppContextValue | null>(null);
const storageKey = "fieldnote-demo-v1";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState(defaultProfile);
  const [saved, setSaved] = useState(starterSavedProspects);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      try {
        const data = JSON.parse(stored) as { profile?: Profile; saved?: SavedProspect[] };
        if (data.profile) setProfile(data.profile);
        if (data.saved) setSaved(data.saved);
      } catch { window.localStorage.removeItem(storageKey); }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(storageKey, JSON.stringify({ profile, saved }));
  }, [hydrated, profile, saved]);

  const value = useMemo(() => ({
    profile, saved,
    updateProfile: setProfile,
    saveProspect: (prospect: Prospect) => setSaved((current) => current.some((item) => item.id === prospect.id) ? current : [{ ...prospect, stage: "New", notes: [], savedAt: "Today" }, ...current]),
    updateStage: (id: string, stage: SavedProspect["stage"]) => setSaved((current) => current.map((item) => item.id === id ? { ...item, stage } : item)),
    addNote: (id: string, text: string) => setSaved((current) => current.map((item) => item.id === id ? { ...item, notes: [{ id: crypto.randomUUID(), text, createdAt: "Just now" }, ...item.notes] } : item)),
  }), [profile, saved]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error("useApp must be used inside AppProvider");
  return value;
}
