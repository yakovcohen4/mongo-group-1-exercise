const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

router.get('/', (request, response) => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0;

  const date = new Date();

  response.send(`<h1>phonebook has info for ${maxId} people.</h1><br><h1> ${date}.</h1>`);
});

module.exports = router;
