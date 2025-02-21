import express from 'express';
import { TodoList } from './todoModel.js';
import { todoValidationSchema } from './todoValidation.js';
// Import Types from mongoose

const router = express.Router();

// Add task
router.post(
  '/add',
  async (req, res, next) => {
    // extract new task from req.body
    const task = req.body;
    // validate new todo
    try {
      const validatedTodo = await todoValidationSchema.validate(task);
      req.body = validatedTodo;
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  async (req, res) => {
    // extract new task from req.body
    const task = req.body;
    // Create task
    await TodoList.create(task);
    // send response
    return res.status(200).send({ message: 'Todo created successfully' });
  }
);

// Get Task Details
router.get('/details', async (req, res) => {
  //extract product id from req.params
  const taskId = req.params.id;
  //find task
  const task = await TodoList.find({ taskId });
  // if not find task throw error
  if (!task) {
    return res.status(404).send({ message: 'Task does not exist.' });
  }
  // send task with response
  return res
    .status(200)
    .send({ message: 'Todo displayed successfully', TaskDetails: task });
});

// Delete Task
router.delete('/delete/:id', async (req, res) => {
  // extract id from req.params
  const taskId = req.params.id;
  // find task
  const result = await TodoList.findByIdAndDelete({ _id: taskId });
  // if not task find throw error
  if (!result) {
    return res.status(400).send({ message: 'Task does not exist' });
  }
  // send response
  res
    .status(200)
    .send({ message: 'Todo deleted successfully', result: result });
});

// Edit Task
router.put(
  '/edit/:id',
  // mongoIdValidity,
  async (req, res, next) => {
    // extract new task from req.body
    const task = req.body;
    // validate new todo
    try {
      const validatedTodo = await todoValidationSchema.validate(task);
      req.body = validatedTodo;
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  async (req, res) => {
    // extract new task id from req.params
    const taskId = req.params.id;
    //find task
    const newTask = await TodoList.findById(taskId);
    // if not find task throw error
    if (!newTask) {
      return res.status(404).send({ message: 'Task does not exist.' });
    }
    const newTaskValue = req.body;
    await TodoList.updateOne({ _id: taskId }, { $set: { ...newTaskValue } });
    // send response
    return res.status(200).send({ message: 'Task is updated successfully' });
  }
);

//-----------------------------------
router.get('/details/edit/:id', async (req, res) => {
  //extract product id from req.params
  const taskId = req.params.id;
  //find task
  const task = await TodoList.findById(taskId);
  // if not find task throw error
  if (!task) {
    return res.status(404).send({ message: 'Task does not exist.' });
  }
  // send task with response
  return res
    .status(200)
    .send({ message: 'Todo updated successfully', TaskDetails: task });
});

export default router;
