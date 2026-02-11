import { state } from './state.js';

console.log('App initialized');
console.log(state);

import { addTask } from './tasks.js';
import { renderTasks } from './ui.js';

const form = document.querySelector('.task-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = form.querySelector('input[type="text"]').value;
  const description = form.querySelector('textarea').value;
  const priority = form.querySelector('select').value;
  const dueDate = form.querySelector('input[type="date"]').value;

  addTask({ title, description, priority, dueDate });
  renderTasks();

  form.reset();
});