import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { getPage } from 'next-page-tester';
import { initTestHelpers } from 'next-page-tester';

initTestHelpers();

describe('Navigation by Link', () => {
  it('Should route to selected page in navbar', async () => {
    const { page } = await getPage({
      route: '/ssg',
    });
    render(page);

    userEvent.click(screen.getByTestId('memo-app'));
    expect(await screen.findByText('Memo-App(CSR)')).toBeInTheDocument();
  });
});
