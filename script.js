let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
  const input = document.getElementById('todo-input');
  const dateInput = document.getElementById('todo-date');
  const text = input.value.trim();
  const dueDate = dateInput.value;

  if (text === '') return alert("Please enter a task!");

  todos.push({ text, dueDate, completed: false });
  input.value = '';
  dateInput.value = '';
  saveTodos();
  renderTodos();
  alert("✅ Task added successfully!");
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

function deleteTodo(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
  }
}

function resetAll() {
  if (confirm("Clear all tasks?")) {
    todos = [];
    saveTodos();
    renderTodos();
  }
}

function filterTodos(filter) {
  currentFilter = filter;
  renderTodos();
}

function updateProgressBar() {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  document.getElementById('progress-fill').style.width = percent + '%';
}

function renderTodos() {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';

  let filteredTodos = todos;
  if (currentFilter === 'completed') {
    filteredTodos = todos.filter(todo => todo.completed);
  } else if (currentFilter === 'pending') {
    filteredTodos = todos.filter(todo => !todo.completed);
  }

  filteredTodos.forEach((todo, i) => {
    const li = document.createElement('li');

    const leftDiv = document.createElement('div');
    leftDiv.className = 'task-left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.onchange = () => toggleTodo(todos.indexOf(todo));

    const span = document.createElement('span');
    span.textContent = todo.text;
    if (todo.completed) {
      span.style.textDecoration = 'line-through';
      span.style.color = '#888';
    }

    const date = document.createElement('span');
    date.className = 'due-date';
    if (todo.dueDate) {
      date.textContent = `📅 ${todo.dueDate}`;
    }

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);
    leftDiv.appendChild(date);

    const delBtn = document.createElement('i');
    delBtn.className = 'fas fa-trash delete-btn';
    delBtn.onclick = () => deleteTodo(todos.indexOf(todo));

    li.appendChild(leftDiv);
    li.appendChild(delBtn);
    list.appendChild(li);
  });

  updateProgressBar();
}

// Support Enter key to add task
document.getElementById('todo-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTodo();
});

renderTodos();
