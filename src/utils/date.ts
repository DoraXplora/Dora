export function formatRelativeTime(date: Date) {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 10) return 'Just now';
  if (seconds < 60) return `${Math.floor(seconds)} seconds ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60)
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours === 1 ? '1 hour ago' : `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return days === 1 ? '1 day ago' : `${days} days ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return months === 1 ? '1 month ago' : `${months} months ago`;

  const years = Math.floor(days / 365);
  return years === 1 ? '1 year ago' : `${years} years ago`;
}

export function displayTimestamp(
  unixTimestamp: number,
  shortTimeZoneName = false
): string {
  const expireDate = new Date(unixTimestamp);
  const dateString = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(expireDate);
  const timeString = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hourCycle: 'h23',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: shortTimeZoneName ? 'short' : 'long',
  }).format(expireDate);
  return `${dateString} at ${timeString}`;
}

export function displayTimestampUtc(
  unixTimestamp: number,
  shortTimeZoneName = false
): string {
  const expireDate = new Date(unixTimestamp);
  const dateString = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(expireDate);
  const timeString = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hourCycle: 'h23',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'UTC',
    timeZoneName: shortTimeZoneName ? 'short' : 'long',
  }).format(expireDate);
  return `${dateString} at ${timeString}`;
}

export function displayTimestampWithoutDate(
  unixTimestamp: number,
  shortTimeZoneName = true
) {
  const expireDate = new Date(unixTimestamp);
  const timeString = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hourCycle: 'h23',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: shortTimeZoneName ? 'short' : 'long',
  }).format(expireDate);
  return timeString;
}
