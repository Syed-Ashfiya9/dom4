// script.js
// L2 - Dynamic To-Do List with Event Handling
// Features:
// - Add tasks (prevents empty / whitespace-only tasks)
// - Delete task
// - Complete (toggle) task (cross-out)
// - Event delegation used for Delete/Complete buttons
// - Enter key support for quick add
// - Well-commented and robust

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('task-input');
  const addBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');

  // Helper: create a single task list item (li) element
  function createTaskItem(text) {
    const li = document.createElement('li');
    li.className = 'task';
    li.setAttribute('role', 'listitem');

    // Task text span
    const span = document.createElement('span');
    span.className = 'text';
    span.textContent = text;

    // Controls container for buttons
    const controls = document.createElement('div');
    controls.className = 'controls';

    // Complete button
    const completeBtn = document.createElement('button');
    completeBtn.type = 'button';
    completeBtn.className = 'complete-btn';
    completeBtn.setAttribute('aria-label', Mark "${text}" as completed);
    completeBtn.dataset.action = 'complete';
    completeBtn.textContent = 'Complete';

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete-btn';
    deleteBtn.setAttribute('aria-label', Delete "${text}");
    deleteBtn.dataset.action = 'delete';
    deleteBtn.textContent = 'Delete';

    controls.appendChild(completeBtn);
    controls.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(controls);

    return li;
  }

  // Add Task handler
  function addTask() {
    const raw = input.value;
    const text = raw ? raw.trim() : '';

    // Edge case: don't add empty or whitespace-only tasks
    if (text === '') {
      alert('Please enter a task before adding.');
      return;
    }

    const item = createTaskItem(text);
    taskList.appendChild(item);

    // Clear input and focus for quick subsequent entry
    input.value = '';
    input.focus();
  }

  // Add button click
  addBtn.addEventListener('click', addTask);

  // Allow pressing Enter in the input to add task
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTask();
    }
  });

  // Event delegation: handle clicks on Complete/Delete buttons inside the task list
  taskList.addEventListener('click', (e) => {
    const btn = e.target;
    // Ensure we clicked a button with data-action
    if (!(btn instanceof HTMLElement)) return;

    const action = btn.dataset.action;
    if (!action) return;

    // Find the corresponding li ancestor
    const li = btn.closest('li.task');
    if (!li) return;

    if (action === 'complete') {
      // Toggle completed state
      // If already completed -> mark incomplete; else mark completed
      li.classList.toggle('completed');

      // Update accessible label to reflect current state
      const text = li.querySelector('.text')?.textContent || 'task';
      btn.setAttribute('aria-label', li.classList.contains('completed')
        ? Mark "${text}" as not completed
        : Mark "${text}" as completed);
    } else if (action === 'delete') {
      // Remove the task element
      li.remove();
    }
  });

  // Optional: prevent accidental form submissions if placed in a form in future
  // (no form in this page, but useful pattern)
  document.addEventListener('submit', (e) => e.preventDefault());
});