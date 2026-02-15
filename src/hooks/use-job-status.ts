import { useCallback, useEffect, useState } from "react";

export type JobStatus = "Not Applied" | "Applied" | "Rejected" | "Selected";

export interface StatusUpdate {
  jobId: string;
  status: JobStatus;
  changedAt: number;
}

export const STATUSES: JobStatus[] = ["Not Applied", "Applied", "Rejected", "Selected"];

const STATUS_STORAGE_KEY = "jobTrackerStatus";
const UPDATES_STORAGE_KEY = "jobTrackerStatusUpdates";

function getStatusMap(): Record<string, JobStatus> {
  try {
    const raw = localStorage.getItem(STATUS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function writeStatusMap(map: Record<string, JobStatus>) {
  localStorage.setItem(STATUS_STORAGE_KEY, JSON.stringify(map));
}

function getStatusUpdates(): StatusUpdate[] {
  try {
    const raw = localStorage.getItem(UPDATES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStatusUpdates(updates: StatusUpdate[]) {
  localStorage.setItem(UPDATES_STORAGE_KEY, JSON.stringify(updates));
}

export function useJobStatus() {
  const [statusMap, setStatusMapState] = useState<Record<string, JobStatus>>(() => getStatusMap());
  const [recentUpdates, setRecentUpdatesState] = useState<StatusUpdate[]>(() => {
    const updates = getStatusUpdates();
    return updates
      .sort((a, b) => b.changedAt - a.changedAt)
      .slice(0, 10);
  });

  useEffect(() => {
    setStatusMapState(getStatusMap());
    const updates = getStatusUpdates();
    setRecentUpdatesState(
      updates
        .sort((a, b) => b.changedAt - a.changedAt)
        .slice(0, 10)
    );
  }, []);

  const getStatus = useCallback(
    (jobId: string): JobStatus => {
      return statusMap[jobId] || "Not Applied";
    },
    [statusMap]
  );

  const setStatus = useCallback(
    (jobId: string, status: JobStatus) => {
      setStatusMapState((prev) => {
        const next = { ...prev, [jobId]: status };
        writeStatusMap(next);
        return next;
      });

      // Record update for Applied/Rejected/Selected only
      if (status !== "Not Applied") {
        const update: StatusUpdate = {
          jobId,
          status,
          changedAt: Date.now(),
        };

        setRecentUpdatesState((prev) => {
          const filtered = prev.filter((u) => u.jobId !== jobId);
          const next = [update, ...filtered].sort((a, b) => b.changedAt - a.changedAt).slice(0, 10);
          writeStatusUpdates(next);
          return next;
        });
      } else {
        // Remove update record when status is reset to "Not Applied"
        setRecentUpdatesState((prev) => {
          const next = prev.filter((u) => u.jobId !== jobId);
          writeStatusUpdates(next);
          return next;
        });
      }
    },
    []
  );

  return { getStatus, setStatus, statusMap, recentUpdates, STATUSES };
}
