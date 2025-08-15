const addTaskButton = document.getElementById('addTaskButton');
const taskInput = document.getElementById('taskInput');

taskInput.focus();

// Add event listener for the "Enter" key to add a task
taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

addTaskButton.addEventListener('click', function () {
    addTask();
});

function addTask() {
    if (taskInput.value.trim() === '') {
        taskInput.value = '';
        taskInput.focus();
        return;
    }

    const taskListElement = document.createElement('li');

    taskListElement.innerHTML = `<div>
                <input type="checkbox" id="task-${Date.now()}" />
                <label for="task-${Date.now()}">${taskInput.value}</label>
                </div>
                <i class="delete_task fas fa-trash"></i>
             `;

    const taskListContainer = document.getElementById('taskList');
    taskListContainer.appendChild(taskListElement);

    // console.log("Task added: " + taskInput.value);
    taskInput.value = '';
    taskInput.focus();
}

document.getElementById('taskList').addEventListener('click', function (event) {
    if (event.target.classList.contains('delete_task')) {
        const li = event.target.parentElement;
        li.remove();
    }
});





