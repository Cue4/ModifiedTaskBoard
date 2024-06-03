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
        // .addClass('card task-card droppable my-3')
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
    const taskListContainer = document.getElementById('taskList');
    // const taskCard = renderTaskList(task.id, task.name, task.description)
    // const projects = readProjectsFromStorage();
    const todoList = $('#todo-cards');
    todoList.empty();
    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();
    const doneList = $('#done-cards');
    doneList.empty();

  for (let task of tasks) {
    if (task.status === 'to-do') {
      todoList.append(createTaskCard(task));
    } else if (task.status === 'in-progress') {
      inProgressList.append(createTaskCard(task));
    } else if (task.status === 'done') {
      doneList.append(createTaskCard(task));
    }
  }
//   $(document).ready(function() {
//   $('.draggable').draggable({
//     opacity: 0.7,
//     zIndex: 100,
//     helper: function (e) {
//       const original = $(e.target).hasClass('ui-draggable')
//         ? $(e.target)
//         : $(e.target).closest('.ui-draggable');
//       return original.clone().css({
//         width: original.outerWidth(),
//       });
//     },
//   });
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
    // $('#task').val('')
    // $('#duedate').val('')
    // $('#description').val('')
    createTaskCard(newtask)
    renderTaskList(taskList)
}

function readTaskFromStorage(){
    if (!taskList ){
        taskList = []
    }
    return taskList;
}


// Function to handle deleting a task
function handleDeleteTask(event){
    const taskDeleteBtn = $('<button>');
    todoList.empty();
}

// Function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskList = readTaskFromStorage();
    const taskId = ui.draggable[0].dataset.taskId;
    const newStatus = event.target.id;
    for (let task of task) {
        if (task.id === taskId) {
            task.status = newStatus;
          }
        }
        localStorage.setItem('tasklist', JSON.stringify(task));
        handleDrop();
      }
    // $('.lane').droppable({
    //     accept: '.draggable',
    //     drop: handleDrop,
    //   });


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).readyfunction; {
    $('#taskbtn').on('click', handleAddTask)

    renderTaskList();

    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        helper: function (e) {
          const original = $(e.target).hasClass('ui-draggable')
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
    }

