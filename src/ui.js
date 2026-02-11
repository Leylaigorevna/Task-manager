import { deleteTask, updateTask } from './tasks.js';
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
      <button class="edit-btn">Edit</button>
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
    const editBtn = taskElement.querySelector('.edit-btn');

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

    editBtn.addEventListener('click', () => {
  taskElement.innerHTML = `
    <input class="edit-title" value="${task.title}" />
    <textarea class="edit-description">${task.description}</textarea>
    <select class="edit-priority">
      <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low</option>
      <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Medium</option>
      <option value="high" ${task.priority === 'high' ? 'selected' : ''}>High</option>
    </select>
    <input type="date" class="edit-dueDate" value="${task.dueDate}" />
    <button class="save-btn">Save</button>
    <button class="cancel-btn">Cancel</button>
  `;

  const saveBtn = taskElement.querySelector('.save-btn');
  const cancelBtn = taskElement.querySelector('.cancel-btn');

  saveBtn.addEventListener('click', () => {
    const updatedTitle = taskElement.querySelector('.edit-title').value;
    const updatedDescription = taskElement.querySelector('.edit-description').value;
    const updatedPriority = taskElement.querySelector('.edit-priority').value;
    const updatedDueDate = taskElement.querySelector('.edit-dueDate').value;

    updateTask(task.id, {
      title: updatedTitle,
      description: updatedDescription,
      priority: updatedPriority,
      dueDate: updatedDueDate
    });

    renderTasks();
  });

  cancelBtn.addEventListener('click', () => {
    renderTasks();
  });
});
});
}