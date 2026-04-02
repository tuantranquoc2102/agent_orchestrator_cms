import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../pages/Login';
import { server } from '../mocks/server';
import { rest } from 'msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders login form', () => {
  render(<Login />);
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

test('displays error message on login failure', async () => {
  server.use(
    rest.post('/api/auth/login', (req, res, ctx) => {
      return res(ctx.status(401), ctx.json({ message: 'Invalid credentials' }));
    })
  );

  render(<Login />);
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'wrongUser' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongPass' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  await waitFor(() => {
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });
});

test('redirects on successful login', async () => {
  server.use(
    rest.post('/api/auth/login', (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ token: 'fake-token' }));
    })
  );

  render(<Login />);
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'validUser' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'validPass' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  await waitFor(() => {
    expect(localStorage.getItem('token')).toBe('fake-token');
    expect(window.location.pathname).toBe('/'); // Assuming redirect to home
  });
});