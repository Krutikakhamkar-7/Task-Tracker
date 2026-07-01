const DeleteConfirmModal = ({ task, onCancel, onConfirm, isDeleting }) => {
  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 animate-fade-in">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl animate-scale-in dark:bg-slate-800">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-danger-50 dark:bg-danger/10">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
            <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" />
          </svg>
        </div>
        <h3 className="mt-4 text-center text-base font-semibold text-slate-800 dark:text-slate-100">
          Delete this task?
        </h3>
        <p className="mt-1 text-center text-sm text-slate-500 dark:text-slate-400">
          "{task.title}" will be permanently removed. This action cannot be undone.
        </p>
        <div className="mt-6 flex gap-3">
          <button onClick={onCancel} className="btn-secondary flex-1" disabled={isDeleting}>
            Cancel
          </button>
          <button onClick={onConfirm} className="btn-danger flex-1" disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
