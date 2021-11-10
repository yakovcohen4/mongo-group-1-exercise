const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
  _id: Number,
  name: { type: String, required: true },
  number: { type: String, required: true },
});
const Person = mongoose.model('Person', personSchema);

// const person = new Person(3, 'yakov', 0509002017);
// ********* /api/persons ************* //
// ********* /api/persons ************* //
// ********* /api/persons ************* //

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

// ********** get ********** //
router.get('/', (request, response) => {
  console.log('/');
  Person.find({})
    .then(persons => {
      response.status(200).send(persons);
    })
    .catch(error => {
      response.status(500).send(error);
    });
  // res.json(peopleData);
});
router.get('/:id', (request, response) => {
  console.log('/:id');
  console.log(request.params);
  const id = request.params.id;
  console.log(id);
  Person.findById(id)
    .then(person => {
      if (!person) throw 'error';
      console.log(person);
      response.status(200).send(person);
    })
    .catch(error => {
      response.status(404).send('ID not found or not exists');
    });
  //   const id = Number(request.params.id);
  //   const person = persons.find(person => person.id === id);

  //   if (person) {
  //     response.json(person);
  //   } else {
  //     response.status(400).send('no person with this id, try again!');
  //   }
});
// ********** get ********** //

// ********** delete ********** //
router.delete('/:id', (request, response) => {
  console.log(`delete`);
  const id = request.params.id; // string
  Person.findById(id)
    .then(person => {
      if (!person) throw 'error';
      Person.deleteOne({ _id: id })
        .then(() => {
          response.status(200).send(person);
        })
        .catch(error => {
          response.status(500).send('ID not found or not exists');
        });
    })
    .catch(error => {
      response.status(500).send('ID not found or not exists');
    });
});
// ********** delete ********** //

// ********** post ********** //
router.post('/', async (request, response) => {
  const { name, number } = request.body;
  console.log(name, number);

  if (!number || !name) {
    response.status(400).send('number or name missing');
  } else if ((await Person.findOne({ name: name })) && !(await Person.findOne({ number: number }))) {
    await Person.findOneAndUpdate({ name: name }, { number: number });
    console.log('ya');
  }
  //   else if (await Person.findOne({ name: name })) {
  //     res.status(400).send('The contact already exists');
  //   }
  //   else if (persons.some(person => person.name === name)) {
  //     response.status(400).json({
  //       error: 'name must be unique',
  //     });
  //   }
  //   else if (Person.find({ name: name }) || Person.find({ number: number })) {
  //     response.status(400).send('name or number in phone book');
  //   }
  else {
    console.log('in the else');
    //_id: Math.floor(Math.random() * 1000),
    const person = new Person({ _id: Math.floor(Math.random() * 1000), name, number });
    console.log(person);
    person
      .save()
      .then(() => {
        response.status(200).send(person);
      })
      .catch(error => {
        response.status(500).send('someting go worng');
      });

    // const person = {
    //   id: Math.floor(Math.random() * 1000),
    //   name: body.name,
    //   number: body.number,
    // };
    // persons = persons.concat(person);
    // response.json(person);
  }
});
// ********** post ********** //

/************* create uniq ID ******************** */
async function generateId() {
  try {
    let i = 1;
    const contactsArray = await Person.find({});
    contactsArray.forEach(person => {
      if (person._id === i) i++;
    });
    return i;
  } catch (error) {
    console.log(error);
  }
}
/************* create uniq ID ******************** */

module.exports = router;
