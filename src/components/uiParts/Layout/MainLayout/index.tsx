/* eslint-disable react/display-name */
import { FC, memo, ReactNode } from 'react';

type Props = {
  readonly children: ReactNode;
};

export const MainLayout: FC<Props> = memo((props) => {
  const { children } = props;
  return (
    <div className='mx-auto mt-6 flex w-[80%] flex-col justify-center space-y-10'>{children}</div>
  );
});