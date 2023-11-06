
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
}

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

  const editButton = document.createElement("button");
}

function displayTaskList() {

  taskListBody.innerHTML = "";

  const taskId = Math.floor(Math.random()*2699256952556);
  const task = getTaskById(taskId);

    task.forEach((task, taskId) => {
      const taskRow = createTaskListRow(task, taskId);
      taskListBody.appendChild(taskRow)
    });  
}

displayTaskList();


// $('#myModal').on('shown.bs.modal', function () {
//   $('#myInput').trigger('focus')
// })


// 1) explain task list in html. (in bootstrap is a table component)
// 2) Delete button
// 3) edit button
// 4) make the modal working.

