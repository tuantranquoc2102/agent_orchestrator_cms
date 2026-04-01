import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostForm from '../components/PostForm';
import { server } from '../mocks/server';
import { rest } from 'msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('submits create post form', async () => {
  render(<PostForm />);
  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Post' } });
  fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'Post content' } });
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => expect(screen.getByText(/post created successfully/i)).toBeInTheDocument());
});

test('displays error message on create post failure', async () => {
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