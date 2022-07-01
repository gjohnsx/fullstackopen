/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LogoutButton from './components/LogoutButton';
import CreateNewBlog from './components/CreateNewBlog';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [notification, setNotification] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs.sort((a, b) => b.likes - a.likes));
    });
  }, []);

  useEffect(() => {
    const localUserJSON = window.localStorage.getItem('loggedInBlogAppUser');
    if (localUserJSON) {
      const user = JSON.parse(localUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('Logging in', username);

    try {
      const user = await loginService.login({
        username, password
      });

      // save to local storage
      window.localStorage.setItem(
        'loggedInBlogAppUser', JSON.stringify(user)
      );

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      setNotification(prevNotification => ({
        text: 'wrong username or password',
        type: 'error'
      }));
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  const blogFormRef = useRef();

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog));
        setNotification(prevNotification => ({
          text: `a new blog '${returnedBlog.title}' by ${returnedBlog.author} added..}`,
          type: 'success'
        }));
      })
      .then(setTimeout(() => {
        setNotification(null);
      }, 5000))
      .catch(error => setNotification(prevNotification => ({
        text: error.message,
        type: 'error'
      })));
  };

  const addLike = (blog) => {
    console.log('adding like for', blog.id);
    blogService
      .addLike(blog.id, {
        ...blog,
        likes: blog.likes + 1
      })
      // .then(returnedBlog => {
      //   setLikes(prevLikes => prevLikes + 1);
      //   console.log(returnedBlog);
      // })
      .catch(e => console.log(e));
  };

  const blogForm = () => (
    <Toggleable buttonLabel='add new blog' ref={blogFormRef}>
      <CreateNewBlog
        createBlog={addBlog}
      />
    </Toggleable>
  );

  const blogsDisplay = () => (
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} user={user} addLike={addLike} />
    )
  );

  if (user === null) {
    return (
      <div className='mx-2 my-4'>
        <h1>log in to application</h1>
        <form onSubmit={handleLogin}>
          <input
            type='text'
            className='mb-2 border border-gray-500 rounded'
            placeholder='username'
            name='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <input
            type='password'
            className='mb-2 border border-gray-500 rounded ml-1'
            placeholder='password'
            name='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <button className='bg-blue-600 text-white border border-black px-2 rounded-md my-2 ml-1 hover:bg-blue-900'>log in</button>
        </form>

        {notification && <Notification notification={notification}/>}

      </div>
    );
  }

  return (
    <div className='mx-2 my-4'>
      <h2 className='text-8xl	text-blue-900'>blogs</h2>
      {notification && <Notification notification={notification}/>}
      <p><strong>{user.name}</strong> logged in</p>
      <LogoutButton setUser={setUser} />

      {blogForm()}

      {blogsDisplay()}
    </div>
  );
};

export default App;
