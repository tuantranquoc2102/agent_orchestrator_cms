import { render, screen, waitFor } from '@testing-library/react';
import PostList from '../pages/PostList';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/posts', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ id: 1, title: 'Post 1', content: 'Content 1' }]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders post list and fetches posts', async () => {
  render(<PostList />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await waitFor(() => expect(screen.getByText(/post 1/i)).toBeInTheDocument());
});