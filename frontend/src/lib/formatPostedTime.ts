// Constants for better readability
const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;
const MONTH_MS = 30 * DAY_MS; // Approximate
const YEAR_MS = 12 * MONTH_MS; // Approximate

export function formatPostedTime(createdAt: string): string {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const timeDiff = now.getTime() - createdDate.getTime();

  if (timeDiff < MINUTE_MS) {
    return "Just now";
  }

  if (timeDiff < HOUR_MS) {
    const minutes = Math.floor(timeDiff / MINUTE_MS);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }

  if (timeDiff < DAY_MS) {
    const hours = Math.floor(timeDiff / HOUR_MS);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  if (timeDiff < MONTH_MS) {
    const days = Math.floor(timeDiff / DAY_MS);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }

  if (timeDiff < YEAR_MS) {
    const months = Math.floor(timeDiff / MONTH_MS);
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  }

  return createdDate.toLocaleDateString();
}
