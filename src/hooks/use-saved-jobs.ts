import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "job-notification-tracker-saved-ids";

function getSavedIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeSavedIds(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function useSavedJobs() {
  const [savedIds, setSavedIdsState] = useState<string[]>(() => getSavedIds());

  useEffect(() => {
    setSavedIdsState(getSavedIds());
  }, []);

  const saveJob = useCallback((id: string) => {
    setSavedIdsState((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      writeSavedIds(next);
      return next;
    });
  }, []);

  const unsaveJob = useCallback((id: string) => {
    setSavedIdsState((prev) => {
      const next = prev.filter((s) => s !== id);
      writeSavedIds(next);
      return next;
    });
  }, []);

  const isSaved = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds],
  );

  return { savedIds, saveJob, unsaveJob, isSaved };
}
