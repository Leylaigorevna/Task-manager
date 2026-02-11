import { deleteTask } from './tasks.js';
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
      <button class="delete-btn">Delete</button>
      <div class="confirm-delete hidden">
        <span>Are you sure?</span>
        <button class="confirm-yes">Yes</button>
        <button class="confirm-no">No</button>
      </div>
    `;

    const deleteBtn = taskElement.querySelector('.delete-btn');
    const confirmBox = taskElement.querySelector('.confirm-delete');
    const yesBtn = taskElement.querySelector('.confirm-yes');
    const noBtn = taskElement.querySelector('.confirm-no');

    deleteBtn.addEventListener('click', () => {
        confirmBox.classList.remove('hidden');
    });

    yesBtn.addEventListener('click', () => {
        deleteTask(task.id);
        renderTasks();
    });

    noBtn.addEventListener('click', () => {
        confirmBox.classList.add('hidden');
    });

    container.appendChild(taskElement);
  });
}