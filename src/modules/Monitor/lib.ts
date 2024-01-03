export function formatCheckIntervalToMinutes(intervalInSeconds: number) {
  if (intervalInSeconds === 30) {
    return `${intervalInSeconds} seconds`;
  }

  return `${intervalInSeconds / 60} minutes`;
}
