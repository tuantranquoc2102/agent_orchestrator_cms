import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../pages/Login';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.post('/api/auth/login', (req, res, ctx) => {
    const { username, password } = req.body;
    if (username === 'testuser' && password === 'password') {
      return res(ctx.status(200), ctx.json({ token: 'fake_token' }));
    }
    return res(ctx.status(401), ctx.json({ message: 'Invalid credentials' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders login form', () => {
  render(<Login />);
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

test('successful login redirects user', async () => {
  render(<Login />);
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  await waitFor(() => expect(localStorage.getItem('token')).toBe('fake_token'));
  expect(window.location.pathname).toBe('/'); // Assuming redirect to home
});

test('displays error message on login failure', async () => {
  render(<Login />);
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'wronguser' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  await waitFor(() => expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument());
});