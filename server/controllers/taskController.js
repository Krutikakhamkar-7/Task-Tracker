import Task from '../models/Task.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { validateTask } from '../utils/validateTask.js';

/**
 * @desc    Get all tasks (supports search, filter, sort via query params)
 * @route   GET /api/tasks
 * @access  Public
 */
export const getTasks = asyncHandler(async (req, res) => {
  const { search, status, sortBy } = req.query;

  const query = {};

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

  if (status && status !== 'All') {
    query.status = status;
  }

  let sort = { createdAt: -1 }; // default: latest first

  switch (sortBy) {
    case 'oldest':
      sort = { createdAt: 1 };
      break;
    case 'dueDate':
      sort = { dueDate: 1 };
      break;
    case 'priority': {
      // Custom priority ordering: High > Medium > Low
      const tasks = await Task.find(query);
      const priorityWeight = { High: 3, Medium: 2, Low: 1 };
      tasks.sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
      return res.status(200).json({ success: true, count: tasks.length, data: tasks });
    }
    case 'latest':
    default:
      sort = { createdAt: -1 };
  }

  const tasks = await Task.find(query).sort(sort);
  res.status(200).json({ success: true, count: tasks.length, data: tasks });
});

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Public
 */
export const createTask = asyncHandler(async (req, res) => {
  const errors = validateTask(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const { title, description, status, priority, dueDate } = req.body;

  const task = await Task.create({
    title: title.trim(),
    description: description.trim(),
    status,
    priority,
    dueDate,
  });

  res.status(201).json({ success: true, data: task });
});

/**
 * @desc    Update an existing task
 * @route   PUT /api/tasks/:id
 * @access  Public
 */
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  const errors = validateTask(req.body, true);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const updatable = ['title', 'description', 'status', 'priority', 'dueDate'];
  updatable.forEach((field) => {
    if (req.body[field] !== undefined) {
      task[field] = typeof req.body[field] === 'string' ? req.body[field].trim() : req.body[field];
    }
  });

  const updatedTask = await task.save();
  res.status(200).json({ success: true, data: updatedTask });
});

/**
 * @desc    Delete a task
 * @route   DELETE /api/tasks/:id
 * @access  Public
 */
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  await task.deleteOne();
  res.status(200).json({ success: true, data: {} });
});
