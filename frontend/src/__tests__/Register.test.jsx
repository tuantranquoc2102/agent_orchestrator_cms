import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../pages/Register';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.post('/api/auth/register', (req, res, ctx) => {
    const { username, password, email } = req.body;
    if (username && password && email) {
      return res(ctx.status(201), ctx.json({ message: 'User registered' }));
    }
    return res(ctx.status(400), ctx.json({ message: 'Validation error' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders registration form', () => {
  render(<Register />);
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
});

test('successful registration shows success message', async () => {
  render(<Register />);
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'newuser' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
  fireEvent.click(screen.getByRole('button', { name: /register/i }));

  await waitFor(() => expect(screen.getByText(/user registered/i)).toBeInTheDocument());
});

test('displays error message on registration failure', async () => {
  render(<Register />);
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: '' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: '' } });
  fireEvent.click(screen.getByRole('button', { name: /register/i }));

  await waitFor(() => expect(screen.getByText(/validation error/i)).toBeInTheDocument());
});