const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

// * GET
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs');

  response.json(users);
});

// * POST
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  // validate the password here:
  if (password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save(function (err) {
    if (!err) {
      return response.status(201).json(savedUser);
    } else {
      if (err.name === 'ValidationError') {
        response.status(400).json({ error: err.message });
      }
    }
  });
});

// * DELETE
usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = usersRouter;