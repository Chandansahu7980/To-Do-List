const addTaskButton = document.getElementById('addTaskButton');
const taskInput = document.getElementById('taskInput');

taskInput.focus();

addTaskButton.addEventListener('click', function () {
    if (taskInput.value.trim() === '') {
        taskInput.value = '';
        taskInput.focus();
        return;
    }

    const taskListElement = document.createElement('li');
    taskListElement.innerHTML = `<div>${taskInput.value}</div><i class="delete_task fa-solid fa-circle-xmark"></i>`;
    taskListElement.className = 'task-item';

    const taskListContainer = document.getElementById('taskList');
    taskListContainer.appendChild(taskListElement);

    // console.log("Task added: " + taskInput.value);
    taskInput.value = '';
    taskInput.focus();
});

document.getElementById('taskList').addEventListener('click', function (event) {
    if(event.target.classList.contains('delete_task')){
        const li = event.target.parentElement;
        li.remove();
    }
});





