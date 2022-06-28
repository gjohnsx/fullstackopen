import { useState } from "react";
import blogService from '../services/blogs';

const CreateNewBlog = (props) => {
    const [blogData, setBlogData] = useState({
        title: '',
        author: '',
        url: '',
    });
    
    const addBlog = (event) => {
        event.preventDefault();
        console.log('Submitting new blog!');
        const newBlog = blogData;

        blogService
            .create(newBlog)
            .then(returnedBlog => {
                props.setBlogs(props.blogs.concat(returnedBlog));
                setBlogData({        
                    title: '',
                    author: '',
                    url: '',
                });
        });
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setBlogData(prevBlogData => ({
            ...prevBlogData,
            [name]: value,
        }))
    };
    
    return(
        <div>
            <form onSubmit={addBlog}>
                <label htmlFor='blog-title'>
                    <p>Title <input id='blog-title' type='text' name='title' value={blogData.title} onChange={handleChange} /></p>
                </label>
                <label htmlFor='blog-author'>
                    <p>Author <input id='blog-author' type='text' name='author' value={blogData.author} onChange={handleChange} /></p>
                </label>
                <label htmlFor='blog-url'>
                    <p>url <input id='blog-url' type='text' name='url' value={blogData.url} onChange={handleChange} /></p>
                </label>
                <button>Add new blog</button>
            </form>
            <p>Debug:</p>
            <ul>
                <li>Title: {blogData.title}</li>
                <li>Author: {blogData.author}</li>
                <li>Url: {blogData.url}</li>
            </ul>
        </div>
    );
};

export default CreateNewBlog;