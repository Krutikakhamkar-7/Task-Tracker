const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const Navbar = ({ isDark, toggleDarkMode, onCreate, taskCount }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight text-slate-800 dark:text-slate-100">
              Task Tracker
            </h1>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button onClick={onCreate} className="btn-primary hidden sm:inline-flex">
            + Add Task
          </button>
          <button
            onClick={onCreate}
            aria-label="Add task"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-sm sm:hidden"
          >
            +
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
