const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface px-4 text-center dark:bg-slate-900">
      <span className="text-6xl font-black text-primary">404</span>
      <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Page not found</h1>
      <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <a href="/" className="btn-primary mt-2">
        Back to Dashboard
      </a>
    </div>
  );
};

export default NotFound;
