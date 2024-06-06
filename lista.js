document.addEventListener("DOMContentLoaded", loadTasks);

function getNextId() {
    let lastId = localStorage.getItem("lastId") || "0";
    let nextId = parseInt(lastId) + 1;
    localStorage.setItem("lastId", nextId.toString());
    return nextId;
}

function addTask() {
    var input = document.getElementById("new-task-input");
    var text = input.value;

    if (!text.trim()) {
        alert("A tarefa não pode estar vazia.");
        return;
    }

    var upperCaseText = text.toUpperCase();
    var date = new Date();
    var formattedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    var taskId = getNextId(); // Gerar um ID único numérico crescente

    var task = {
        id: taskId.toString(),
        description: formattedDate + " - " + upperCaseText
    };

    saveTask(task);
    addTaskToDOM(task);

    input.value = "";
}

function addTaskToDOM(task) {
    var li = document.createElement("li");
    li.textContent = task.description;
    li.dataset.id = task.id;
    li.style.cursor = "pointer";

    li.onclick = function () {
        this.classList.toggle("completed");
    };

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Apagar";
    deleteButton.onclick = function (event) {
        event.stopPropagation();
        removeTask(task.id);
        this.parentElement.remove();
    };
    li.appendChild(deleteButton);

    var list = document.getElementById("task-list");
    list.appendChild(li);
}

function saveTask(task) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

function removeTask(id) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearList() {
    var list = document.getElementById("task-list");

    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    localStorage.removeItem("tasks");
    localStorage.removeItem("lastId");
}
