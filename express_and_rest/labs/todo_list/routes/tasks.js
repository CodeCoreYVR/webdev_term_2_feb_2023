const express = require("express"); // import the express library
const router = express.Router(); // create a new router instance
const knex = require("../db/client"); // import the knex library to interact with the database
const session = require('express-session')  // import the express-session library for session management
const { requireAuth } = require('../app');  // import the requireAuth middleware function from app.js


// ---------------------------------------------- INDEX ----------------------------------------------
// GET method - Route to retrieve all tasks from the database
router.get('/', (request, response) => {
  knex('tasks')
    .select('id', 'body')
    .orderBy('created_at', 'DESC')
    .then(tasks => {
      // Render the index view with tasks data passed as a parameter
      response.render('tasks/index', { tasks })
    })
    .catch(err => {
      console.error(err.message);
      // Set an alert message in the session and redirect back to the previous page
      request.session.alerts = [{ type: 'danger', message: 'Something happened, tasks weren\'t able to be retrieved from database...' }];
      response.redirect('back');
    });
});

// POST method - Route to save a new task to the database - For this instance form for New task is displayed on index page
router.post('/', requireAuth, (request, response) => {
  const { body } = request.body;

  knex('tasks')
    .insert({ body })
    .then( data => {
      // Set an alert message in the session and redirect back to the tasks index page
      request.session.alerts = [{ type: 'success', message: 'Your task has been created!' }];
      response.redirect('/tasks');
    })
    .catch(err => {
      console.error(err.message);
      // Set an alert message in the session and redirect back to the previous page
      request.session.alerts = [{ type: 'danger', message: 'Something happened, your task wasn\'t created...' }];
      response.redirect('back');
    });
});

// ---------------------------------------------- SHOW -----------------------------------------------
// GET method - Route to retrieve a specific task from the database
router.get('/:id', (request, response) => {
  const { id } = request.params;

  knex('tasks')
    .select('id', 'body', 'created_at')
    .where('id', id)
    .then(task => {
      // Render the show view with the task data passed as a parameter
      response.render('tasks/show', ...task);
    })
    .catch(err => {
      console.error(err.message);
      // Set an alert message in the session and redirect back to the previous page
      request.session.alerts = [{ type: 'danger', message: 'Something happened...' }];
      response.redirect('back');
    });
});

// --------------------------------------------- DELETE ----------------------------------------------
// DELETE method - Route to delete a specific task
router.delete('/:id', requireAuth, (request, response) => {
  const { id } = request.params;
  console.log('delete :id: ', id)

  knex('tasks')
    .del()
    .where('id', id)
    .then(data => {
      // Set an alert message in the session and redirect back to the tasks index page
      request.session.alerts = [{ type: 'success', message: 'Your task has been deleted!' }];
      response.redirect('/tasks');
    })
    .catch(err => {
      console.error(err.message);
      // Set an alert message in the session and redirect back to the tasks index page
      request.session.alerts = [{ type: 'danger', message: 'Something happened, task deletion unsuccessful...' }];
      response.redirect('back');
    });
});

// ---------------------------------------------- EDIT -----------------------------------------------
// GET method - Route to render the 'tasks/edit' template to edit a specific task
router.get('/:id/edit', requireAuth, (request, response) => {
  const { id } = request.params;

  knex('tasks')
    .where('id', id)
    .then(task => {
      console.log('Found your task...')
      // Renders the 'tasks/edit' template with the task data
      response.render('tasks/edit', ...task);
    })
    .catch(err => {
      console.error(err.message);
      // Set an alert message in the session and redirect back to the tasks edit page
      request.session.alerts = [{ type: 'danger', message: 'Something happened, was not able to retrieve your task...' }];
      response.redirect('back');
    })
})

// PATCH method - Route to update a specific task in the database
router.patch('/:id', requireAuth, (request, response) => {
  const { body } = request.body;
  const { id } = request.params;

  knex('tasks')
    .update({ body: body })
    .where('id', id)
    .then(data => {
      // Set an alert message in the session and redirect back to the tasks show page
      request.session.alerts = [{ type: 'success', message: 'Task updated successfully.' }];
      response.redirect(`/tasks/${id}`);
    })
    .catch(err => {
      console.error(err.message);
      // Set an alert message in the session and redirect back to the tasks edit page
      request.session.alerts = [{ type: 'error', message: 'Error updating task.' }];
      response.redirect(`back`)
    })
})

module.exports = router;