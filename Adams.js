$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})


localStorage.setItem(['Description': 'test one'], ['Due Date': 'dd/mm/yyyy'], ['Priority': 'Medium'], ['Category': 'Personal']);

function createNewTask(event) {
  const description = event.target.elements.inputDescription.value;
  const dueDate = event.target.elements.inputDueDate.value;
  const priority = event.target.input[type:'radio']:checked^label.value;
  const category = event.target.category.value;

  localStorage.setItem(description, dueDate, priority, category);

  console.log( Object.entries(localStorage) );
}

newTaskForm.addEventListener("submit", (event) => {
  createNewTask(event);
  }