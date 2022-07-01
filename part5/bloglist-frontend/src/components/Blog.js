import { useState } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';

// TODO
// Blogs don't let you delete them right after creating.
// Have to refresh the page in order to see "remove" button...
// Also must make page re-render after successful delete

const Blog = ({ blog, user }) => {
  const [fullDisplay, setFullDisplay] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const toggleDisplay = () => {
    setFullDisplay(!fullDisplay);
  };

  const addLike = () => {
    console.log('adding like for', blog.id);
    blogService
      .addLike(blog.id, {
        ...blog,
        likes: likes + 1
      })
      .then(returnedBlog => {
        setLikes(prevLikes => prevLikes + 1);
        console.log(returnedBlog);
      })
      .catch(e => console.log(e));
  };

  const removeBlog = () => {
    console.log('Removing blog', blog.id);
    if (window.confirm(`Remove blog '${blog.title} by ${blog.author}?`)) {
      blogService
        .deleteBlog(blog.id);
      console.log('Removed!!!');
    }
  };

  return (
    <div className='border rounded-sm border-black mt-1 px-2 max-w-3xl mx-auto p-1 flex flex-row justify-between'>
      <div className='flex flex-col'>
        <h3
          className='blog--title my-0 mr-1 inline'><strong>{blog.title}</strong>
        </h3>
        <p className='blog--author'>Author: {blog.author}</p>

        { /* <p className='m-0'>DEBUG Likes: {likes}</p>
        <p className='m-0'>DEBUG USER.username: {user.username}</p>
        <p className='m-0'>DEBUG BLOG.user.username: {blog.user.username}</p> */ }


        {fullDisplay && (
          <div>
            <p><a className='blog--url text-blue-400 underline hover:text-blue-700' href={blog.url}>{blog.url}</a></p>
            <p className='blog--likes m-0'>Likes: {likes}</p>
            <button
              className='border border-gray-300 hover:bg-gray-200 ml-1 py-1 px-2 rounded-md mt-2'
              onClick={addLike}
            >
              like
            </button>

            {blog.user.username === user.username && (
              <div className='m-0'>
                <br />
                <button
                  className='bg-white-500 border border-red-400 hover:bg-red-100 text-red-400 py-1 px-2 rounded-md'
                  onClick={removeBlog}
                >
                  remove
                </button>
              </div>
            )}

          </div>
        )}
      </div>

      <button
        className='bg-white-500 border border-blue-700 hover:text-white hover:bg-blue-700 text-blue-700 font-bold py-1 px-2 rounded-md my-2'
        onClick={toggleDisplay}
      >
        {fullDisplay ? 'hide' : 'view'}
      </button>

    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default Blog;