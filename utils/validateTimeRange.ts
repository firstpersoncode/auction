import { isAfter } from "date-fns";

export default function validateTimeRange(start: Date, end: Date): boolean {
  if (!(start && end)) return false;

  const startDate = new Date(start);
  const endDate = new Date(end);
  if (isAfter(startDate, endDate)) return false;

  return true;
}
