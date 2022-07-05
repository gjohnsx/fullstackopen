import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
const Blog = ({ blog, user, addLike, removeBlog }) => {
  const [fullDisplay, setFullDisplay] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const [remove, setRemove] = useState(false);

  useEffect(() => {
    if (user.id === blog.user || user.username === blog.user.username) {
      setRemove(true);
    }
  }, []);

  const toggleDisplay = () => {
    setFullDisplay(!fullDisplay);
  };

  const addLikeReRender = () => {
    addLike(blog);
    setLikes(prevLikes => prevLikes + 1);
  };

  const removeBlogReRender = () => {
    removeBlog(blog);
  };

  return (
    <div className='border rounded-sm border-black mt-1 px-2 max-w-3xl mx-auto p-1 flex flex-row justify-between flex-wrap'>
      <div className='flex flex-col'>
        <h3
          className='blog--title my-0 mr-1 inline'><strong>{blog.title}</strong>
        </h3>
        <p className='blog--author'>Author: {blog.author}</p>

        {fullDisplay && (
          <div>
            <p><a className='blog--url text-blue-400 underline hover:text-blue-700' href={blog.url}>{blog.url}</a></p>
            <p className='blog--likes m-0'>Likes: {likes}</p>
            <button
              className='blog--btn-like border border-gray-300 hover:bg-gray-200 py-1 px-2 rounded-md mt-2'
              onClick={addLikeReRender}
            >
              like
            </button>

            {remove && (
              <div className='mx-2 inline'>
                <button
                  className='blog--btn-remove bg-white-500 border border-red-400 hover:bg-red-100 text-red-400 py-1 px-2 rounded-md'
                  onClick={removeBlogReRender}
                >
              remove
                </button>
              </div>
            )}

          </div>
        )}
      </div>

      <button
        className='blog--btn-display bg-white-500 border border-blue-700 hover:text-white hover:bg-blue-700 text-blue-700 font-bold py-1 px-2 rounded-md my-2'
        onClick={toggleDisplay}
      >
        {fullDisplay ? 'hide' : 'view'}
      </button>

    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
};

export default Blog;