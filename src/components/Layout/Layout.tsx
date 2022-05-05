/* eslint-disable react/display-name */
import { FC, memo, ReactNode } from 'react';
import { Navbar } from '../Navbar';

type Props = {
  title: string;
  readonly children: ReactNode;
};

export const Layout: FC<Props> = memo((props) => {
  const { title, children } = props;

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-slate-50 font-mono text-gray-600'>
      <Navbar />

      <div className='flex w-screen flex-1 flex-col items-center justify-center'>
        <h1 className='my-5 text-xl font-bold'>{title}</h1>
        {children}
      </div>
    </div>
  );
});
