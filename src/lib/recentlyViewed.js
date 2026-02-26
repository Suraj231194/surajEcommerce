const RECENTLY_VIEWED_KEY = "nexora_recently_viewed";

export function saveRecentlyViewed(productId) {
  if (typeof window === "undefined") {
    return;
  }
  const stored = window.localStorage.getItem(RECENTLY_VIEWED_KEY);
  let current = [];
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        current = parsed;
      }
    } catch (error) {
      // Ignore malformed values.
    }
  }
  const next = [productId, ...current.filter((id) => id !== productId)].slice(0, 16);
  window.localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(next));
}

export function readRecentlyViewed() {
  if (typeof window === "undefined") {
    return [];
  }
  const stored = window.localStorage.getItem(RECENTLY_VIEWED_KEY);
  if (!stored) {
    return [];
  }
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}
