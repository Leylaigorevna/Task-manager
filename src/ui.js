import { state } from './state.js';

export function renderTasks() {
  const container = document.querySelector('.task-list');
  container.innerHTML = '';

  state.tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');

    taskElement.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <small>Priority: ${task.priority}</small>
    `;

    container.appendChild(taskElement);
  });
}