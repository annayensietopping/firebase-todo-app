$(function () {
  // Your web app's Firebase configuration
  // const firebaseConfig = {
  //   apiKey: 'your_api_key',
  //   authDomain: 'your_project_id.firebaseapp.com',
  //   databaseURL: 'https://your_database_name.firebaseio.com',
  //   projectId: 'add_your_project_id',
  //   storageBucket: 'your_bucket_name.appspot.com',
  //   storageBucket: 'add_your_storage_bucket_url',
  //   messagingSenderId: 'add_your_messaging_sender_id',
  //   appId: 'add_your_app_id'
  // }

  // Initialize Firebase
  // firebase.initializeApp(firebaseConfig)

  // -------- **CREATE** ---------

  // listener that listens for a
  // submit event on the #addItem form
  $('#add-item').submit(function (event) {
    event.preventDefault()

    // Read the value from the input field and store it in a variable
    const newTaskName = $('#new-task').val()
    console.log(newTaskName)

    // clear out the input field
    $('#new-task').val('')
  })

  // -------- **READ** ---------

  // -------- **UPDATE** ---------

  // The listeners below are using jQuery's .on() method
  // and attaching event listeners to the <body>
  // which allows us to listen to events for
  // elements that are dynamically added
  // after the initial page load

  // Listener for change event on the checkboxes
  $('body').on('change', '#task-list li input[type="checkbox"]', function () {
    // toggle a 'done' class that applies a line-through style to a task
    $(this).parent().toggleClass('done')
    const taskId = $(this).parent().parent().attr('id')
    console.log(taskId)
  })

  // listen for click event on the "edit" link
  // and display edit task form
  $('body').on('click', '#task-list a.edit-task', function () {
    const taskName = $(this).parent().find('span.task-label').text()

    // display edit task form
    // with two buttons 'update' and 'cancel'
    const editTaskFormHtml = buildEditTaskFormHtml(taskName)
    $(this).parent().parent().html(editTaskFormHtml)
  })

  // Listen for click event 'save' button
  // to save changes made to the task
  $('body').on('click', '#save-update', function () {
    // Stores the new task in a variable
    const updatedTaskName = $('#update-task').val()
    const taskId = $(this).parent().attr('id')
    console.log('updated key', taskId)

    // Display new task name with checkbox
    const taskHtml = buildTaskHtml(updatedTaskName)
    $(this).parent().html(taskHtml)
  })

  // Listener that reverts back to the current
  // task name when user clicks 'cancel' button
  $('body').on('click', '#cancel-update', function () {
    // Stores the current task in a variable
    const taskName = $('#update-task').val()

    // Redisplay current task name with checkbox
    const taskHtml = buildTaskHtml(taskName)
    $(this).parent().html(taskHtml)
  })

  // -------- **DELETE** ---------

  $('body').on('click', '#task-list a.delete-task', function () {
    const removedTaskId = $(this).parent().parent().attr('id')

    $(this).parent().parent().remove()
  })

  // -------- Utility Functions ---------

  // html template for a task
  function buildTaskHtml (taskName, isComplete) {
    let checkedAttribute = isComplete ? "checked='checked'" : ''
    let doneClass = isComplete ? 'done' : ''
    return (
      `<label class='checkbox-inline ${doneClass}'>
        <input type='checkbox' ${checkedAttribute} name='items' />

        <span class="task-label"> ${taskName}</span>
        <a href="#" class='edit-task'>edit</a>
        <a href="#" class='delete-task'>delete</a>
      </label>`
    )
  }

  // html template for a edit task form
  function buildEditTaskFormHtml (taskName) {
    return (
      `<input class='form-control' type='text' id='update-task' value="${taskName}">
      <button class='btn btn-primary' href='#' id='save-update'>
        update
      </button>
      <button class='btn btn-default' href='#' id='cancel-update'>
        cancel
      </button>
      `
    )
  }
})
