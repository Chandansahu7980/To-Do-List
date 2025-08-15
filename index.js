const addTaskButton = document.getElementById('addTaskButton');
const taskInput = document.getElementById('taskInput');
const checkboxes = document.querySelectorAll('#taskList .taskDiv input[type="checkbox"]');
const taskStorage = [];
taskInput.focus();

if (localStorage.getItem('localStoredTask')) {
    const storedTasks = JSON.parse(localStorage.getItem('localStoredTask'));
    storedTasks.forEach(task => {
        const taskListElement = document.createElement('li');
        taskListElement.innerHTML = `<div class="taskDiv"><input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} /><label for="${task.id}" style="${task.completed ? 'text-decoration: line-through; color: gray; font-style: italic;' : ''}">${task.content}</label></div><i class="delete_task fas fa-trash"></i>`;
        document.getElementById('taskList').appendChild(taskListElement);
        taskStorage.push(task);
    });
}

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
    const currentTimeStamp = Date.now();
    taskListElement.innerHTML = `<div class="taskDiv"><input type="checkbox" id="${currentTimeStamp}" /><label for="${currentTimeStamp}">${taskInput.value}</label></div><i class="delete_task fas fa-trash"></i>`;
    const checkboxes = document.querySelectorAll('#taskList .taskDiv input[type="checkbox"]');
    taskStorage.push({
        id: currentTimeStamp,
        content: taskInput.value,
        completed: false
    });
    const taskListContainer = document.getElementById('taskList');
    taskListContainer.appendChild(taskListElement);
    taskInput.value = '';
    taskInput.focus();
    // console.log(taskStorage);
    localStorage.setItem("localStoredTask",JSON.stringify(taskStorage));
    console.log(localStorage.getItem('localStoredTask'));
    
}

document.getElementById('taskList').addEventListener('click', function (event) {
    if (event.target.classList.contains('delete_task')) {
        const li = event.target.parentElement;
        const taskId = li.querySelector('input[type="checkbox"]').id;
        taskStorage.splice(taskStorage.findIndex(task => task.id === parseInt(taskId)), 1);
        li.remove();
        // console.log(taskStorage);
        localStorage.setItem("localStoredTask",JSON.stringify(taskStorage));
    }
});

document.getElementById('taskList').addEventListener('change', function (event) {
    // console.log(event.target.checked);
    const taskDiv = event.target.parentElement;
    const taskId = taskDiv.querySelector('input[type="checkbox"]').id;
    const taskLabel = taskDiv.querySelector('label');
    const task = taskStorage.find(task => task.id === parseInt(taskId));
    if (event.target.checked) {
        task.completed = true;
        taskLabel.style.textDecoration = 'line-through';
        taskLabel.style.color = 'gray';
        taskLabel.style.fontStyle = 'italic';
    } else {
        task.completed = false;
        taskLabel.style.textDecoration = 'none';
        taskLabel.style.color = 'white';
        taskLabel.style.fontStyle = 'normal';
    }
    // console.log(taskStorage);
    localStorage.setItem("localStoredTask",JSON.stringify(taskStorage));
});








