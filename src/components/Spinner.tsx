import { FC } from 'react';
export const Spinner: FC = () => {
  return (
    <div className='relative z-10 my-5 h-8 w-8 animate-spin rounded-full border-2 border-pink-600 border-t-transparent'></div>
  );
};
