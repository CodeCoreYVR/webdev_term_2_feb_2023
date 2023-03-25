// import the Express framework, knex client and create a router object
const express = require("express");
const db = require("../db/client");

const router = express.Router();

// ---------------------------------------------- INDEX ----------------------------------------------
// GET method - Route to retrieve all notes from the database
router.get('/', (request, response) => {
  db('notes')
    .select('id', 'content')
    .orderBy('created_at', 'DESC')
    .then(notes => {
       // If notes are successfully found, render the 'notes/index' template with the retrieved notes
      console.log('Notes successfully found...');
      response.status(200).render('notes/index', { notes }); // 200 OK: If the data was successfully updated in the database.
    })
    .catch(err => {
      // If there's an error, log the error and send a 500 status with an error message
      console.error(err.message);
      response.status(500).send({ error: 'Could not retrieve notes' }); // 500 Internal Server Error: If there was an unexpected error on the server side while inserting the data
    })
})

// ----------------------------------------------- NEW -----------------------------------------------
// GET method - Route to render the 'notes/new' template to create a new note
router.get('/new', (request, response) => {
  response.render('notes/new');
})

// POST method - Route to save a new note to the database
router.post('/', (request, response) => {
  const { content } = request.body;
  console.log("content: ", content)
  db('notes')
  .insert({ content })
  .then(data => {
     // If note is successfully saved, redirect to the 'notes/index' route
    console.log('Note successfully saved...')
    response.status(201).redirect('/notes'); // 201 Created: If the data was successfully inserted into the database
  })
  .catch(err => {
    // If there's an error, log the error and send a 500 status with an error message
    console.error(err.message);
    response.status(500).send({ error: 'Could not save note' }) // 500 Internal Server Error: If there was an unexpected error on the server side while inserting the data
  })
})

// ---------------------------------------------- SHOW -----------------------------------------------
// GET method - Route to retrieve a specific note from the database
router.get('/:id', (request, response) => {
  const { id } = request.params;

  db('notes')
    .select('id', 'content', 'created_at')
    .where('id', id)
    .then(note => {
       // If note is successfully found, render the 'notes/show' template with the retrieved note
      console.log('Note successfully found...');
      response.status(200).render('notes/show', ...note); // 200 OK: If the request was successful and the data was retrieved as expected
    })
    .catch(err => {
      // If there's an error, log the error and send a 500 status with an error message
      console.error(err.message);
      response.status(500).send({ error: 'Could not retrieve note' }) // 500 Internal Server Error: If there was an unexpected error on the server side while retrieving the data
    })
})

// ---------------------------------------------- EDIT -----------------------------------------------
// GET method - Route to render the 'notes/edit' template to edit a specific note
router.get('/:id/edit', (request, response) => {
  const { id } = request.params;

  // Find the note with the given ID in the database
  db('notes')
    .select('id', 'content', 'updated_at')
    .where('id', id)
    .then(note => {
      // If note is successfully found, render the 'notes/edit' template with the retrieved note
      console.log('Note successfully found...');
      response.status(200).render('notes/edit', ...note); // 200 OK: If the request was successful and the data was retrieved as expected
    })
    .catch(err => {
      // If there's an error, log the error and send a 500 status with an error message
      console.error(err.message);
      response.status(500).send({ error: 'Could not retrieve note' }) // 500 Internal Server Error: If there was an unexpected error on the server side while retrieving the data
    })
})

// PATCH method - Route to update a specific note in the database
router.patch('/:id', (request, response) => {
  const { id } = request.params;
  const { content } = request.body;
  
  db('notes')
    .update({ content })
    .where('id', id)
    .then(data => {
      // If note is successfully updated, redirects to the 'notes/show' route
      console.log('Note successfully updated...');
      response.status(200).redirect(`/notes/${id}`);
    })
    .catch(err => {
      // If there's an error, log the error and send a 500 status with an error message
      console.error(err.message);
      response.status(500).send({ error: 'Could not update note' });
    })
})

// --------------------------------------------- DELETE ----------------------------------------------
// DELETE method - Route to delete a specific note
router.delete('/:id', (request, response) => {
  const { id } = request.params;

   // Delete the note with the given ID from the database
  db('notes')
    .del()
    .where('id', id)
    .then(data => {
      // If note is successfully deleted, redirects to the 'notes/index' route
      console.log('Note successfully deleted...');
      response.status(204).redirect('/notes'); // 204 No Content: If the data was successfully deleted from the database.
    })
    .catch(err => {
      // If there's an error, log the error and send a 500 status with an error message
      console.error(err.message);
      response.status(500).send({ error: 'Could not delete note' });
    })
})


module.exports = router;