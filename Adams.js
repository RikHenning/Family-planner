const newTaskForm = document.getElementById('newTaskForm');
const taskListBody = document.getElementById('taskListBody');
const taskEditSpot = document.getElementById('taskEditSpot');
// const modalFooter = document.getElementById('modalFooter')
const prioritySortButton = document.getElementById('prioritySortButton');

 function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem('tasks'));
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function pushTaskToLocalStorage(task) {
  const existingTasks = getTasksFromLocalStorage();
  existingTasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(existingTasks));
}

function getTaskById(taskId) {
  const existingTasks = getTasksFromLocalStorage();
  taskResult = existingTasks.filter(task => task.taskId === taskId);
  return taskResult[0];
}

function saveEditTaskToLocalStorage(taskToEdit) {
  const existingTasks = getTasksFromLocalStorage();
  const indexOfTaskToEdit = existingTasks.findIndex(task => task.taskId === taskToEdit.taskId);
  if (indexOfTaskToEdit !== -1) {
      existingTasks.splice(indexOfTaskToEdit, 1, taskToEdit);
saveTasksToLocalStorage(existingTasks);

    }
}

function deleteTask(taskId) {
  const existingTasks = getTasksFromLocalStorage();
  const indexOfTaskToDelete = existingTasks.findIndex(task => task.taskId === taskId);
  if (indexOfTaskToDelete !== -1) {
        existingTasks.splice(indexOfTaskToDelete, 1);
        saveTasksToLocalStorage(existingTasks);
        displayTaskList();
    }
}

function createNewTask(event) {
  event.preventDefault();
    const taskName = event.target.inputTask.value;
    const description = event.target.elements.inputDescription.value;
    const dueDate = event.target.elements.inputDueDate.value;
    let priority = '';
      if (event.target.flexRadioDefault1.checked === true) {
        priority = 'Low'
      }
      else if (event.target.flexRadioDefault2.checked === true) {
        priority = 'Medium'
      }
      else if (event.target.flexRadioDefault3.checked === true) {
        priority = 'High' 
      } 
    const category = event.target.category.value;
    const task = {'taskId': Date.now(), 'taskName': taskName,  'description': description, 'dueDate': dueDate,'priority': priority, 'category': category} 
    pushTaskToLocalStorage(task);
    displayTaskList();  
}

function saveEditTask(event, taskIdToEdit) {
  event.preventDefault();
  const taskName = event.target.editTaskName.value;
  const description = event.target.elements.editDescription.value;
  const dueDate = event.target.elements.editDueDate.value;
  let priority = '';
    if (event.target.editPriorityLow.checked === true) {
        priority = 'Low'
    }
    else if (event.target.editPriorityMedium.checked === true) {
        priority = 'Medium'
    }
    else if (event.target.editPriorityHigh.checked === true) {
        priority = 'High' 
    } 
  const category = event.target.editCategory.value;
  // const saveButton = document.getElementById('saveButton');
  //   saveButton.href = `testmodal.html`;

  const taskToEdit = getTaskById(taskIdToEdit);
  taskToEdit.taskName = taskName;
  taskToEdit.description = description;
  taskToEdit.dueDate = dueDate;
  taskToEdit.priority = priority;
  taskToEdit.category = category;
  saveEditTaskToLocalStorage(taskToEdit);


    }

function createTaskListRow(task, taskId) {
  const row = document.createElement("tr");

  const idCell = document.createElement("th");
  idCell.textContent = task.taskId;
  row.appendChild(idCell);
  const statusRadiosCell = document.createElement('th');
    const statusRadiosToDo = document.createElement('div');
      const statusRadiosToDoInput = document.createElement('input') ;
      statusRadiosToDoInput.classList.add("form-check-input", "radio", 'radio1');
      const statusRadiosToDoLabel = document.createElement('label');
      statusRadiosToDoLabel.setAttribute('radio1', 'To Do');
    statusRadiosToDo.appendChild(statusRadiosToDoInput);
    statusRadiosToDo.appendChild(statusRadiosToDoLabel);
    const statusRadiosWorking = document.createElement('div');
      const statusRadiosWorkingInput = document.createElement('input');
      statusRadiosWorkingInput.classList.add("form-check-input", "radio", 'radio2');
      const statusRadiosWorkingLabel = document.createElement('label');
      statusRadiosWorkingLabel.setAttribute('radio2', 'On it');
    statusRadiosWorking.appendChild(statusRadiosWorkingInput);
    statusRadiosWorking.appendChild(statusRadiosWorkingLabel);
    const statusRadiosDone = document.createElement('div');
      const statusRadiosDoneInput = document.createElement('input');
      statusRadiosDoneInput.classList.add("form-check-input", "radio", 'radio3');
      const statusRadiosDoneLabel = document.createElement('label');
      statusRadiosDoneLabel.setAttribute('radio3', 'Done');
    statusRadiosDone.appendChild(statusRadiosDoneInput);
    statusRadiosDone.appendChild(statusRadiosDoneLabel);
  statusRadiosCell.appendChild(statusRadiosToDo);
  statusRadiosCell.appendChild(statusRadiosWorking);
  statusRadiosCell.appendChild(statusRadiosDone);
  row.appendChild(statusRadiosCell);
  const taskName = document.createElement("td");
  taskName.textContent = task.taskName;
  row.appendChild(taskName);
  const description = document.createElement("td");
  description.textContent = task.description;
  row.appendChild(description);
  const dueDate = document.createElement("td");
  dueDate.textContent = task.dueDate; 
  row.appendChild(dueDate);
  const priority = document.createElement("td");
  priority.textContent = task.priority;
  row.appendChild(priority);
  const category = document.createElement("td");
  category.textContent = task.category;
  row.appendChild(category);
  const editButton = document.createElement("a");
    editButton.classList.add("btn", "btn-primary", "btn-sm");
    editButton.textContent = "Do it differently!";
    editButton.href = `edit.html?id=${task.taskId}`;
    const editCell = document.createElement("td");
    editCell.appendChild(editButton);
    row.appendChild(editCell);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger",);
    deleteButton.textContent = "Not up for it!";
    deleteButton.addEventListener("click", () => {
        deleteTask(task.taskId);
    });

    const deleteCell = document.createElement("td");
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

  return row;
}


//Sort functions

function prioritySort(event) {
  event.preventDefault();
  const existingTasks = getTasksFromLocalStorage();
  const existingTasksHigh = existingTasks.filter(task => task.priority === 'High');
  const existingTasksMedium = existingTasks.filter(task => task.priority === 'Medium');
  const existingTasksLow = existingTasks.filter(task => task.priority === 'Low');
  const priorityOrder = {existingTasksHigh, existingTasksMedium, existingTasksLow};

  // const priorityOrder = [{existingTasks[existingTasksHighId]}, {existingTasks[existingTasksMediumId]}, {existingTasks[existingTasksLowId]}];

  taskListBody.innerHTML = "";

    priorityOrder.forEach(task => {
      const taskRow = createTaskListRow(task);
      taskListBody.appendChild(taskRow)
    });  
}

if (newTaskForm) {

function displayTaskList() {

  taskListBody.innerHTML = "";

  const existingTasks = getTasksFromLocalStorage();

    existingTasks.forEach(task => {
      const taskRow = createTaskListRow(task);
      taskListBody.appendChild(taskRow)
    });  
}

if (newTaskForm) {

function displayTaskList() {

  taskListBody.innerHTML = "";

  const existingTasks = getTasksFromLocalStorage();

    existingTasks.forEach(task => {
      const taskRow = createTaskListRow(task);
      taskListBody.appendChild(taskRow)
    });  
}


newTaskForm.addEventListener("submit", (event) => {
  createNewTask(event);
  });

prioritySortButton.addEventListener("onclick", (event) => {
  prioritySort(event);
});

// if (modalFooter) {

// modalFooter.addEventListener('submit', (event) => {
//   createNewTask(event);
// });

// }

displayTaskList();