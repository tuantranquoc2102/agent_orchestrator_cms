import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditPost from '../pages/EditPost';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.put('/api/posts/1', (req, res, ctx) => {
    const { title, content } = req.body;
    if (title && content) {
      return res(ctx.status(200), ctx.json({ message: 'Post updated' }));
    }
    return res(ctx.status(400), ctx.json({ message: 'Validation error' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders edit post form', () => {
  render(<EditPost />);
  expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /update post/i })).toBeInTheDocument();
});

test('successful post update shows success message', async () => {
  render(<EditPost />);
  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Updated Post' } });
  fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'Updated content' } });
  fireEvent.click(screen.getByRole('button', { name: /update post/i }));

  await waitFor(() => expect(screen.getByText(/post updated/i)).toBeInTheDocument());
});

test('displays error message on post update failure', async () => {
  render(<EditPost />);
  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: '' } });
  fireEvent.change(screen.getByLabelText(/content/i), { target: { value: '' } });
  fireEvent.click(screen.getByRole('button', { name: /update post/i }));

  await waitFor(() => expect(screen.getByText(/validation error/i)).toBeInTheDocument());
});