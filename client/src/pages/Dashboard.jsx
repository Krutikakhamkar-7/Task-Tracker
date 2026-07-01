import { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import SortDropdown from '../components/SortDropdown';
import TaskCard from '../components/TaskCard';
import TaskFormModal from '../components/TaskFormModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';
import useTasks from '../hooks/useTasks';
import useDarkMode from '../hooks/useDarkMode';

const Dashboard = () => {
  const { isDark, toggleDarkMode } = useDarkMode();
  const {
    tasks,
    loading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    addTask,
    editTask,
    removeTask,
  } = useTasks();

  const [formModal, setFormModal] = useState({ open: false, task: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, task: null });
  const [isDeleting, setIsDeleting] = useState(false);

  const hasFilters = Boolean(search) || statusFilter !== 'All';

  const handleFormSubmit = async (payload) => {
    if (formModal.task) {
      await editTask(formModal.task._id, payload);
    } else {
      await addTask(payload);
    }
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await removeTask(deleteModal.task._id);
      setDeleteModal({ open: false, task: null });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface transition-colors dark:bg-slate-900">
      <Navbar
        isDark={isDark}
        toggleDarkMode={toggleDarkMode}
        onCreate={() => setFormModal({ open: true, task: null })}
        taskCount={tasks.length}
      />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <SearchBar value={search} onChange={setSearch} />
          <div className="flex gap-3">
            <FilterDropdown value={statusFilter} onChange={setStatusFilter} />
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : tasks.length === 0 ? (
          <EmptyState onCreate={() => setFormModal({ open: true, task: null })} hasFilters={hasFilters} />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={(t) => setFormModal({ open: true, task: t })}
                onDelete={(t) => setDeleteModal({ open: true, task: t })}
              />
            ))}
          </div>
        )}
      </main>

      {formModal.open && (
        <TaskFormModal
          task={formModal.task}
          onClose={() => setFormModal({ open: false, task: null })}
          onSubmit={handleFormSubmit}
        />
      )}

      {deleteModal.open && (
        <DeleteConfirmModal
          task={deleteModal.task}
          onCancel={() => setDeleteModal({ open: false, task: null })}
          onConfirm={handleConfirmDelete}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default Dashboard;
