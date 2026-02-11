const savedTasks = localStorage.getItem('tasks');

export const state = {
  tasks: savedTasks ? JSON.parse(savedTasks) : [],
  filter: 'all',
  searchQuery: '',
  sortBy: 'createdAt'
};