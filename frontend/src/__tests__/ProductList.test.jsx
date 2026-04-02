import { render, screen, waitFor } from '@testing-library/react';
import ProductList from '../pages/ProductList';
import { server } from '../mocks/server';
import { rest } from 'msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('fetches and displays products', async () => {
  server.use(
    rest.get('/api/products', (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([{ id: 1, name: 'Product 1', price: 10.00 }]));
    })
  );

  render(<ProductList />);
  await waitFor(() => {
    expect(screen.getByText(/product 1/i)).toBeInTheDocument();
  });
});