const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const list = document.querySelector('#task-list');

const STORAGE_KEY = 'tasks';

function loadTasks() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [
      { text: 'Estudar HTML', completed: true },
      { text: 'Estudar CSS', completed: false },
      { text: 'Estudar JavaScript', completed: false },
    ];
  }
  return JSON.parse(stored);
}

let tasks = loadTasks();

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (task.completed) {
      li.classList.add('completed');
    }

    const span = document.createElement('span');
    span.textContent = task.text;

    const removeButton = document.createElement('button');
    removeButton.textContent = '✕';
    removeButton.type = 'button';

    li.appendChild(span);
    li.appendChild(removeButton);
    list.appendChild(li);

    li.addEventListener('click', () => {
      toggleTask(index);
    });

    removeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      removeTask(index);
    });
  });
}

function addTask(text) {
  tasks.push({ text, completed: false });
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function removeTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (text === '') {
    return;
  }

  addTask(text);
  input.value = '';
  input.focus();
});

renderTasks();
