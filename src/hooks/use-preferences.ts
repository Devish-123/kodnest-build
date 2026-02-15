import { useCallback, useEffect, useState } from "react";
import type { UserPreferences } from "@/types/preferences";
import { DEFAULT_PREFERENCES } from "@/types/preferences";

const STORAGE_KEY = "jobTrackerPreferences";

function loadPreferences(): UserPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PREFERENCES };
    const parsed = JSON.parse(raw) as Partial<UserPreferences>;
    return {
      roleKeywords: parsed.roleKeywords ?? DEFAULT_PREFERENCES.roleKeywords,
      preferredLocations: Array.isArray(parsed.preferredLocations)
        ? parsed.preferredLocations
        : DEFAULT_PREFERENCES.preferredLocations,
      preferredMode: Array.isArray(parsed.preferredMode)
        ? parsed.preferredMode
        : DEFAULT_PREFERENCES.preferredMode,
      experienceLevel:
        parsed.experienceLevel ?? DEFAULT_PREFERENCES.experienceLevel,
      skills: parsed.skills ?? DEFAULT_PREFERENCES.skills,
      minMatchScore:
        typeof parsed.minMatchScore === "number" &&
        parsed.minMatchScore >= 0 &&
        parsed.minMatchScore <= 100
          ? parsed.minMatchScore
          : DEFAULT_PREFERENCES.minMatchScore,
    };
  } catch {
    return { ...DEFAULT_PREFERENCES };
  }
}

function savePreferences(prefs: UserPreferences): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export function usePreferences() {
  const [prefs, setPrefs] = useState<UserPreferences>(() => loadPreferences());

  useEffect(() => {
    setPrefs(loadPreferences());
  }, []);

  const save = useCallback((next: UserPreferences) => {
    setPrefs(next);
    savePreferences(next);
  }, []);

  const hasPreferences = useCallback(() => {
    const p = loadPreferences();
    return (
      p.roleKeywords.trim() !== "" ||
      p.preferredLocations.length > 0 ||
      p.preferredMode.length > 0 ||
      p.experienceLevel !== "" ||
      p.skills.trim() !== ""
    );
  }, []);

  return {
    preferences: prefs,
    save,
    load: () => setPrefs(loadPreferences()),
    hasPreferences,
  };
}