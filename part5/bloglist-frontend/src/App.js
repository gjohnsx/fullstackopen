import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LogoutButton from './components/LogoutButton';
import CreateNewBlog from './components/CreateNewBlog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [notification, setNotification] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []);

  useEffect(() => {
    const localUserJSON = window.localStorage.getItem('loggedInBlogAppUser');
    if (localUserJSON) { 
      const user = JSON.parse(localUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    };
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('Logging in', username)

    try {
      const user = await loginService.login({
        username, password
      })

      // save to local storage
      window.localStorage.setItem(
        'loggedInBlogAppUser', JSON.stringify(user)
      );

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log('this user doesnt exist... what happens to him?\n', user);
      console.log(error);
      // alert(error.message);
      setNotification(prevNotification => ({
        text: 'wrong username or password',
        type: 'error'
      }))
      setTimeout(() => {
        setNotification(null)
      }, 3000);
    };
  };

  const blogsDisplay = () => (
    blogs.map(blog => 
      <Blog key={blog.id} blog={blog} />
      )
  )

  if (user === null) {
    return (
        <div>
          <h1>log in to application</h1>
          <form onSubmit={handleLogin}>
            <input 
              type='text' 
              placeholder='username' 
              name='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <input
              type='password'
              placeholder='password'
              name='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <button>log in</button>
          </form>

          {notification && <Notification notification={notification}/>}
          
        </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {notification && <Notification notification={notification}/>}
      <p><strong>{user.name}</strong> logged in</p>
      <LogoutButton setUser={setUser} />
      <CreateNewBlog 
        blogs={blogs}
        setBlogs={setBlogs}
        notification={notification}
        setNotification={setNotification}
      />
      {blogsDisplay()}
    </div>
  )
}

export default App
