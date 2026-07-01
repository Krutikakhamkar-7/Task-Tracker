const Loader = ({ label = 'Loading tasks...' }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-100 border-t-primary" />
      <p className="text-sm font-medium text-slate-400 dark:text-slate-500">{label}</p>
    </div>
  );
};

export default Loader;
