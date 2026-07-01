import { useEffect, useState } from 'react';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../utils/constants';
import { todayISODate, toDateInputValue } from '../utils/helpers';

const emptyForm = {
  title: '',
  description: '',
  status: 'Pending',
  priority: 'Medium',
  dueDate: '',
};

const TaskFormModal = ({ task, onClose, onSubmit }) => {
  const isEditMode = Boolean(task);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: toDateInputValue(task.dueDate),
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [task]);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    else if (form.title.length > 100) newErrors.title = 'Title cannot exceed 100 characters';

    if (!form.description.trim()) newErrors.description = 'Description is required';
    else if (form.description.length > 500) newErrors.description = 'Description cannot exceed 500 characters';

    if (!form.dueDate) newErrors.dueDate = 'Due date is required';
    else if (form.dueDate < todayISODate()) newErrors.dueDate = 'Due date cannot be in the past';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await onSubmit(form);
      onClose();
    } catch (err) {
      const serverErrors = err?.response?.data?.errors;
      if (serverErrors) {
        setErrors(serverErrors);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 px-4 py-6 animate-fade-in sm:items-center">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl animate-scale-in dark:bg-slate-800">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            {isEditMode ? 'Edit Task' : 'Add New Task'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g. Design landing page"
              className="input-field"
              maxLength={100}
            />
            <div className="mt-1 flex justify-between text-xs">
              <span className="text-danger">{errors.title || ''}</span>
              <span className="text-slate-400">{form.title.length}/100</span>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Add more details about this task..."
              className="input-field min-h-[90px] resize-none"
              maxLength={500}
            />
            <div className="mt-1 flex justify-between text-xs">
              <span className="text-danger">{errors.description || ''}</span>
              <span className="text-slate-400">{form.description.length}/500</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="input-field cursor-pointer"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Priority
              </label>
              <select
                value={form.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
                className="input-field cursor-pointer"
              >
                {PRIORITY_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Due Date
            </label>
            <input
              type="date"
              value={form.dueDate}
              min={todayISODate()}
              onChange={(e) => handleChange('dueDate', e.target.value)}
              className="input-field"
            />
            {errors.dueDate && <p className="mt-1 text-xs text-danger">{errors.dueDate}</p>}
          </div>

          <div className="mt-2 flex gap-3">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1" disabled={submitting}>
              {submitting ? 'Saving...' : isEditMode ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;
