const express = require("express");
const router = express.Router();
const knex = require("../db/client");
const { requireAuth } = require('../app');


// ---------------------------------------------- INDEX ----------------------------------------------
// GET method - Route to retrieve all tasks from the database
router.get('/', (request, response) => {
  knex('tasks')
    .select('id', 'body')
    .orderBy('created_at', 'DESC')
    .then(tasks => {
      response.render('tasks/index', { tasks })
    })
    .catch(err => {
      console.error(err.message);
      response.send(`<h1>Something happened, tasks weren't able to be retrevied from database...</h1>`);
    });
});

// POST method - Route to save a new task to the database - For this instance form for New task is displayed on index page
router.post('/', requireAuth, (request, response) => {
  const { body } = request.body;
  console.log('body: ', body)
  knex('tasks')
    .insert({ body })
    .then( data => {
      response.redirect('/tasks');
    })
    .catch(err => {
      console.error(err.message);
      response.send(`<h1>Something happened, your task wasn't created...</h1>`);
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
      response.render('tasks/show', ...task);
    })
    .catch(err => {
      console.error(err.message);
      response.send('<h1>Something happened...</h1>');
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
      console.log('Task successfully deleted...');
      response.redirect('/tasks');
    })
    .catch(err => {
      console.error(err.message);
      response.send('<h1>Something happened, task deletion unsuccessful...</h1>');
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
      response.render('tasks/edit', ...task);
    })
    .catch(err => {
      console.error(err.message);
      response.send('<h1>Something happened, was not able to retrieve your task...</h1>');
    })
})

// PATCH method - Route to update a specific task in the database
router.patch('/:id', requireAuth, (request, response) => {
  const { body } = request.body;
  const { id } = request.params;
  console.log('body: ', body)

  knex('tasks')
    .update({ body: body })
    .where('id', id)
    .then(data => {
      console.log('task successfully updated...');
      response.redirect(`/tasks/${id}`);
    })
    .catch(err => {
      console.error(err.message);
      response.send('<h1>Something happened, your task was not updated...</h1>')
    })
})

module.exports = router;