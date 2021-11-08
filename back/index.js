const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(cors())          // Cross-origin resource sharing (CORS)
app.use(express.json())  // parses requests as json


// ********** morgan ********** //
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(function (tokens, req, res) {
    const myLog = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ];
  
    if (req.method === "POST") {
      myLog.push(tokens.body(req, res));
    }
    return myLog.join(" ");
  })
);
// ********** morgan ********** //

// ********** get-static ********** //
app.use("/", express.static(`../front`));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "../front/index.html");
});
// ********** get-static ********** //

// ********** get ********** //
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
app.get('/api/persons', (request, response) => {
  response.json(persons)
})
app.get('/info', (request, response)=>{
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    
    const date = new Date();
    
    response.send(`<h1>phonebook has info for ${maxId} people.</h1><br><h1> ${date}.</h1>`);
})
app.get('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id)
   
    if (person) {
        response.json(person)
      } else {
        response.statusMessage = "Current password does not match";
        response.status(404).end()
    }
})
// ********** get ********** //


// ********** delete ********** //
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})
// ********** delete ********** //


// ********** post ********** //
app.post('/api/persons', (request, response) => {
    const body = request.body;
    const name = body.name;

    if (!body.number || !name) {
      return response.status(400).json({ 
        error: 'number or name missing' 
        })
    }else if (persons.some((person) => person.name === name)){
      return response.status(400).json({ 
        error: 'name must be unique'
        })
    }
    
    const person = {
        id: Math.floor(Math.random() * 1000),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
    response.json(person)
})
// ********** post ********** //

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})