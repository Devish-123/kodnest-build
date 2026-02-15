import type { Job } from "@/types/job";
import type { UserPreferences } from "@/types/preferences";

/**
 * Deterministic match score for a job against user preferences.
 * Each rule is applied at most once. Total capped at 100.
 *
 * +25 if any roleKeyword appears in job.title (case-insensitive)
 * +15 if any roleKeyword appears in job.description
 * +15 if job.location is in preferredLocations
 * +10 if job.mode is in preferredMode
 * +10 if job.experience matches experienceLevel
 * +15 if any overlap between job.skills and user skills (comma-separated list)
 * +5 if postedDaysAgo <= 2
 * +5 if source is LinkedIn
 */
export function computeMatchScore(
  job: Job,
  preferences: UserPreferences | null,
): number {
  if (!preferences) return 0;

  let score = 0;

  const roleKeywords = preferences.roleKeywords
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const titleLower = job.title.toLowerCase();
  const descLower = job.description.toLowerCase();

  if (roleKeywords.length > 0) {
    const inTitle = roleKeywords.some((kw) => titleLower.includes(kw));
    if (inTitle) score += 25;
    const inDesc = roleKeywords.some((kw) => descLower.includes(kw));
    if (inDesc) score += 15;
  }

  if (
    preferences.preferredLocations.length > 0 &&
    preferences.preferredLocations.includes(job.location)
  ) {
    score += 15;
  }

  if (
    preferences.preferredMode.length > 0 &&
    preferences.preferredMode.includes(job.mode)
  ) {
    score += 10;
  }

  if (
    preferences.experienceLevel !== "" &&
    job.experience === preferences.experienceLevel
  ) {
    score += 10;
  }

  const userSkills = preferences.skills
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (userSkills.length > 0) {
    const jobSkillsLower = job.skills.map((s) => s.toLowerCase());
    const overlap = userSkills.some((us) =>
      jobSkillsLower.some((js) => js.includes(us) || us.includes(js)),
    );
    if (overlap) score += 15;
  }

  if (job.postedDaysAgo <= 2) score += 5;
  if (job.source === "LinkedIn") score += 5;

  return Math.min(100, score);
}
