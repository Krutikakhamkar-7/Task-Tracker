import { STATUS_STYLES, PRIORITY_STYLES } from '../utils/constants';
import { formatDate, isOverdue } from '../utils/helpers';

const EditIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" />
  </svg>
);

const TaskCard = ({ task, onEdit, onDelete }) => {
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div className="card group flex flex-col gap-3 p-5 hover:-translate-y-0.5 hover:shadow-card-hover">
      <div className="flex items-start justify-between gap-2">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
          {task.title}
        </h3>
        <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onEdit(task)}
            aria-label="Edit task"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-primary-50 hover:text-primary dark:hover:bg-slate-700"
          >
            <EditIcon />
          </button>
          <button
            onClick={() => onDelete(task)}
            aria-label="Delete task"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-danger-50 hover:text-danger dark:hover:bg-slate-700"
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      <p className="line-clamp-3 text-sm text-slate-500 dark:text-slate-400">{task.description}</p>

      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[task.status]}`}>
          {task.status}
        </span>
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${PRIORITY_STYLES[task.priority]}`}>
          {task.priority} Priority
        </span>
      </div>

      <div className="mt-1 flex items-center justify-between border-t border-slate-100 pt-3 text-xs dark:border-slate-700">
        <span className={`font-medium ${overdue ? 'text-danger' : 'text-slate-400 dark:text-slate-500'}`}>
          Due {formatDate(task.dueDate)}
          {overdue && ' · Overdue'}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
