// script.js
// Sabse pehle DOM elements ko fetch kar lete hain
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const countSpan = document.getElementById('count');
const clearAllBtn = document.getElementById('clear-all');
const hideCompleted = document.getElementById('hide-completed');
const emptyBox = document.getElementById('empty');

// localStorage se pahle se saved tasks load karte hain (agar ho to), warna empty array
// Presentation tip: localStorage se data persist hota hai, yani page close karne pe bhi tasks saved rahenge.
let tasks = JSON.parse(localStorage.getItem('todo_tasks') || '[]');

// Helper function: tasks ko localStorage mein save karna aur fir render call karna
function save() {
  localStorage.setItem('todo_tasks', JSON.stringify(tasks));
  render();
}

// createTaskNode: ek task object lekar uska DOM element bana ke return karta hai
function createTaskNode(task) {
  const li = document.createElement('li');
  li.className = 'task-item';
  if (task.completed) li.classList.add('completed'); // agar complete hai to class add karein
  li.dataset.id = task.id; // id store kar lete hain for future reference

  // left side: checkbox + title + meta
  const left = document.createElement('div');
  left.className = 'left';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.setAttribute('aria-label', 'Mark task completed');

  // label area: title aur createdAt dikhane ke liye
  const label = document.createElement('div');
  label.className = 'label';

  const title = document.createElement('div');
  title.className = 'task-title';
  title.textContent = task.text; // task text show kar rahe hain

  const meta = document.createElement('div');
  meta.className = 'task-meta';
  // createdAt ko readable format me dikhate hain
  meta.textContent = new Date(task.createdAt).toLocaleString();

  label.appendChild(title);
  label.appendChild(meta);
  left.appendChild(checkbox);
  left.appendChild(label);

  // actions: edit aur delete buttons
  const actions = document.createElement('div');
  actions.className = 'actions';

  const editBtn = document.createElement('button');
  editBtn.className = 'icon-btn';
  editBtn.title = 'Edit';
  editBtn.innerHTML = '✏️';

  const delBtn = document.createElement('button');
  delBtn.className = 'icon-btn';
  delBtn.title = 'Delete';
  delBtn.innerHTML = '🗑️';

  actions.appendChild(editBtn);
  actions.appendChild(delBtn);

  li.appendChild(left);
  li.appendChild(actions);

  // ---------------- Event handlers for this task ----------------

  // 1) Checkbox change -> completed status toggle
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    // save() calls render() internally
    save();
  });

  // 2) Delete button -> task remove karna
  delBtn.addEventListener('click', () => {
    // confirmation: user se puchte hain
    if (!confirm('Are you sure you want to delete this task?')) return;
    tasks = tasks.filter(t => t.id !== task.id); // remove from array
    save();
  });

  // 3) Edit button -> simple prompt based edit
  // Presentation tip: edit functionality ko explain karte waqt bataiye ki real app me modal/form use karna better hota.
  editBtn.addEventListener('click', () => {
    const newText = prompt('Edit task:', task.text);
    if (newText === null) return; // user canceled
    const trimmed = newText.trim();
    if (trimmed === '') {
      alert('Task text cannot be empty.');
      return;
    }
    task.text = trimmed;
    save();
  });

  return li;
}

// render: pura task list screen pe dikhata hai
function render() {
  taskList.innerHTML = ''; // pehle clear
  const hide = hideCompleted.checked; // hide completed toggle
  // agar hide on hai to completed tasks ko filter kar do
  const visibleTasks = tasks.filter(t => !(hide && t.completed));

  // empty state handling
  if (visibleTasks.length === 0) {
    emptyBox.style.display = 'block';
  } else {
    emptyBox.style.display = 'none';
  }

  // sab visible tasks ke liye DOM nodes banake append karenge
  for (const t of visibleTasks) {
    const node = createTaskNode(t);
    taskList.appendChild(node);
  }

  // count update (total tasks)
  countSpan.textContent = `${tasks.length} task${tasks.length !== 1 ? 's' : ''}`;
}

// Form submit: naya task add karenge
taskForm.addEventListener('submit', e => {
  e.preventDefault(); // page reload rok dete hain
  const text = taskInput.value.trim();
  if (!text) return alert('Please enter a task.');
  const newTask = {
    id: Date.now().toString(),            // unique id (timestamp)
    text,                                 // task text
    completed: false,                     // default not completed
    createdAt: new Date().toISOString()   // created timestamp
  };
  tasks.unshift(newTask); // newest task upar dikhana
  taskInput.value = '';   // input clear kar do
  save();                 // save & re-render
});

// Clear all button: sab tasks delete karna
clearAllBtn.addEventListener('click', () => {
  if (!tasks.length) return;
  if (!confirm('Clear all tasks?')) return;
  tasks = [];
  save();
});

// hide completed toggle changes par render call
hideCompleted.addEventListener('change', render);

// initial render (jab page load ho)
render();
