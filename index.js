const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

// connect mongo DB
mongoose.connect(
  `mongodb+srv://${process.env.mongo_username}:${process.env.mongo_password}@cluster.ck0tp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
    useNewUrlparser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.on('connected', () => {
  console.log('mongoDB connected');
});

app.use(cors()); // Cross-origin resource sharing (CORS)
app.use(express.json()); // parses requests as json

// const { errorHandler } = require('./middleware/errorHandler');

// ********** morgan ********** //
morgan.token('body', function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(function (tokens, req, res) {
    const myLog = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
    ];

    if (req.method === 'POST') {
      myLog.push(tokens.body(req, res));
    }
    return myLog.join(' ');
  })
);
// ********** morgan ********** //

// ********** get-static ********** //
app.use('/', express.static(`./front`));
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "./front/index.html");
// });
// ********** get-static ********** //

// ********** /api/persons ********** //
const person = require('./ruoter/person');
app.use('/api/persons', person);

// ********** /info ********** //
const info = require('./ruoter/info');
app.use('/info', info);

// middleware errorHandler
// app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
