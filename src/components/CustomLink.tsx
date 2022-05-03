import Link from 'next/link';
import { FC, memo, ReactNode } from 'react';
import { useRecoilValue } from 'recoil';

import { authState } from 'store/authState';

type Props = {
  href: string;
  readonly children: ReactNode;
};

// eslint-disable-next-line react/display-name
export const CustomLink: FC<Props> = memo((props) => {
  const { href, children } = props;
  const auth = useRecoilValue<boolean>(authState);

  return (
    <Link href={href} prefetch={false}>
      <a className='rounded px-3 py-2 text-white  hover:bg-primary-500'>{children}</a>
    </Link>
  );
});
