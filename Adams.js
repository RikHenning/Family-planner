const newTaskForm = document.getElementById('newTaskForm');
const taskListBody = document.getElementById('taskListBody');
const taskEditSpot = document.getElementById('taskEditSpot');
const prioritySortButton = document.getElementById('prioritySortButton');
const prioritySortButtonUp = document.getElementById('prioritySortButtonUp');
const prioritySortButtonOff = document.getElementById('prioritySortButtonOff');
const radioStatusToDo = document.getElementById('toDo');
const radioStatusWorking = document.getElementById('working');
const radioStatusDone = document.getElementById('done');
const statusToDoSortButton = document.getElementById('statusToDoSortButton');
const statusWorkingSortButton = document.getElementById('statusWorkingSortButton');
const statusDoneSortButton = document.getElementById('statusDoneSortButton');
const searchBar = document.getElementById('searchBar');
const nameSortButtonUp = document.getElementById('nameSortButtonUp');
const nameSortButtonDown = document.getElementById('nameSortButtonDown');
const descriptionSortButtonUp = document.getElementById('descriptionSortButtonUp');
const descriptionSortButtonDown = document.getElementById('descriptionSortButtonDown');
const categorySortWorkButton = document.getElementById('categorySortWorkButton');
const categorySortPersonalButton = document.getElementById('categorySortPersonalButton');
const categorySortShoppingButton = document.getElementById('categorySortShoppingButton');
const categorySortGardenButton = document.getElementById('categorySortGardenButton');
const dueDateButtonUp = document.getElementById('dueDateButtonUp');
const dueDateButtonDown = document.getElementById('dueDateButtonDown');
// const { parse, format } = require('date-fns');

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

function statusToStorage(taskId, status) {
  const taskToEdit = getTaskById(taskId);
  taskToEdit.status = status;
  console.log(getTasksFromLocalStorage());
  saveEditTaskToLocalStorage(taskToEdit);
  console.log(getTasksFromLocalStorage());
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

  // const idCell = document.createElement("th");
  // idCell.textContent = task.taskId;
  // row.appendChild(idCell);

  const statusRadiosCell = document.createElement('th');
    
    const statusRadiosToDoDiv = document.createElement('div');
    statusRadiosToDoDiv.classList.add('from-check');

      const statusRadiosToDoInput = document.createElement('input') ;
      statusRadiosToDoInput.checked = task.status === 'toDo';
      statusRadiosToDoInput.type = 'radio';
      statusRadiosToDoInput.value = 'toDo';
      statusRadiosToDoInput.name = `statusRadios?id=${task.taskId}`;
      statusRadiosToDoInput.id = `radioButtonIdToDo?id=${task.taskId}`;
      statusRadiosToDoInput.classList.add("form-check-input");
      statusRadiosToDoInput.addEventListener('click', (event) => {
        statusToStorage(task.taskId, 'toDo');
        statusSort();
       });

      const statusRadiosToDoLabel = document.createElement('label');
      statusRadiosToDoLabel.classList.add('form-check-label');
      statusRadiosToDoLabel.for = 'toDo';
      statusRadiosToDoLabel.innerHTML = 'To Do!';

    statusRadiosToDoDiv.appendChild(statusRadiosToDoInput);
    statusRadiosToDoDiv.appendChild(statusRadiosToDoLabel);
   
    const statusRadiosWorkingDiv = document.createElement('div');
    statusRadiosWorkingDiv.classList.add('from-check');

      const statusRadiosWorkingInput = document.createElement('input') ;
      statusRadiosWorkingInput.checked = task.status === 'working';
      statusRadiosWorkingInput.type = 'radio';
      statusRadiosWorkingInput.value = 'working';
      statusRadiosWorkingInput.name = `statusRadios?id=${task.taskId}`;
      statusRadiosWorkingInput.id = `radioButtonworking?id=${task.taskId}`;
      statusRadiosWorkingInput.classList.add("form-check-input");
      statusRadiosWorkingInput.addEventListener('click', (event) => {
        statusToStorage(task.taskId, 'working');
        statusSort();
        });

      const statusRadiosWorkingLabel = document.createElement('label');
      statusRadiosWorkingLabel.classList.add('form-check-label');
      statusRadiosWorkingLabel.for = 'working';
      statusRadiosWorkingLabel.innerHTML = 'Doing it!';

    statusRadiosWorkingDiv.appendChild(statusRadiosWorkingInput);
    statusRadiosWorkingDiv.appendChild(statusRadiosWorkingLabel);

    const statusRadiosDoneDiv = document.createElement('div');
    statusRadiosDoneDiv.classList.add('from-check');

      const statusRadiosDoneInput = document.createElement('input') ;
      statusRadiosDoneInput.checked = task.status === 'done';
      statusRadiosDoneInput.type = 'radio';
      statusRadiosDoneInput.value = 'done';
      statusRadiosDoneInput.name = `statusRadios?id=${task.taskId}`;
      statusRadiosDoneInput.id = `radioButtonDone?id=${task.taskId}`;
      statusRadiosDoneInput.classList.add("form-check-input");
      statusRadiosDoneInput.addEventListener('click', (event) => {
        statusToStorage(task.taskId, 'done');
        statusSort();
        });

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
    deleteButton.classList.add("btn", "btn-danger", "btn-sm");
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

function statusSortWorking(event) {
  const existingTasks = getTasksFromLocalStorage();
  const existingTasksToDo = existingTasks.filter(task => task.status === 'toDo');
  const existingTasksWorking = existingTasks.filter(task => task.status === 'working');
  const existingTasksDone = existingTasks.filter(task => task.status === 'done');
  const statusOrder = existingTasksWorking.concat(existingTasksToDo, existingTasksDone);

  taskListBody.innerHTML = "";

    statusOrder.forEach(task => {
      const taskRow = createTaskListRow(task);
      taskListBody.appendChild(taskRow)
    });  
}

function statusSortDone(event) {
  const existingTasks = getTasksFromLocalStorage();
  const existingTasksToDo = existingTasks.filter(task => task.status === 'toDo');
  const existingTasksWorking = existingTasks.filter(task => task.status === 'working');
  const existingTasksDone = existingTasks.filter(task => task.status === 'done');
  const statusOrder = existingTasksDone.concat(existingTasksWorking, existingTasksToDo);

  taskListBody.innerHTML = "";

    statusOrder.forEach(task => {
      const taskRow = createTaskListRow(task);
      taskListBody.appendChild(taskRow)
    });  
}

function nameSort(event) {
  const existingTasks = getTasksFromLocalStorage();
    existingTasks.sort((a, b) => a.taskName.localeCompare(b.taskName));

    taskListBody.innerHTML = "";

  existingTasks.forEach(task => {
      const taskRow = createTaskListRow(task);
      taskListBody.appendChild(taskRow)
    });  
}

function nameSortDown(event) {
  const existingTasks = getTasksFromLocalStorage();
    existingTasks.sort((a, b) => a.taskName.localeCompare(b.taskName));
    existingTasks.reverse();

    taskListBody.innerHTML = "";

  existingTasks.forEach(task => {
      const taskRow = createTaskListRow(task);
      taskListBody.appendChild(taskRow)
    });  
}

function descriptionSort(event) {
  const existingTasks = getTasksFromLocalStorage();
    existingTasks.sort((a, b) => a.description.localeCompare(b.description));

    taskListBody.innerHTML = "";

  existingTasks.forEach(task => {
      const taskRow = createTaskListRow(task);
      taskListBody.appendChild(taskRow)
    });  
}

function descriptionSortDown(event) {
  const existingTasks = getTasksFromLocalStorage();
    existingTasks.sort((a, b) => a.description.localeCompare(b.description));
    existingTasks.reverse();

    taskListBody.innerHTML = "";

  existingTasks.forEach(task => {
      const taskRow = createTaskListRow(task);
      taskListBody.appendChild(taskRow)
    });  
}

function categorySortWork(event) {
  const existingTasks = getTasksFromLocalStorage();
  const existingTasksWork = existingTasks.filter(task => task.category === 'Work');

taskListBody.innerHTML = "";

if (existingTasksWork != '') {
  existingTasksWork.forEach(task => {
      const taskRow = createTaskListRow(task);
      taskListBody.appendChild(taskRow)
    }); 
  } 
}

function categorySortPersonal(event) {
  const existingTasks = getTasksFromLocalStorage();
  const existingTasksPersonal = existingTasks.filter(task => task.category === 'Personal');

  taskListBody.innerHTML = "";

if (existingTasksPersonal != '') {
  existingTasksPersonal.forEach(task => {
      const taskRow = createTaskListRow(task);
      taskListBody.appendChild(taskRow)
    }); 
  }; 
}

function categorySortShopping(event) {
  const existingTasks = getTasksFromLocalStorage();
  const existingTasksShopping = existingTasks.filter(task => task.category === 'Shopping');

  taskListBody.innerHTML = "";

if (existingTasksShopping != '') {
  existingTasksShopping.forEach(task => {
      const taskRow = createTaskListRow(task);
      taskListBody.appendChild(taskRow)
    }); 
  }; 
}

function categorySortGarden(event) {
  const existingTasks = getTasksFromLocalStorage();
  const existingTasksGarden = existingTasks.filter(task => task.category === 'Garden');

  taskListBody.innerHTML = "";

if (existingTasksGarden != '') {
  existingTasksGarden.forEach(task => {
      const taskRow = createTaskListRow(task);
      taskListBody.appendChild(taskRow)
    }); 
  }; 
}

function dateSortUp(event) {
  const existingTasks = getTasksFromLocalStorage();
   existingTasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate));

   taskListBody.innerHTML = "";

  existingTasks.forEach(task => {
      const taskRow = createTaskListRow(task);
      taskListBody.appendChild(taskRow)
    });  
}

function dateSortDown(event) {
  const existingTasks = getTasksFromLocalStorage();
   existingTasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    existingTasks.reverse();
    
   taskListBody.innerHTML = "";

  existingTasks.forEach(task => {
      const taskRow = createTaskListRow(task);
      taskListBody.appendChild(taskRow)
    });  
}

// search functions

function searchTask(event) {
  event.preventDefault();
  const existingTasks = getTasksFromLocalStorage();
  const input = event.target.searchQuery.value;
  // const outputDueDateFormat = 'yyyy-MM-dd';
  // const dueDateFormats = parseDate(input, outputDueDateFormat);
  const searchResult = existingTasks.filter(task => {
    const inputLower = input.toLowerCase();
    const taskNameLower = task.taskName.toLowerCase();
    const descriptionLower = task.description.toLowerCase();
    const dueDateLower = task.dueDate.toLowerCase();

  return taskNameLower.includes(inputLower) || 
         descriptionLower.includes(inputLower) || 
         dueDateLower.includes(inputLower);
});

  taskListBody.innerHTML = "";

if (searchResult !== "") {
    console.log(searchResult);
    searchResult.forEach(task => {
      const taskRow = createTaskListRow(task);
      taskListBody.appendChild(taskRow)
    });  
  }
}

function adeptSearchInput(event) {
  event.preventDefault();
  const existingTasks = getTasksFromLocalStorage();
  const input = event.target.searchQuery.value;
    console.log("Input:", input);
  // Regular expressions to match dates in different formats
  const datePattern1 = /\d{4}-\d{2}-\d{2}/;
  const datePattern2 = /\d{2}-\d{2}-\d{4}/;
  const datePattern3 = /\d{2}-\d{2}-\d{2}/;
  const datePattern4 = /\d{4}\/\d{2}\/\d{2}/;
  const datePattern5 = /\d{2}\/\d{2}\/\d{4}/;
  const datePattern6 = /\d{2}\/\d{2}\/\d{2}/;

  // Combine the patterns into a single regular expression with alternation (|)
  const combinedPattern = new RegExp(`(${datePattern1.source}|${datePattern2.source}|${datePattern3.source}|${datePattern4.source}|${datePattern5.source}|${datePattern6.source})`, 'g');

  // Find all date strings in the user's input
  const userDates = input.match(combinedPattern);
  console.log("we have a match 1", userDates);

  if (userDates) {
    // Now you can compare the user's date(s) with the dates in the larger strings

    for (const task of existingTasks) {
      if (task.hasOwnProperty('dueDate') && typeof task.dueDate === 'string') {
          console.log('it gets past the first if statement', task.dueDate);
        if (userDates.some(userDate => {
          // Convert userDate to the 'yyyy-mm-dd' format before comparison
          const formattedUserDate = userDate.split('-').reverse().join('-');
          return task.dueDate.trim() === formattedUserDate;
          console.log(formattedUserDate);
        }))
            console.log("we have a match 2", userDates, dueDate);

          taskListBody.innerHTML = "";

    userDates.forEach(task => {
      const taskRow = createTaskListRow(task);
      taskListBody.appendChild(taskRow)
    });  
        }
      }
    }
   else {
    console.log("No valid date found in the user's input.");
  }
}
// function parseDate(input, outputDueDateFormat) {
//   const formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'MM/dd/yyyy', 'yyyy/dd/MM', 'dd-MM-yyyy', 'yyyy-MM-dd', 'MM-dd-yyyy', 'yyyy-dd-MM'];

//   for (const format of formats) {
//     const parsedDate = parse(input, format, new Date(), { awareOfUnicodeTokens: true });

//     if (!isNaN(parsedDate)) {
//       return format(parsedDate, outputFormat);
//     }
//   }

//   return null; // Return null if no valid date format is found
// }


if (searchBar) {
  searchBar.addEventListener("submit", (event) => {
    adeptSearchInput(event);
    // searchTask(event);
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

if (statusToDoSortButton) {
  statusToDoSortButton.addEventListener("click", (event) => {
    statusSort(event);
  });
}

if (statusWorkingSortButton) {
  statusWorkingSortButton.addEventListener("click", (event) => {
    statusSortWorking(event);
  });
}

if (statusDoneSortButton) {
  statusDoneSortButton.addEventListener("click", (event) => {
    statusSortDone(event);
  });
}

if (nameSortButtonUp) {
  nameSortButtonUp.addEventListener("click", (event) => {
    nameSort(event);
  });
}

if (nameSortButtonDown) {
  nameSortButtonDown.addEventListener("click", (event) => {
    nameSortDown(event);
  });
}

if (descriptionSortButtonUp) {
  descriptionSortButtonUp.addEventListener("click", (event) => {
    descriptionSort(event);
  });
}

if (descriptionSortButtonDown) {
  descriptionSortButtonDown.addEventListener("click", (event) => {
    descriptionSortDown(event);
  });
}

if (categorySortWorkButton) {
  console.log('there is a button!')
  categorySortWorkButton.addEventListener("click", (event) => {
    console.log('there is an event!')
    categorySortWork(event);
  });
}

if (categorySortPersonalButton) {
  categorySortPersonalButton.addEventListener("click", (event) => {
    categorySortPersonal(event);
  });
}

if (categorySortShoppingButton) {
  categorySortShoppingButton.addEventListener("click", (event) => {
    categorySortShopping(event);
  });
}

if (categorySortGardenButton) {
  categorySortGardenButton.addEventListener("click", (event) => {
    categorySortGarden(event);
  });
}

if (dueDateButtonUp) {
  dueDateButtonUp.addEventListener("click", (event) => {
    dateSortUp(event);
  });
}

if (dueDateButtonDown) {
  dueDateButtonDown.addEventListener("click", (event) => {
    dateSortDown(event);
  });
}

if (taskListBody) {
  displayTaskList();
} 




