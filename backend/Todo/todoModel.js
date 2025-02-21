import mongoose from 'mongoose';

// set rule
const todoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Sets the default value to the current date/time
  },
});

// create table
export const TodoList = mongoose.model('TodoList', todoSchema);
