import { useState } from "react";

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
        }))
    };
    
    return(
        <div>
            <form onSubmit={addBlog}>
                <label htmlFor='blog-title'>
                    <p>Title <input id='blog-title' type='text' name='title' value={blogData.title} onChange={handleChange} required /></p>
                </label>
                <label htmlFor='blog-author'>
                    <p>Author <input id='blog-author' type='text' name='author' value={blogData.author} onChange={handleChange} /></p>
                </label>
                <label htmlFor='blog-url'>
                    <p>url <input id='blog-url' type='text' name='url' value={blogData.url} onChange={handleChange} /></p>
                </label>
                <button>Create</button>
            </form>
        </div>
    );
};

export default CreateNewBlog;