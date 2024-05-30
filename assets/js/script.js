// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"))|| [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return `task-${Date.now()}`
}

// Function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>')
        .addClass('card task-card draggable my-3')
        .attr('data-task-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>').addClass('card-text').text(task.type);
    const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
    const cardDeleteBtn = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attr('data-task-id', task.id);
    cardDeleteBtn.on('click', handleDeleteTask);

if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

  if (now.isSame(taskDueDate, 'day')) {
    taskCard.addClass('bg-warning text-white');
  } 
  else if (now.isAfter(taskDueDate)) {
    taskCard.addClass('bg-danger text-white');
    cardDeleteBtn.addClass('border-light');
  }
}
cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
taskCard.append(cardHeader, cardBody);

return taskCard;
}

// Function to render the task list and make cards draggable
function renderTaskList() {
    const taskListContainer = document.getElementById('taskList');
    const taskCard = renderTaskList(task.id, task.name, task.description)
}

// Function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    const taskTitle = $('#task').val()
    const taskDate = $('#duedate').val()
    const taskDescription = $('#description').val()
    const status = 'to-do'
  
    const newtask = {
      title: taskTitle, 
      date: taskDate,
      description: taskDescription,
      status: status,
      id: generateTaskId()
    } 
    taskList.push (newtask)
    localStorage.setItem('tasks', JSON.stringify(taskList))
    $('#formModal').modal('hide')
    $('#task').val('')
    $('#duedate').val('')
    $('#description').val('')
    createnewtask(newtask)
}


// Function to handle deleting a task
function handleDeleteTask(event){
    const taskDeleteBtn = $('<button>');
    todoList.empty();
}

// Function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
      });
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $('#taskbtn').on('click', handleAddTask)

    
    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        helper: function (e) {
        }});
});