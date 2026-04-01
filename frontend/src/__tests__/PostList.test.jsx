import { render, screen, waitFor } from '@testing-library/react';
import PostList from '../pages/Dashboard';
import { server } from '../mocks/server';
import { rest } from 'msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('fetches and displays posts', async () => {
  render(<PostList />);
  await waitFor(() => expect(screen.getByText(/post title/i)).toBeInTheDocument());
});

test('displays loading state', () => {
  render(<PostList />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});