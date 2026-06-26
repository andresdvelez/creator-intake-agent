const STORAGE_KEY = "creator-intake-tour-done";

export function shouldShowTourOnMount(): boolean {
  if (typeof window === "undefined") return false;
  return !localStorage.getItem(STORAGE_KEY);
}

export function markTourDone(): void {
  if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, "1");
}
