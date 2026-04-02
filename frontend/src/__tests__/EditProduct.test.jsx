import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditProduct from '../pages/EditProduct';
import { server } from '../mocks/server';
import { rest } from 'msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders edit product form', async () => {
  server.use(
    rest.get('/api/products/1', (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ id: 1, name: 'Product 1', description: 'Description', price: 10.00 }));
    })
  );

  render(<EditProduct productId={1} />);
  await waitFor(() => {
    expect(screen.getByLabelText(/name/i)).toHaveValue('Product 1');
    expect(screen.getByLabelText(/description/i)).toHaveValue('Description');
    expect(screen.getByLabelText(/price/i)).toHaveValue('10.00');
  });
});

test('displays error message on edit product failure', async () => {
  server.use(
    rest.put('/api/products/1', (req, res, ctx) => {
      return res(ctx.status(400), ctx.json({ message: 'Failed to update product' }));
    })
  );

  render(<EditProduct productId={1} />);
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Updated Product' } });
  fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Updated description' } });
  fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '15.00' } });
  fireEvent.click(screen.getByRole('button', { name: /save/i }));

  await waitFor(() => {
    expect(screen.getByText(/failed to update product/i)).toBeInTheDocument();
  });
});