const newTaskForm = document.getElementById('newTaskForm');
const taskListBody = document.getElementById('taskListBody');
const taskEditSpot = document.getElementById('taskEditSpot');
const prioritySortButton = document.getElementById('prioritySortButton');
const prioritySortButtonUp = document.getElementById('prioritySortButtonUp');
const prioritySortButtonOff = document.getElementById('prioritySortButtonOff');
const radioStatusToDo = document.getElementById('toDo');
const radioStatusWorking = document.getElementById('working');
const radioStatusDone = document.getElementById('done');

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

// function statusToStorage(event) {
//   const existingTasks = getTasksFromLocalStorage();
//   const newStatus =
//   const newStatusId =
// }

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
    const status = 'toDo';
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
    const task = {'taskId': Date.now(), 'status': status, 'taskName': taskName,  'description': description, 'dueDate': dueDate,'priority': priority, 'category': category} 
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
    
    const statusRadiosToDoDiv = document.createElement('div');
    statusRadiosToDoDiv.classList.add('from-check');

      const statusRadiosToDoInput = document.createElement('input') ;
      statusRadiosToDoInput.type = 'radio';
      statusRadiosToDoInput.value = '';
      statusRadiosToDoInput.name = 'statusRadios';
      statusRadiosToDoInput.id = 'toDo';
      statusRadiosToDoInput.classList.add("form-check-input");

      const statusRadiosToDoLabel = document.createElement('label');
      statusRadiosToDoLabel.classList.add('form-check-label');
      statusRadiosToDoLabel.for = 'toDo';
      statusRadiosToDoLabel.innerHTML = 'To Do!';

    statusRadiosToDoDiv.appendChild(statusRadiosToDoInput);
    statusRadiosToDoDiv.appendChild(statusRadiosToDoLabel);
   
    const statusRadiosWorkingDiv = document.createElement('div');
    statusRadiosWorkingDiv.classList.add('from-check');

      const statusRadiosWorkingInput = document.createElement('input') ;
      statusRadiosWorkingInput.type = 'radio';
      statusRadiosWorkingInput.value = '';
      statusRadiosWorkingInput.name = 'statusRadios';
      statusRadiosWorkingInput.id = 'working';
      statusRadiosWorkingInput.classList.add("form-check-input");

      const statusRadiosWorkingLabel = document.createElement('label');
      statusRadiosWorkingLabel.classList.add('form-check-label');
      statusRadiosWorkingLabel.for = 'working';
      statusRadiosWorkingLabel.innerHTML = 'Doing it!';

    statusRadiosWorkingDiv.appendChild(statusRadiosWorkingInput);
    statusRadiosWorkingDiv.appendChild(statusRadiosWorkingLabel);

    const statusRadiosDoneDiv = document.createElement('div');
    statusRadiosDoneDiv.classList.add('from-check');

      const statusRadiosDoneInput = document.createElement('input') ;
      statusRadiosDoneInput.type = 'radio';
      statusRadiosDoneInput.value = '';
      statusRadiosDoneInput.name = 'statusRadios';
      statusRadiosDoneInput.id = 'done';
      statusRadiosDoneInput.classList.add("form-check-input");

      const statusRadiosDoneLabel = document.createElement('label');
      statusRadiosDoneLabel.classList.add('form-check-label');
      statusRadiosDoneLabel.for = 'done';
      statusRadiosDoneLabel.innerHTML = 'Done!';

    statusRadiosDoneDiv.appendChild(statusRadiosDoneInput);
    statusRadiosDoneDiv.appendChild(statusRadiosDoneLabel);

  statusRadiosCell.appendChild(statusRadiosToDoDiv);
  statusRadiosCell.appendChild(statusRadiosWorkingDiv);
  statusRadiosCell.appendChild(statusRadiosDoneDiv);
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

function displayTaskList() {

  taskListBody.innerHTML = "";

  const existingTasks = getTasksFromLocalStorage();

    existingTasks.forEach(task => {
      const taskRow = createTaskListRow(task);
      taskListBody.appendChild(taskRow)
    });  
}


//Sort functions

function prioritySort(event) {
  const existingTasks = getTasksFromLocalStorage();
  const existingTasksHigh = existingTasks.filter(task => task.priority === 'High');
  const existingTasksMedium = existingTasks.filter(task => task.priority === 'Medium');
  const existingTasksLow = existingTasks.filter(task => task.priority === 'Low');
  const priorityOrder = existingTasksHigh.concat(existingTasksMedium, existingTasksLow);

  taskListBody.innerHTML = "";

    priorityOrder.forEach(task => {
      const taskRow = createTaskListRow(task);
      taskListBody.appendChild(taskRow)
    });  
}

function prioritySortUp(event) {
  const existingTasks = getTasksFromLocalStorage();
  const existingTasksHigh = existingTasks.filter(task => task.priority === 'High');
  const existingTasksMedium = existingTasks.filter(task => task.priority === 'Medium');
  const existingTasksLow = existingTasks.filter(task => task.priority === 'Low');
  const priorityOrder = existingTasksLow.concat(existingTasksMedium, existingTasksHigh);

  taskListBody.innerHTML = "";

    priorityOrder.forEach(task => {
      const taskRow = createTaskListRow(task);
      taskListBody.appendChild(taskRow)
    });  
}

function prioritySortOff(event) {
  const priorityOrder = getTasksFromLocalStorage();

  taskListBody.innerHTML = "";

    priorityOrder.forEach(task => {
      const taskRow = createTaskListRow(task);
      taskListBody.appendChild(taskRow)
    });  
}

function statusSort(event) {
  const existingTasks = getTasksFromLocalStorage();
  const existingTasksToDo = existingTasks.filter(task => task.status === 'toDo');
  const existingTasksWorking = existingTasks.filter(task => task.status === 'working');
  const existingTasksDone = existingTasks.filter(task => task.status === 'done');
  const statusOrder = existingTasksToDo.concat(existingTasksWorking, existingTasksDone);

  taskListBody.innerHTML = "";

    statusOrder.forEach(task => {
      const taskRow = createTaskListRow(task);
      taskListBody.appendChild(taskRow)
    });  
}


if (newTaskForm) {
  newTaskForm.addEventListener("submit", (event) => {
    createNewTask(event);
  });
}

if (prioritySortButton) {
  prioritySortButton.addEventListener("click", (event) => {
    prioritySort(event);
  });
}

if (prioritySortButtonUp) {
  prioritySortButtonUp.addEventListener("click", (event) => {
    prioritySortUp(event);
  });
}

if (prioritySortButtonOff) {
  prioritySortButtonOff.addEventListener("click", (event) => {
    prioritySortOff(event);
  });
}

if (radioStatusToDo) {
  radioStatusToDo.addEventListener('click', (event) => {
    statusToStorage(event);
    statusSort();
  });
}

if (radioStatusWorking) {
  radioStatusWorking.addEventListener('click', (event) => {
    statusToStorage(event);
    statusSort();
  });
}

if (radioStatusDone) {
  radioStatusDone.addEventListener('click', (event) => {
    statusToStorage(event);
    statusSort();
  });
}

if (taskListBody) {
  displayTaskList();
} 




