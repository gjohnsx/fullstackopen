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

test.only('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});


// describe('Likes', () => {
//   test('Only 1 blog', () => {
//     const result = listHelper.totalLikes(listWithOneBlog);
//     expect(result).toBe(5);
//   });

//   test('Many blogs', () => {
//     const result = listHelper.totalLikes(blogs);
//     expect(result).toBe(36);
//   });
// });

// describe('Favorites', () => {
//   test('Blog with the most likes', () => {
//     expect(listHelper.favoriteBlog(blogs)).toEqual({
//       title: 'Canonical string reduction',
//       author: 'Edsger W. Dijkstra',
//       likes: 12
//     });
//   });

//   test('Author with most blogs', () => {
//     expect(listHelper.mostBlogs(blogs)).toEqual({
//       author: 'Robert C. Martin',
//       blogs: 3
//     });
//   });

//   test('Blog with most likes', () => {
//     expect(listHelper.mostLikes(blogs)).toEqual({
//       author: 'Edsger W. Dijkstra',
//       likes: 17
//     });
//   });
// });

// * After Testing:
afterAll(() => {
  mongoose.connection.close();
});