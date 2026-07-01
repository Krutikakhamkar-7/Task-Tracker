import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    status: {
      type: String,
      enum: {
        values: ['Pending', 'In Progress', 'Completed'],
        message: '{VALUE} is not a valid status',
      },
      default: 'Pending',
    },
    priority: {
      type: String,
      enum: {
        values: ['Low', 'Medium', 'High'],
        message: '{VALUE} is not a valid priority',
      },
      default: 'Medium',
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
      validate: {
        validator: function (value) {
          // Allow the current day; only reject dates strictly before today
          const startOfToday = new Date();
          startOfToday.setHours(0, 0, 0, 0);
          return value >= startOfToday;
        },
        message: 'Due date cannot be in the past',
      },
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
