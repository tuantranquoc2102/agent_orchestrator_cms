import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreatePost from '../pages/CreatePost';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.post('/api/posts', (req, res, ctx) => {
    const { title, content } = req.body;
    if (title && content) {
      return res(ctx.status(201), ctx.json({ message: 'Post created' }));
    }
    return res(ctx.status(400), ctx.json({ message: 'Validation error' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders create post form', () => {
  render(<CreatePost />);
  expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /create post/i })).toBeInTheDocument();
});

test('successful post creation shows success message', async () => {
  render(<CreatePost />);
  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Post' } });
  fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'Post content' } });
  fireEvent.click(screen.getByRole('button', { name: /create post/i }));

  await waitFor(() => expect(screen.getByText(/post created/i)).toBeInTheDocument());
});

test('displays error message on post creation failure', async () => {
  render(<CreatePost />);
  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: '' } });
  fireEvent.change(screen.getByLabelText(/content/i), { target: { value: '' } });
  fireEvent.click(screen.getByRole('button', { name: /create post/i }));

  await waitFor(() => expect(screen.getByText(/validation error/i)).toBeInTheDocument());
});