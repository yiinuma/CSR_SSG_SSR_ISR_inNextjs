import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { PrimaryButton } from 'components/button/PrimaryButton';

describe('PrimaryButton Test', () => {
  afterEach(() => cleanup());
  it('render', () => {
    render(<PrimaryButton>Test</PrimaryButton>);
    expect(screen.getByRole('button')).toBeTruthy;
  });
  // ボタン押下時に関数が実行されること
  it('ボタン押下時に関数実行', () => {
    const clickFn = jest.fn();
    render(<PrimaryButton onClick={clickFn}>Test</PrimaryButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(clickFn).toHaveBeenCalledTimes(1);
  });
});
