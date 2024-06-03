function addTask() {
  var input = document.getElementById("new-task-input");
  var text = input.value;

  var upperCaseText = text.toUpperCase();

  var date = new Date();
  var formattedDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  var li = document.createElement("li");
  li.textContent = formattedDate + " - " + upperCaseText;

  li.style.cursor = "pointer";

  li.onclick = function () {
    this.classList.toggle("completed");
  };

  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Apagar";
  deleteButton.onclick = function (event) {
    event.stopPropagation();
    this.parentElement.remove();
  };
  li.appendChild(deleteButton);

  var list = document.getElementById("task-list");
  list.appendChild(li);

  input.value = "";
}

function clearList() {
  var list = document.getElementById("task-list");

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}
