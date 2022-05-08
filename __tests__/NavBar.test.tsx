import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { getPage } from 'next-page-tester';

describe('Navigation by Link', () => {
  it('route to selected page in navbar', async () => {
    const { page } = await getPage({
      route: '/index',
    });
    render(page);

    userEvent.click(screen.getByTestId('ssg'));
    expect(await screen.findByText('SSG')).toBeInTheDocument();
  });
});
