// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
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
    const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>').addClass('card-text').text(task.description);
    const cardDueDate = $('<p>').addClass('card-text').text(task.date);
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
    const tasks = readTaskFromStorage();
    // const taskListContainer = document.getElementById('taskList');
    const todoList = $('#todo-cards');
    todoList.empty();
    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();
    const doneList = $('#done-cards');
    doneList.empty();

  for (let task of taskList) {
    if (task.status === 'to-do') {
      todoList.append(createTaskCard(task));
    } else if (task.status === 'in-progress') {
      inProgressList.append(createTaskCard(task));
    } else if (task.status === 'done') {
      doneList.append(createTaskCard(task));
    }
  }
}

// Function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    const taskTitle = $('#task').val()
    const taskDate = $('#duedate').val()
    const taskDescription = $('#description').val()
    const status = 'to-do';
  
    const newTask = {
      title: taskTitle, 
      date: taskDate,
      description: taskDescription,
      status: status,
      id: generateTaskId()
    };
    taskList.push (newTask);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    $('#formModal').modal('hide')

    // const taskColumn = taskList.status === 'to-do' ? $('#todo-cards') :
    // taskList.status === 'in-progress' ? $('#in-progress-cards') :
    // taskList.status === 'done' ? $(`#done-cards`) :
    // taskColumn.append(createTaskCard());
    renderTaskList();

  
    // createTaskCard(newtask)
    // renderTaskList(taskList)
    // handleAddTask()
}

function readTaskFromStorage(){

    // const storedTasks = localStorage.getItem('tasks');
    // taskList = storedTasks ? JSON.parse(storedTasks) : [];

    if (!taskList ){
        taskList = []
    }
    return taskList;
}

// Function to handle deleting a task
function handleDeleteTask(event){
    const taskId = $(event.target).attr('data-task-id');
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    $(event.target).closest('.task-card').remove();
}






// Function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskList = readTaskFromStorage();
    // const taskCard = ui.draggable.attr('data-task-id');
    const taskCard = $.draggable['.card'].dataset.taskCard;
    const newStatus = event.target.id;
    for (let task of taskList) {
        if (task.card === taskCard) {
            task.status = newStatus;
          }
          localStorage.setItem('task', JSON.stringify(taskList));
        //   handleDrop();
        // return dropElement();
    }}
// The page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function() {
    $('#taskbtn').on('click', handleAddTask)

    renderTaskList();

    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        helper: function (e) {
          const original = $(e.target).hasClass('.draggable')
            ? $(e.target)
            : $(e.target).closest('.ui-draggable');
          return original.clone().css({
            width: original.outerWidth(),
          });
        },
      });

    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
      });
     
    });

