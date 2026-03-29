import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// API Service Layer
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Auth Context for managing user authentication
const AuthContext = React.createContext();

const useAuth = () => {
  return React.useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    setUser(response.data.user);
    localStorage.setItem('token', response.data.token);
  };

  const register = async (username, email, password) => {
    await api.post('/auth/register', { username, email, password });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Components
const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await api.get('/posts');
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Blog Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`} className="text-blue-500">{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PostDetail = ({ match }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await api.get(`/posts/${match.params.id}`);
      setPost(response.data);
    };
    fetchPost();
  }, [match.params.id]);

  return (
    <div className="container mx-auto">
      {post ? (
        <>
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p>{post.content}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/posts', { title, content }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  };

  if (!user) return <Redirect to="/login" />;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Create Post</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="border p-2 w-full" required />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" className="border p-2 w-full" required />
        <button type="submit" className="bg-blue-500 text-white p-2">Submit</button>
      </form>
    </div>
  );
};

const EditPost = ({ match }) => {
  const [post, setPost] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await api.get(`/posts/${match.params.id}`);
      setPost(response.data);
    };
    fetchPost();
  }, [match.params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/posts/${match.params.id}`, post, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  };

  if (!user) return <Redirect to="/login" />;

  return (
    <div className="container mx-auto">
      {post ? (
        <>
          <h1 className="text-2xl font-bold">Edit Post</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} className="border p-2 w-full" required />
            <textarea value={post.content} onChange={(e) => setPost({ ...post, content: e.target.value })} className="border p-2 w-full" required />
            <button type="submit" className="bg-blue-500 text-white p-2">Update</button>
          </form>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="border p-2 w-full" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border p-2 w-full" required />
        <button type="submit" className="bg-blue-500 text-white p-2">Login</button>
      </form>
    </div>
  );
};

const Register = () => {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(username, email, password);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="border p-2 w-full" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border p-2 w-full" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border p-2 w-full" required />
        <button type="submit" className="bg-blue-500 text-white p-2">Register</button>
      </form>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <nav className="bg-gray-800 p-4">
            <Link to="/" className="text-white mr-4">Home</Link>
            <Link to="/login" className="text-white mr-4">Login</Link>
            <Link to="/register" className="text-white">Register</Link>
            <Link to="/create" className="text-white">Create Post</Link>
          </nav>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/posts/:id" component={PostDetail} />
            <Route path="/create" component={CreatePost} />
            <Route path="/edit/:id" component={EditPost} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;