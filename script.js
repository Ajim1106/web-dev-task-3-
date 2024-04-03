document.addEventListener('DOMContentLoaded', function () {
  const taskForm = document.getElementById('taskForm');
  const taskList = document.getElementById('taskList');

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Function to save tasks to localStorage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Function to render tasks
  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(function (task, index) {
      const taskItem = document.createElement('div');
      taskItem.classList.add('card', 'mb-4', 'text-center');
      taskItem.innerHTML = `
        <div class="card-header">
          <h5 class="card-title ${task.status === 'Completed' ? 'completed-task' : ''}">${task.name}</h5>
        </div>
        <div class="card-body ${task.status === 'Completed' ? 'completed-task' : ''}">
          <p class="card-text">Priority: ${task.priority}</p>
          <p class="card-text">Status: ${task.status}</p>
        </div>
        <div class="card-footer">
          <div class="row">
            <div class="col-12 col-md-4 my-md-auto mb-2">
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input complete-toggle" id="completeToggle-${index}"
                  data-index="${index}" ${task.status === 'Completed' ? 'checked' : ''}>
                <label class="custom-control-label" for="completeToggle-${index}">Complete</label>
              </div>
            </div>
            <div class="col-6 col-md-4"><button class="btn btn-warning edit-btn btn-lg btn-block" data-index="${index}">Edit</button></div>
            <div class="col-6 col-md-4"><button class="btn btn-danger delete-btn btn-lg btn-block" data-index="${index}">Delete</button></div>
          </div>
        </div>
      </div>
      `;
      taskList.appendChild(taskItem);
    });
  }

  // Event listener for form submission
  taskForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskName = document.getElementById('taskName').value;
    const priority = document.getElementById('priority').value;
    const status = 'Pending';
    tasks.unshift({ name: taskName, priority: priority, status: status });
    saveTasks();
    renderTasks();
    taskForm.reset();
  });

  // Event delegation for delete and edit buttons
  taskList.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-btn')) {
      const index = event.target.dataset.index;
      const confirmation = confirm('Are you sure you want to delete this task?');
      if (confirmation) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      }
    } else if (event.target.classList.contains('edit-btn')) {
      const index = event.target.dataset.index;
      const newName = prompt('Enter new task name:');
      if (newName !== null) {
        tasks[index].name = newName;
        saveTasks();
        renderTasks();
      }
    } else if (event.target.classList.contains('complete-toggle')) {
      const index = event.target.dataset.index;
      if (event.target.checked) {
        tasks[index].status = 'Completed';
      } else {
        tasks[index].status = 'Pending';
      }
      saveTasks();
      renderTasks();
    }
  });

  // Initial rendering of tasks
  renderTasks();
});
