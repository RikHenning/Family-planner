
localStorage.clear();
localStorage.setItem('tasks', JSON.stringify([{'taskId': 0, 'taskName': 'Default',  'description': 'Default', 'dueDate': 'Default','priority': 'Default', 'category': 'Default'}]));

const newTaskForm = document.getElementById('newTaskForm');
const taskListBody = document.getElementById('taskListBody');
const taskEditSpot

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
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  taskResult = tasks.filter(task => task.taskId === taskId)
  console.log(taskResult);
}

function deleteTask(taskId) {
  const existingTasks = getTasksFromLocalStorage();
  const indexOfTaskToDelete = existingTasks.findIndex(task => task.taskId === taskId);
  if (indexOfTaskToDelete !== -1) {
        existingTasks.splice(indexOfTaskToDelete, 1);
    }
saveTasksToLocalStorage(existingTasks);
displayTaskList();
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
    const taskNumber = Math.floor(Math.random() * 100);
    const task = {'taskId': Date.now(), 'taskName': taskName,  'description': description, 'dueDate': dueDate,'priority': priority, 'category': category} 
    pushTaskToLocalStorage(task);
    displayTaskList();  
}

function createTaskListRow(task, taskId) {
  const row = document.createElement("tr");

  const idCell = document.createElement("th");
  idCell.textContent = task.taskId;
  row.appendChild(idCell);
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
  const editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-primary", "btn-sm");
    editButton.textContent = "Do it differently!";
    editButton.addEventListener("click", () => {
        // TODO add the logic of editing a task
    });

    const editCell = document.createElement("td");
    editCell.appendChild(editButton);
    row.appendChild(editCell);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger",);
    deleteButton.textContent = "Not up for it!";
    deleteButton.addEventListener("click", () => {
        deleteTask(task.taskId);
        // displayTaskList();
    });

    const deleteCell = document.createElement("td");
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

  return row;
}

function editTask(taskId) {
  const existingTasks = getTasksFromLocalStorage();
  const oldTask = existingTasks.findIndex(task => task.taskId === taskId);

  const editFrom = document.createElement("form");

  const idCell = document.createElement("input");
  idCell.setAttribute("type", "text");
  idCell.textContent = oldTask.taskId;
  editFrom.appendChild(idCell);
  const taskName = document.createElement("input");
  taskName.setAttribute("type", "text");
  taskName.textContent = oldTask.taskName;
  editFrom.appendChild(taskName);
  const description = document.createElement("input");
  description.setAttribute("type", "text");
  description.textContent = oldTask.description;
  editFrom.appendChild(description);
  const dueDate = document.createElement("input");
  dueDate.setAttribute("type", "date");
  dueDate.textContent = oldTask.dueDate;
  editFrom.appendChild(dueDate);
  const priority = document.createElement("legend");
  priority.setAttribute("type", "text");
  priority.textContent = oldTask.priority;
  editFrom.appendChild(priority);
    const priorityLow = document.createElement("input");
    priorityLow.setAttribute("type", "radio");
    const priorityMedium = document.createElement("input");
    priorityMedium.setAttribute("type", "radio");
    const priorityHigh = document.createElement("input");
    priorityHigh.setAttribute("type", "radio");
      if  (priority === "Low") {priorityLow.checked}
       else if (priority === "Medium") {priorityMedium.checked}
        else (priority === "High") {priorityHigh.checked}
  priority.appendChild(priorityLow);
  priority.appendChild(priorityMedium);
  priority.appendChild(priorityHigh); 
  const category = document.createElement("select");
  category.setAttribute("type", "text");
  category.textContent = oldTask.category;
  editFrom.appendChild(category)
    const categoryWork = document.createElement("option");
    categoryWork.setAttribute('value', 'Work');
    categoryWork.setAttribute('name', 'Work');
    const categoryPersonal = document.createElement("option");
    categoryPersonal.setAttribute('value', 'Personal');
    categoryPersonal.setAttribute('name', 'Personal');
    const categoryShopping = document.createElement("option");
    categoryShopping.setAttribute('value', 'Shopping');
    categoryShopping.setAttribute('name', 'Shopping');
    const categoryGarden = document.createElement("option");
    categoryGarden.setAttribute('value', 'Garden');
    categoryGarden.setAttribute('name', 'Garden');
     if (category === 'Work') {categoryWork.selected}
      else if (category === 'Personal') {categoryPersonal.selected}
        else if (category === 'Shopping') {categoryShopping.selected}
          else (category === 'Garden') {categoryGarden.selected}
  category.appendChild(categoryWork);
  category.appendChild(categoryPersonal);
  category.appendChild(categoryShopping);
  category.appendChild(categoryGarden);

  displayEditTask();
}

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


displayTaskList();





// function displayTaskList() {

//   taskEditSpot.innerHTML = "";

//   editTask();  

// }
// $('#myModal').on('shown.bs.modal', function () {
//   $('#myInput').trigger('focus')
// })


// 1) explain task list in html. (in bootstrap is a table component)
// 2) Delete button
// 3) edit button
// 4) make the modal working.

