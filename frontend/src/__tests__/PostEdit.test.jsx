import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostForm from '../components/PostForm';
import { server } from '../mocks/server';
import { rest } from 'msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('submits edit post form', async () => {
  render(<PostForm post={{ id: 1, title: 'Existing Post', content: 'Existing content' }} />);
  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Updated Post' } });
  fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'Updated content' } });
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => expect(screen.getByText(/post updated successfully/i)).toBeInTheDocument());
});

test('displays error message on edit post failure', async () => {
  server.use(
    rest.put('/api/posts/1', (req, res, ctx) => {
      return res(ctx.status(400), ctx.json({ message: 'Failed to update post' }));
    })
  );

  render(<PostForm post={{ id: 1, title: 'Existing Post', content: 'Existing content' }} />);
  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Updated Post' } });
  fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'Updated content' } });
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => expect(screen.getByText(/failed to update post/i)).toBeInTheDocument());
});