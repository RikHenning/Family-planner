// $('#myModal').on('shown.bs.modal', function () {
//   $('#myInput').trigger('focus')
// })


localStorage.setItem(JSON.stringify({'task': 0}), [JSON.stringify({'Description': 'test one'}), JSON.stringify({'Due Date': 'dd/mm/yyyy'}), JSON.stringify({'Priority': 'Medium'}), JSON.stringify({'Category': 'Personal'})]);

const newTaskForm = document.getElementById('newTaskForm');

 console.log( {...localStorage} );

function createNewTask(event) {
  event.preventDefault();
  const description = event.target.elements.inputDescription.value;
  const dueDate = event.target.elements.inputDueDate.value;
  let prioChecked 
    if (event.target.flexRadioDefault1.checked === true) {
      prioChecked = event.target.flexRadioDefault1;
    }
    else if (event.target.flexRadioDefault2.checked === true) {
      prioChecked  = event.target.flexRadioDefault2;
    }
    else if (event.target.flexRadioDefault3.checked === true) {
      prioChecked  = event.target.flexRadioDefault3;
    } 
  const priority = prioChecked
  const category = event.target.category.value;

  // const lastTask = JSON.parse(Object.values(localStorage.getItem('task')));
  const lastTask = JSON.parse(localStorage.getItem('task'));
  const taskHigh = lastTask 
  // get highest number
  const taskNumber = taskHigh + 1

  console.log(lastTask);
  console.log(taskHigh);
  console.log(taskNumber);

  localStorage.setItem(JSON.stringify({'task': taskNumber}), [JSON.stringify({'Description': description}), JSON.stringify({'Due Date': dueDate}), JSON.stringify({'Priority': priority}), JSON.stringify({'Category': category})]);
 
  console.log( {...localStorage} );

  // localStorage.clear();
  // localStorage.setItem(description, dueDate, priority, category);

  // console.log( Object.entries(localStorage) );
}

newTaskForm.addEventListener("submit", (event) => {
  createNewTask(event);
  });