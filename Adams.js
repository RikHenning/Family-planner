
localStorage.clear();
localStorage.setItem('tasks', JSON.stringify([{'taskId': 0, 'taskName': 'Default',  'description': 'Default', 'dueDate': 'Default','priority': 'Default', 'category': 'Default'}]));

const newTaskForm = document.getElementById('newTaskForm');

 function getTasksFromLocalStorage() {
  
  return JSON.parse(localStorage.getItem('tasks'));
}

function pushTaskToLocalStorage(task) {

  const existingTasks = getTasksFromLocalStorage();

  existingTasks.push(task);
  // console.log(existingTasks);
  localStorage.setItem('tasks', JSON.stringify(existingTasks));
  console.log(getTasksFromLocalStorage());

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
  pushTaskToLocalStorage(task)
  
}

newTaskForm.addEventListener("submit", (event) => {
  createNewTask(event);
  });

function getTaskById(taskId) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  taskResult = tasks.filter(task => task.taskId === taskId)
  console.log(taskResult);
}

getTaskById(Math.floor(Math.random()*2699256952556));

function createTaskListRow(task, taskId) {
  const row = document.createElement("tr");

  const idCell = document.createElement("th");
  idCell.textContent = task.taskId;
  const taskName = document.createElement("td");
  taskName.textContent = task.taskName;
  const description = document.createElement("td");
  description.textContent = task.description;
  const dueDate = document.createElement("td");
  dueDate.textContent = task.dueDate; 
  const priority = document.createElement("td");
  priority.textContent = task.priority;
  const category = document.createElement("td");
  category.textContent = task.category;
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("tableButton");
  deleteButton.textContent = "Not up for it!";
  deleteButton.addEventListener("click", () => deleteTask(index));
  const editButton = document.createElement("button");
  eleteButton.classList.add("tableButton");
  deleteButton.textContent = "Do it differently!";
  deleteButton.addEventListener("click", () => editTask(index));

  return row;
}

function displayTaskList() {

  taskListBody.innerHTML = "";

  const taskId = Math.floor(Math.random()*2699256952556);
  
    getTaskById(taskId).forEach((task, taskId) => {
      const taskRow = createTaskListRow(task, taskId);
      taskListBody.appendChild(taskRow)
    });  
}

displayTaskList();

function deleteTask(taskId) {
  getTaskById(taskId).splice(taskId,1);
  displayTaskList();
}

function editTask(taskId) {
  const oldTask = getTaskById(taskId);

  const editFrom = document.createElement("form");

  const idCell = document.createElement("input");
  idCell.setAttribute("type", "text");
  idCell.textContent = oldTask.taskId;
  const taskName = document.createElement("input");
  taskName.setAttribute("type", "text");
  taskName.textContent = oldTask.taskName;
  const description = document.createElement("input");
  description.setAttribute("type", "text");
  description.textContent = oldTask.description;
  const dueDate = document.createElement("input");
  dueDate.setAttribute("type", "date");
  dueDate.textContent = oldTask.dueDate; 
  const priority = document.createElement("legend");
  priority.setAttribute("type", "text");
  priority.textContent = oldTask.priority;
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

  taskEditSpot.innerHTML = "";

  editTask()
    ;  

}
// $('#myModal').on('shown.bs.modal', function () {
//   $('#myInput').trigger('focus')
// })


// 1) explain task list in html. (in bootstrap is a table component)
// 2) Delete button
// 3) edit button
// 4) make the modal working.

