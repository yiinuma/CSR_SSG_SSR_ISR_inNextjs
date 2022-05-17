import { FC } from 'react';
export const Spinner: FC = () => {
  return (
    <div className='mx-auto my-10 h-8 w-8 animate-spin rounded-full border-2 border-primary-600 border-t-transparent'></div>
  );
};
