import { state } from './state.js';

export function addTask(taskData) {
  const newTask = {
    id: crypto.randomUUID(),
    title: taskData.title,
    description: taskData.description,
    priority: taskData.priority,
    category: taskData.category || 'general',
    dueDate: taskData.dueDate,
    completed: false,
    createdAt: new Date().toISOString()
  };
  if (!taskData.title || taskData.title.trim() === '') {
    alert('Please, enter task title!');
    return;
  }

  state.tasks.push(newTask);
}

export function deleteTask(id) {
  state.tasks = state.tasks.filter(task => task.id !== id);
}