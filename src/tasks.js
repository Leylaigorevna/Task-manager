import { state } from './state.js';

export function updateTask(id, updates) {
    const taskIndex = state.tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        state.tasks[taskIndex] = { 
            ...state.tasks[taskIndex], 
            ...updates };
    }

    saveToLocalStorage();
}

export function addTask(taskData) {

    if (!taskData.title || taskData.title.trim() === '') {
    alert('Please, enter task title!');
    return;
  }

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
  

  state.tasks.push(newTask);

  saveToLocalStorage();
}

export function deleteTask(id) {
  state.tasks = state.tasks.filter(task => task.id !== id);
  saveToLocalStorage();
}

function saveToLocalStorage () {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
}