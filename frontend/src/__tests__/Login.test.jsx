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
});

test('submits form with valid credentials', async () => {
  render(<Login />);
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  await waitFor(() => expect(screen.getByText(/login successful/i)).toBeInTheDocument());
});

test('displays error message on login failure', async () => {
  server.use(
    rest.post('/api/auth/login', (req, res, ctx) => {
      return res(ctx.status(401), ctx.json({ message: 'Invalid credentials' }));
    })
  );

  render(<Login />);
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'wronguser' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpass' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  await waitFor(() => expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument());
});