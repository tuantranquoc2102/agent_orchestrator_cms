// ===== FILE: src/__tests__/Login.test.jsx =====
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../pages/Login';
import { server } from '../mocks/server';
import { rest } from 'msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders login form', () => {
  render(<Login />);
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('displays error on login failure', async () => {
  server.use(
    rest.post('/api/auth/login', (req, res, ctx) => {
      return res(ctx.status(401), ctx.json({ message: 'Invalid credentials' }));
    })
  );

  render(<Login />);
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'wrongUser' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongPass' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  await waitFor(() => expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument());
});

test('redirects on successful login', async () => {
  server.use(
    rest.post('/api/auth/login', (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ token: 'fakeToken' }));
    })
  );

  render(<Login />);
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'validUser' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'validPass' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  await waitFor(() => expect(localStorage.getItem('token')).toBe('fakeToken'));
});

// ===== FILE: src/__tests__/Register.test.jsx =====
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../pages/Register';
import { server } from '../mocks/server';
import { rest } from 'msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders registration form', () => {
  render(<Register />);
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('displays error on registration failure', async () => {
  server.use(
    rest.post('/api/auth/register', (req, res, ctx) => {
      return res(ctx.status(400), ctx.json({ message: 'User already exists' }));
    })
  );

  render(<Register />);
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'existingUser' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /register/i }));

  await waitFor(() => expect(screen.getByText(/user already exists/i)).toBeInTheDocument());
});

test('redirects on successful registration', async () => {
  server.use(
    rest.post('/api/auth/register', (req, res, ctx) => {
      return res(ctx.status(201), ctx.json({ message: 'User created' }));
    })
  );

  render(<Register />);
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'newUser' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'new@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'newPassword' } });
  fireEvent.click(screen.getByRole('button', { name: /register/i }));

  await waitFor(() => expect(screen.getByText(/user created/i)).toBeInTheDocument());
});

// ===== FILE: src/__tests__/PostList.test.jsx =====
import { render, screen, waitFor } from '@testing-library/react';
import PostList from '../pages/PostList';
import { server } from '../mocks/server';
import { rest } from 'msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('fetches and displays posts', async () => {
  server.use(
    rest.get('/api/posts', (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([{ id: 1, title: 'Post 1', content: 'Content 1' }]));
    })
  );

  render(<PostList />);
  await waitFor(() => expect(screen.getByText(/post 1/i)).toBeInTheDocument());
});

test('displays loading state', () => {
  render(<PostList />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

// ===== FILE: src/__tests__/PostForm.test.jsx =====
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostForm from '../components/PostForm';
import { server } from '../mocks/server';
import { rest } from 'msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders post creation form', () => {
  render(<PostForm />);
  expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
});

test('displays error on post creation failure', async () => {
  server.use(
    rest.post('/api/posts', (req, res, ctx) => {
      return res(ctx.status(400), ctx.json({ message: 'Failed to create post' }));
    })
  );

  render(<PostForm />);
  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Post' } });
  fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'Post content' } });
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => expect(screen.getByText(/failed to create post/i)).toBeInTheDocument());
});

test('submits post creation successfully', async () => {
  server.use(
    rest.post('/api/posts', (req, res, ctx) => {
      return res(ctx.status(201), ctx.json({ message: 'Post created' }));
    })
  );

  render(<PostForm />);
  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Post' } });
  fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'Post content' } });
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => expect(screen.getByText(/post created/i)).toBeInTheDocument());
});

// ===== FILE: src/__tests__/PostEdit.test.jsx =====
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostForm from '../components/PostForm';
import { server } from '../mocks/server';
import { rest } from 'msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders post edit form', () => {
  render(<PostForm post={{ id: 1, title: 'Edit Post', content: 'Edit content' }} />);
  expect(screen.getByLabelText(/title/i)).toHaveValue('Edit Post');
  expect(screen.getByLabelText(/content/i)).toHaveValue('Edit content');
});

test('displays error on post edit failure', async () => {
  server.use(
    rest.put('/api/posts/1', (req, res, ctx) => {
      return res(ctx.status(400), ctx.json({ message: 'Failed to edit post' }));
    })
  );

  render(<PostForm post={{ id: 1, title: 'Edit Post', content: 'Edit content' }} />);
  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Edited Post' } });
  fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'Edited content' } });
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => expect(screen.getByText(/failed to edit post/i)).toBeInTheDocument());
});

test('submits post edit successfully', async () => {
  server.use(
    rest.put('/api/posts/1', (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ message: 'Post updated' }));
    })
  );

  render(<PostForm post={{ id: 1, title: 'Edit Post', content: 'Edit content' }} />);
  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Edited Post' } });
  fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'Edited content' } });
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => expect(screen.getByText(/post updated/i)).toBeInTheDocument());
});

// ===== FILE: src/mocks/server.js =====
import { setupServer } from 'msw/node';
import { rest } from 'msw';

export const server = setupServer(
  // Define request handlers
);

// ===== FILE: src/setupTests.js =====
import '@testing-library/jest-dom/extend-expect';