import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "job-tracker-test-checklist";

export const DEFAULT_TEST_ITEMS = [
  { id: "1", label: "Landing page loads correctly" },
  { id: "2", label: "Preferences save to localStorage" },
  { id: "3", label: "Dashboard displays job listings" },
  { id: "4", label: "Match score calculates correctly" },
  { id: "5", label: "Save/unsave jobs works" },
  { id: "6", label: "Saved jobs page shows saved items" },
  { id: "7", label: "Digest generates daily top 10" },
  { id: "8", label: "Settings update preferences" },
  { id: "9", label: "Navigation works across all routes" },
  { id: "10", label: "Responsive design works on mobile" },
];

function loadCheckedIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCheckedIds(ids: string[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function useTestChecklist() {
  const [checkedIds, setCheckedIds] = useState<string[]>(() => loadCheckedIds());

  useEffect(() => {
    setCheckedIds(loadCheckedIds());
  }, []);

  const toggleItem = useCallback((id: string) => {
    setCheckedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id];
      saveCheckedIds(next);
      return next;
    });
  }, []);

  const isChecked = useCallback(
    (id: string) => checkedIds.includes(id),
    [checkedIds]
  );

  const reset = useCallback(() => {
    setCheckedIds([]);
    saveCheckedIds([]);
  }, []);

  const allChecked = checkedIds.length === DEFAULT_TEST_ITEMS.length;
  const checkedCount = checkedIds.length;
  const totalCount = DEFAULT_TEST_ITEMS.length;
  const progress = Math.round((checkedCount / totalCount) * 100);

  return {
    items: DEFAULT_TEST_ITEMS,
    checkedIds,
    checkedCount,
    totalCount,
    progress,
    allChecked,
    toggleItem,
    isChecked,
    reset,
  };
}
