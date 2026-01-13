import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description?: string;
  status: 'backlog' | 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  projectId: mongoose.Types.ObjectId;
  assignee?: mongoose.Types.ObjectId;
  createdBy?: mongoose.Types.ObjectId;
  sprintId?: string;
  dueDate?: Date;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema<ITask> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['backlog', 'todo', 'in-progress', 'done'],
      default: 'todo',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    assignee: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sprintId: {
      type: String,
    },
    dueDate: {
      type: Date,
    },
    tags: [String],
  },
  { timestamps: true }
);

const Task: Model<ITask> =
  mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);

export default Task;
