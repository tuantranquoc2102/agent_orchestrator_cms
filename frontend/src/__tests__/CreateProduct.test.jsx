import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateProduct from '../pages/CreateProduct';
import { server } from '../mocks/server';
import { rest } from 'msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders create product form', () => {
  render(<CreateProduct />);
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
});

test('displays error message on create product failure', async () => {
  server.use(
    rest.post('/api/products', (req, res, ctx) => {
      return res(ctx.status(400), ctx.json({ message: 'Failed to create product' }));
    })
  );

  render(<CreateProduct />);
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'New Product' } });
  fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Product description' } });
  fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '10.00' } });
  fireEvent.click(screen.getByRole('button', { name: /create/i }));

  await waitFor(() => {
    expect(screen.getByText(/failed to create product/i)).toBeInTheDocument();
  });
});