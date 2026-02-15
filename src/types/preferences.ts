import type { JobMode, JobExperience } from "./job";

export interface UserPreferences {
  roleKeywords: string;
  preferredLocations: string[];
  preferredMode: JobMode[];
  experienceLevel: JobExperience | "";
  skills: string;
  minMatchScore: number;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  roleKeywords: "",
  preferredLocations: [],
  preferredMode: [],
  experienceLevel: "",
  skills: "",
  minMatchScore: 40,
};
