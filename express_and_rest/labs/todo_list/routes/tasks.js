const express = require("express");
const knex = require("../db/client");

const router = express.Router();


router.get('/', (request, response) => {
  console.log('here')
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

router.post('/', (request, response) => {
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

router.delete('/:id', (request, response) => {
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

router.get('/:id/edit', (request, response) => {
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

router.patch('/:id', (request, response) => {
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