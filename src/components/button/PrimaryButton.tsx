import { ReactNode, FC } from 'react';

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

export const PrimaryButton: FC<Props> = (props) => {
  const { onClick, children } = props;
  return (
    <button
      onClick={onClick}
      className='h-10 rounded  bg-primary-600 px-4 text-white hover:bg-primary-500'
    >
      {children}
    </button>
  );
};
