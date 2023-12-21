document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
});

function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskList = document.getElementById("taskList");

  if (taskInput.value.trim() === "") {
    alert("Please enter a task!");
    return;
  }

  var li = document.createElement("li");
  li.innerHTML = `
        <span>${taskInput.value}</span>
        <button onclick="deleteTask(this)">Delete</button>
    `;

  taskList.appendChild(li);
  saveTask(taskInput.value);
  taskInput.value = "";
}

function deleteTask(button) {
  var taskList = document.getElementById("taskList");
  var li = button.parentNode;
  taskList.removeChild(li);

  var tasks = getStoredTasks();
  var taskText = li.querySelector("span").innerText;
  var index = tasks.indexOf(taskText);

  if (index !== -1) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function saveTask(task) {
  var tasks = getStoredTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getStoredTasks() {
  var tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
  var taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  var tasks = getStoredTasks();

  tasks.forEach(function (task) {
    var li = document.createElement("li");
    li.innerHTML = `
            <span>${task}</span>
            <button onclick="deleteTask(this)">Delete</button>
        `;
    taskList.appendChild(li);
  });
}
