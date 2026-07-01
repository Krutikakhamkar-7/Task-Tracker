export const STATUS_OPTIONS = ['Pending', 'In Progress', 'Completed'];
export const PRIORITY_OPTIONS = ['Low', 'Medium', 'High'];

export const STATUS_STYLES = {
  Pending: 'bg-warning-100 text-warning-700 dark:bg-warning-100/10 dark:text-warning',
  'In Progress': 'bg-primary-100 text-primary-700 dark:bg-primary-100/10 dark:text-primary-100',
  Completed: 'bg-success-100 text-success-700 dark:bg-success-100/10 dark:text-success',
};

export const PRIORITY_STYLES = {
  Low: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
  Medium: 'bg-warning-100 text-warning-700 dark:bg-warning-100/10 dark:text-warning',
  High: 'bg-danger-100 text-danger-700 dark:bg-danger-100/10 dark:text-danger',
};

export const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'dueDate', label: 'Due Date' },
  { value: 'priority', label: 'Priority' },
];
