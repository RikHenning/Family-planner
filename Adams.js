
localStorage.clear();
localStorage.setItem('tasks', JSON.stringify([{'Task Name': 'Task Name', 'Description': 'test one', 'Due Date': 'dd/mm/yyyy', 'Priority': 'Medium', 'Category': 'Personal'}]));

const newTaskForm = document.getElementById('newTaskForm');

 function getTasksFromLocalStorage() {
  
  return JSON.parse(localStorage.getItem('tasks'));
}

// localStorage.clear();

function pushTaskToLocalStorage(task) {

  const existingTasks = getTasksFromLocalStorage();

  existingTasks.push(task);
  console.log(existingTasks);
  localStorage.setItem('tasks', JSON.stringify(existingTasks));
  console.log(getTasksFromLocalStorage());

}


function createNewTask(event) {
  event.preventDefault();
  const taskName = event.target.inputTask.value;
  const description = event.target.elements.inputDescription.value;
  const dueDate = event.target.elements.inputDueDate.value;
  let prioChecked 
    if (event.target.flexRadioDefault1.checked === true) {
      prioChecked = event.target.flexRadioDefault1.checked;
    }
    else if (event.target.flexRadioDefault2.checked === true) {
      prioChecked  = event.target.flexRadioDefault2.checked;
    }
    else if (event.target.flexRadioDefault3.checked === true) {
      prioChecked  = event.target.flexRadioDefault3.checked; 
    } 
  switch (prioChecked) {
    case event.target.flexRadioDefault1.checked:
      prioName = 'Low'
      break;
    case event.target.flexRadioDefault2.checked:
      prioName = 'Medium'
      break;
    case event.target.flexRadioDefault3.checked:
      prioName = 'High'
      break;
  }
  // let prioName 
  //   if (prioChecked === event.target.flexRadioDefault1.checked) {
  //     return 'Low';
  //   }
  //   else if (prioChecked === event.target.flexRadioDefault2.checked) {
  //     return 'Medium';
  //   }
  //   else if (prioChecked === event.target.flexRadioDefault3.checked) {
  //     return 'High';
  //   }
  const priority = prioName
  const category = event.target.category.value;
  const taskNumber = Math.floor(Math.random() * 100);
  const task = {'Task Name': taskName,  'Description': description, 'Due Date': dueDate,'Priority': priority, 'Category': category} 
  pushTaskToLocalStorage(task)
  
}

newTaskForm.addEventListener("submit", (event) => {
  createNewTask(event);
  });

// $('#myModal').on('shown.bs.modal', function () {
//   $('#myInput').trigger('focus')
// }) I want to get the Modal working so I can place the form of making a new task inside it.
 // This code appaerntly I need to make the Modal work but it throws an error I don't understand 
// how this code is build up in order for me to have a stab at fixing it.

 // getTasksFromLocalStorage()

 // console.log(getTasksFromLocalStorage());

function taskListReveal() { //create for each loop. get data from local storage. print data on list in HTML.
  const task
  const taskName 
  const description
  const dueDate
  const priority
  const category
}

