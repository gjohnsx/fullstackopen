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

  // const user = await User.findById(body.userId);
  const user = await User.findOne({ username: 'greg' });
  console.log('using a placeholder user:', user, '\n');
  console.log('\nuser._id=', user.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.number,
    user: user._id
  });

  try {
    const savedBlog = await blog.save();

    // ! This is what i was missing!
    // * Need to also change the User object by concatting new blogs
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch(e) {
    next(e);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

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