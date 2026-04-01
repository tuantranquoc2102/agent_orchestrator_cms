import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../pages/Register';
import { server } from '../mocks/server';
import { rest } from 'msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders register form', () => {
  render(<Register />);
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});

test('submits form with valid data', async () => {
  render(<Register />);
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'newuser' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
  fireEvent.click(screen.getByRole('button', { name: /register/i }));

  await waitFor(() => expect(screen.getByText(/registration successful/i)).toBeInTheDocument());
});

test('displays error message on registration failure', async () => {
  server.use(
    rest.post('/api/auth/register', (req, res, ctx) => {
      return res(ctx.status(400), ctx.json({ message: 'User already exists' }));
    })
  );

  render(<Register />);
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'existinguser' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'existing@example.com' } });
  fireEvent.click(screen.getByRole('button', { name: /register/i }));

  await waitFor(() => expect(screen.getByText(/user already exists/i)).toBeInTheDocument());
});