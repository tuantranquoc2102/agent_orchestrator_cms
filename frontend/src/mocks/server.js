import { setupServer } from 'msw/node';
import { rest } from 'msw';

export const server = setupServer(
  rest.post('/api/auth/login', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Login successful' }));
  }),
  rest.post('/api/auth/register', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Registration successful' }));
  }),
  rest.get('/api/posts', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ id: 1, title: 'Post Title', content: 'Post Content' }]));
  }),
  rest.post('/api/posts', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Post created successfully' }));
  }),
  rest.put('/api/posts/:id', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Post updated successfully' }));
  })
);