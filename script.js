const inputTask = document.getElementById("input-task");
const addButton = document.getElementById("add-button");
const tasksList = document.getElementById("tasks-list");
const tasksCounter = document.getElementById("tasks-counter");
const completedCounter = document.getElementById("completed-counter");

// Contador de tarefas e completadas
let totalTasks = 0;
let completedTasks = 0;

// Função para atualizar os contadores
function updateCounters() {
  tasksCounter.textContent = totalTasks - completedTasks;
  completedCounter.textContent = completedTasks;
}

// Função para remover uma tarefa
function removeTask(taskElement, checkbox) {
  tasksList.removeChild(taskElement);
  totalTasks--;
  if (checkbox.checked) {
    completedTasks--;
  }
  updateCounters();
}

// Função para adicionar tarefa
function addTask() {
  const taskText = inputTask.value.trim();
  if (!taskText) return;

  totalTasks++;

  const taskWrapper = document.createElement("div");
  taskWrapper.classList.add("input-wrapper");

  const checkBoxLabelWrapper = document.createElement("div");
  checkBoxLabelWrapper.classList.add("checkbox-label-wrapper");

  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.classList.add("task-checkbox");
  const checkboxId = `task-${totalTasks}`;
  taskCheckbox.id = checkboxId;

  const taskLabel = document.createElement("label");
  taskLabel.setAttribute("for", checkboxId);
  taskLabel.innerText = taskText;

  checkBoxLabelWrapper.appendChild(taskCheckbox);
  checkBoxLabelWrapper.appendChild(taskLabel);

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-button");
  removeButton.innerText = "X";
  removeButton.addEventListener("click", function () {
    removeTask(taskWrapper, taskCheckbox);
  });

  taskWrapper.appendChild(checkBoxLabelWrapper);
  taskWrapper.appendChild(removeButton);

  tasksList.appendChild(taskWrapper);

  taskCheckbox.addEventListener("change", function () {
    if (this.checked) {
      completedTasks++;
    } else {
      completedTasks--;
    }
    updateCounters();
  });

  updateCounters();

  inputTask.value = "";
}

// Adicionar evento de clique ao botão de adicionar
addButton.addEventListener("click", addTask);

// Iniciar a aplicação
function positionCounters() {
  const mainElement = document.querySelector("main");
  mainElement.style.position = "relative";
}

function init() {
  positionCounters();
  updateCounters();
  const mainElement = document.querySelector("main");
  if (!mainElement.contains(tasksList)) {
    mainElement.appendChild(tasksList);
  }
  inputTask.focus();
  inputTask.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
}

init();
