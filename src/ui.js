import { deleteTask, updateTask } from './tasks.js';
import { state } from './state.js';

export function renderTasks() {
  const container = document.querySelector('.task-list');
  container.innerHTML = '';

  getFilteredTasks().forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');

    taskElement.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <small>Priority: ${task.priority};</small>
      <small>Date: ${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}</small>
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

function getFilteredTasks () {
    const searchInput = document.querySelector('.taskFinder');
    const statusFilter = document.querySelector('.sortTasks');
    const sortSelect = document.querySelector('.taskFilter');

    searchInput.addEventListener('input', renderTasks);
    statusFilter.addEventListener('change', renderTasks);
    sortSelect.addEventListener('change', renderTasks);

    let filtered = [ ...state.tasks];

    const searchValue = searchInput.value.toLowerCase();
    if (searchValue) {
        filtered = filtered.filter(task =>
            task.title.toLowerCase() .includes(searchValue) ||
            task.description.toLowerCase() .includes(searchValue)
        );
    }

    const status = statusFilter.value;
    if (status === 'active') filtered = filtered.filter (task => !task.completed);
    if (status === 'completed') filtered = filtered.filter (task => task.completed);

    const sortBy = sortSelect.value;
    if (sortBy === 'createdAt') {
        filtered.sort ((a,b) => new Date (a.createdAt) - new Date (b.createdAt));
    } else if (sortBy === 'dueDate') {
        filtered.sort((a, b) => {
            const dateA = a.dueDate ? new Date(a.dueDate) : new Date (0);
            const dateB = a.dueDate ? new Date(b.dueDate) : new Date (0);
            return dateA - dateB;
        })
    } else if (sortBy === 'priority') {
        const priorityMap = { low: 1, medium: 2, high: 3 };
        filtered.sort((a, b) => (priorityMap[b.priority] || 0) - ( priorityMap[a.priority] || 0));
    }
    return filtered;
}
}