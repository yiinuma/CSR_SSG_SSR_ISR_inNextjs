/* eslint-disable react/display-name */
import { FC, memo, ReactNode } from 'react';
import { Navbar } from './Navbar';

type Props = {
  readonly children: ReactNode;
};

export const Layout: FC<Props> = memo((props) => {
  const { children } = props;

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-slate-50 font-mono text-gray-600'>
      <Navbar />
      <div className='flex w-screen flex-1 flex-col items-center justify-center'>{children}</div>
    </div>
  );
});
