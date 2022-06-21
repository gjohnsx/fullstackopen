const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

// * Before Testing:
beforeEach(async () => {
  await Blog.deleteMany({});
  console.log('cleared');

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});


// * Tests:
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test.only('unique identifier property of blog post is named id', async () => {
  const blogs = await api.get('/api/blogs');
  expect(blogs.body[0].id).toBeDefined();
});

describe('Likes', () => {
//   test('Only 1 blog', () => {
//     const result = helper.totalLikes(helper.initialBlogs);
//     expect(result).toBe(5);
//   });

  test('Many blogs', () => {
    const result = helper.totalLikes(helper.initialBlogs);
    expect(result).toBe(36);
  });
});

describe('Favorites', () => {
  test('Blog with the most likes', () => {
    expect(helper.favoriteBlog(helper.initialBlogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    });
  });

  test('Author with most blogs', () => {
    expect(helper.mostBlogs(helper.initialBlogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    });
  });

  test('Blog with most likes', () => {
    expect(helper.mostLikes(helper.initialBlogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    });
  });
});

// * After Testing:
afterAll(() => {
  mongoose.connection.close();
});