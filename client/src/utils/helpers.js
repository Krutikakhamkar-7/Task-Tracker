/**
 * Formats an ISO date string into a short, readable date (e.g. "Jul 4, 2026").
 */
export const formatDate = (isoDate) => {
  if (!isoDate) return '';
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Returns today's date as a YYYY-MM-DD string, suitable for an
 * <input type="date" min="..."> attribute.
 */
export const todayISODate = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().split('T')[0];
};

/**
 * Converts an ISO datetime string into a YYYY-MM-DD string for form inputs.
 */
export const toDateInputValue = (isoDate) => {
  if (!isoDate) return '';
  return new Date(isoDate).toISOString().split('T')[0];
};

/**
 * Returns true if the given due date is before today (and task isn't completed).
 */
export const isOverdue = (isoDate, status) => {
  if (!isoDate || status === 'Completed') return false;
  const due = new Date(isoDate);
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  return due < startOfToday;
};
