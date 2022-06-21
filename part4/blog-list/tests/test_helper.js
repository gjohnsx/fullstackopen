const Blog = require('../models/blog');

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, cur) => {
    return sum += cur.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  let favIndex = 0;
  let favLikes = 0;
  for (let i=0; i<blogs.length; i++) {
    if (blogs[i].likes > favLikes) {
      favLikes = blogs[i].likes;
      favIndex = i;
    };
  };
  return {
    title: blogs[favIndex].title,
    author: blogs[favIndex].author,
    likes: favLikes
  };
};

const mostBlogs = blogs => {
  let mostBlogsObj = {};
  for (let i=0; i<blogs.length; i++) {
    let author = blogs[i].author;
    if (Object.keys(mostBlogsObj).includes(author)) {
      mostBlogsObj[author] += 1;
    } else {
      mostBlogsObj[author] = 1;
    }
  }

  let mostBlogs = 0;
  let mostBlogsAuthor = null;

  let entries = Object.entries(mostBlogsObj);

  entries.forEach(entry => {
    if (entry[1] > mostBlogs) {
      mostBlogs = entry[1];
      mostBlogsAuthor = entry[0];
    }
  });

  return {
    author: mostBlogsAuthor,
    blogs: mostBlogs
  };
};

const mostLikes = blogs => {
  let mostLikes = 0;
  let mostLikesAuthor = null;

  let authors = {};

  blogs.forEach(blog => {
    const { author, likes } = blog;
    if (Object.keys(authors).includes(author)) {
      authors[author] += likes;
    } else {
      authors[author] = likes;
    }
  });

  const entries = Object.entries(authors);
  entries.forEach(entry => {
    if (entry[1] > mostLikes) {
      mostLikes = entry[1];
      mostLikesAuthor = entry[0];
    }
  });

  return {
    author: mostLikesAuthor,
    likes: mostLikes
  };
};

module.exports = {
  initialBlogs,
  blogsInDb,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};