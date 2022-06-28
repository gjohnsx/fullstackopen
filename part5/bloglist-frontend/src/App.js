import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('Logging in', username)

    try {
      const user = await loginService.login({
        username, password
      })

      console.log('did we get the user back?\n', user);

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
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
        </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogsDisplay()}
    </div>
  )
}

export default App
