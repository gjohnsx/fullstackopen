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
describe('when there are initially some blogs saved', () => {
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

  test('unique identifier property of blog post is named id', async () => {
    const blogs = await api.get('/api/blogs');
    expect(blogs.body[0].id).toBeDefined();
  });
});

describe('posting a new blog', () => {
  test('succeeds with status code 201 with valid data', async () => {
    const newBlog = {
      title: 'New blog API test',
      author: 'gjohnsx',
      url: 'http://gjohns.xyz',
      likes: 0,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map(blog => blog.title);
    expect(titles).toContainEqual('New blog API test');
  });

  test('likes default to 0 if undefined in new blog creation', async () => {
    const newBlogWithoutLikes = {
      title: 'New blog without likes',
      author: 'gjohnsx',
      url: 'http://gjohns.xyz/no-likes',
    };

    await api
      .post('/api/blogs')
      .send(newBlogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    const blogToView = blogsAtEnd[blogsAtEnd.length -1];
    expect(blogToView.likes).toEqual(0);
  });

  test('fails with status code 400 if no title or no url supplied', async () => {
    const newBlogWithoutTitleUrl = {
      author: 'gjohnsx',
    };

    await api
      .post('/api/blogs')
      .send(newBlogWithoutTitleUrl)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('deleting a blog post', () => {
  test.only('succeeds with status code 204 with valid id', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
    const titles = blogsAtEnd.map(blog => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
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