import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { getPage } from 'next-page-tester';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/posts/', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'dummy title 1',
          body: 'dummy body 1',
        },
        {
          userId: 2,
          id: 2,
          title: 'dummy title 2',
          body: 'dummy body 2',
        },
      ]),
    );
  }),

  rest.get('https://jsonplaceholder.typicode.com/posts/1', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        userId: 1,
        id: 1,
        title: 'dummy title 1',
        body: 'dummy body 1',
      }),
    );
  }),
  rest.get('https://jsonplaceholder.typicode.com/posts/2', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        userId: 2,
        id: 2,
        title: 'dummy title 2',
        body: 'dummy body 2',
      }),
    );
  }),
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());
describe(`Blog detail page`, () => {
  it('render Blog detail page ID 1', async () => {
    const { page } = await getPage({
      route: '/blog/1',
    });
    render(page);
    expect(await screen.findByText('dummy title 1')).toBeInTheDocument();
    expect(screen.getByText('dummy body 1')).toBeInTheDocument();
  });
  it('render Blog detail page ID 2', async () => {
    const { page } = await getPage({
      route: '/blog/2',
    });
    render(page);
    expect(await screen.findByText('dummy title 2')).toBeInTheDocument();
    expect(screen.getByText('dummy body 2')).toBeInTheDocument();
  });
  it('back to Blog page from Blog detail page', async () => {
    const { page } = await getPage({
      route: '/blog/2',
    });
    render(page);
    await screen.findByText('dummy title 2');
    fireEvent.click(screen.getByTestId('back-blog'));
    expect(await screen.findByText('Blog Test Page')).toBeInTheDocument();
  });
});
