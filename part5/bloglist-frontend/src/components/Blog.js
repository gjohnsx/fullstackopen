import { useState } from "react";
import blogService from '../services/blogs';

const Blog = ({blog}) => {
  const [fullDisplay, setFullDisplay] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const toggleDisplay = () => {
    setFullDisplay(!fullDisplay);
  };

  const addLike = () => {
    console.log('adding like for', blog.id)
    console.log(blog, typeof blog)
    blogService
      .addLike(blog.id, {
        ...blog,
        likes: blog.likes + 1
      })
      .then(returnedBlog => {
        setLikes(prevLikes => prevLikes + 1);
      })
      .catch(e => console.log(e))
  };

  return (
    <div className='border rounded-sm border-black mt-1 px-2 max-w-3xl mx-auto p-1'>
      <h3
       className='my-0 mr-1 inline'><strong>{blog.title}</strong></h3>
      <button 
        className='bg-white-500 border border-blue-700 hover:text-white hover:bg-blue-700 text-blue-700 font-bold py-1 px-2 rounded-md my-2'
        onClick={toggleDisplay}
      >
        {fullDisplay ? 'hide' : 'view'}
      </button>
      
      {fullDisplay && (
        <div>
          <p>Author: {blog.author}</p>
          <p><a href={blog.url}>{blog.url}</a></p>
          <p className='m-0'>Likes: {likes}</p>
          <button 
            className='border border-gray-300 hover:bg-gray-200 ml-1 py-1 px-2 rounded-md mt-2'
            onClick={addLike}
          >
            like
          </button>
        </div>
      )}
    </div>  
  );
}

export default Blog