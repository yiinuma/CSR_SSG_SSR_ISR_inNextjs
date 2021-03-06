import Link from 'next/link';
import { POST } from 'types/jsonPlaceHolder';

export const JsonPost: React.FC<POST> = ({ id, title }) => {
  return (
    <div>
      <span>{id}</span>
      {' : '}
      <Link href={`/blog/${id}`}>
        <a className='cursor-pointer border-b border-gray-500 hover:bg-gray-300'>{title}</a>
      </Link>
    </div>
  );
};
