const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

// * GET
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

// * POST
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;
  const user = request.user;

  try {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.number,
      user: user._id
    });

    const savedBlog = await blog.save();

    // * Need to also change the User object by concatting new blogs
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    response.status(401).json({ error: error.message });
    next(error);
  }
});

// * DELETE
blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const requestingUser = request.user;
    const blog = await Blog.findById(request.params.id);
    const blogUserId = blog.user.toString();

    if (requestingUser.id === blogUserId) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      response.status(403).json({ error: 'You are not the blog author!' });
    }
  } catch (error) {
    response.status(400).json({ error: error.message });
    next(error);
  }
});

// * PUT
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.json(updatedBlog);
});

module.exports = blogsRouter;