import { useState } from 'react';

const CreateNewBlog = ({ createBlog }) => {
  const [blogData, setBlogData] = useState({
    title: '',
    author: '',
    url: '',
  });

  const addBlog = (event) => {
    event.preventDefault();
    console.log('Submitting new blog!');

    createBlog(blogData);

    setBlogData({
      title: '',
      author: '',
      url: '',
    });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setBlogData(prevBlogData => ({
      ...prevBlogData,
      [name]: value,
    }));
  };

  return(
    <div>
      <form className='border border-gray-300 p-2 my-2 rounded-md' onSubmit={addBlog}>
        <label htmlFor='blog-title'>
          <p className='text-xl font-bold'>
            Title
            <input
              className='create-new-blog--title ml-1 font-normal indent-0.5 mb-2 border border-gray-500 rounded'
              id='blog-title'
              type='text'
              name='title'
              value={blogData.title}
              onChange={handleChange}
              required
            />
          </p>
        </label>
        <label htmlFor='blog-author'>
          <p className='text-xl font-bold'>
                        Author
            <input className='create-new-blog--author ml-1 font-normal indent-0.5 mb-2 border border-gray-500 rounded' id='blog-author' type='text' name='author' value={blogData.author} onChange={handleChange}
            />
          </p>
        </label>
        <label htmlFor='blog-url'>
          <p className='text-xl font-bold'>
                        url
            <input className='create-new-blog--url ml-1 font-normal indent-0.5 border border-gray-500 rounded' id='blog-url' type='text' name='url' value={blogData.url} onChange={handleChange}
            />
          </p>
        </label>
        <button className='create-new-blog--btn bg-blue-600 text-white border border-black py-1 px-2 rounded-md my-2'>Create</button>
      </form>
    </div>
  );
};

export default CreateNewBlog;