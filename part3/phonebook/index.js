const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const Person = require('./models/person');
const morgan = require('morgan');

// * Middleware
morgan.token('id', (req) => req.params.id);
morgan.token('body', (req) => JSON.stringify(req.body));

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'));
app.use(cors());
app.use(express.static('build'));


// * GET Info
app.get('/info', (request, response) => {
  Person.estimatedDocumentCount({}, function( err, count) {
    console.log('number of users:', count);

    response.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>   
        `);
  });
});

// * GET Persons
app.get('/api/people', (request, response) => {
  Person.find({}).then(people => {
    response.json(people);
  });
});

app.get('/api/people/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

// * ADD persons
app.post('/api/people', (request, response, next) => {
  const { name, number } = request.body;

  const person = new Person({
    name: name,
    number: number || null
  });

  person.save().then(savedPerson => {
    response.json(savedPerson);
  })
    .catch(error => {
      console.log('*'.repeat(50));
      console.log('error =', error);
      console.log('\n', 'error.name =', error.name, '\n');
      console.log('\n', 'error.message =', error.message, '\n');
      console.log('*'.repeat(50));
      next(error);
    });
});

// * UPDATE Person
app.put('/api/people/:id', (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson);
    })
    .catch(error => next(error));
});

// * DELETE Persons
app.delete('/api/people/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(result);
      response.status(204).end();
    })
    .catch(error => next(error));
});

// The middleware for handling unsupported routes should be next to last
// and the error handler should be last
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  } else if (error.name === 'MongoServerError') {
    return response.status(409).send({ error: error.message });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});