const VALID_STATUSES = ['Pending', 'In Progress', 'Completed'];
const VALID_PRIORITIES = ['Low', 'Medium', 'High'];

/**
 * Validates the request body for creating/updating a task.
 * Returns an object mapping field names to error messages.
 * An empty object means the payload is valid.
 *
 * @param {object} body - request body
 * @param {boolean} isPartial - true for updates where not all fields are required
 */
export const validateTask = (body, isPartial = false) => {
  const errors = {};
  const { title, description, status, priority, dueDate } = body;

  if (!isPartial || title !== undefined) {
    if (!title || !title.trim()) {
      errors.title = 'Title is required';
    } else if (title.trim().length > 100) {
      errors.title = 'Title cannot exceed 100 characters';
    }
  }

  if (!isPartial || description !== undefined) {
    if (!description || !description.trim()) {
      errors.description = 'Description is required';
    } else if (description.trim().length > 500) {
      errors.description = 'Description cannot exceed 500 characters';
    }
  }

  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    errors.status = `Status must be one of: ${VALID_STATUSES.join(', ')}`;
  }

  if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
    errors.priority = `Priority must be one of: ${VALID_PRIORITIES.join(', ')}`;
  }

  if (!isPartial || dueDate !== undefined) {
    if (!dueDate) {
      errors.dueDate = 'Due date is required';
    } else {
      const parsed = new Date(dueDate);
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      if (Number.isNaN(parsed.getTime())) {
        errors.dueDate = 'Due date must be a valid date';
      } else if (parsed < startOfToday) {
        errors.dueDate = 'Due date cannot be in the past';
      }
    }
  }

  return errors;
};
