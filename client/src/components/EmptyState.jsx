const EmptyState = ({ onCreate, hasFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-slate-200 bg-white/60 px-6 py-20 text-center dark:border-slate-700 dark:bg-slate-800/40">
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-90"
      >
        <rect x="20" y="16" width="80" height="96" rx="10" fill="#EEF2FF" />
        <rect x="20" y="16" width="80" height="96" rx="10" stroke="#C7D2FE" strokeWidth="2" />
        <rect x="34" y="34" width="52" height="8" rx="4" fill="#C7D2FE" />
        <rect x="34" y="52" width="36" height="6" rx="3" fill="#DDD6FE" />
        <circle cx="60" cy="86" r="18" fill="#4F46E5" />
        <path d="M52 86l6 6 12-12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div>
        <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200">
          {hasFilters ? 'No tasks match your filters' : 'No tasks yet'}
        </h3>
        <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
          {hasFilters
            ? 'Try adjusting your search or filters.'
            : 'Get started by creating your first task.'}
        </p>
      </div>
      {!hasFilters && (
        <button onClick={onCreate} className="btn-primary">
          + Add Task
        </button>
      )}
    </div>
  );
};

export default EmptyState;
