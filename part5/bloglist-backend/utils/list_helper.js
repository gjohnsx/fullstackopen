const blog = require('../models/blog');

const dummy = (blogs) => {
  return 1;
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
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};