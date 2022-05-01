import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className='w-screen bg-lime-600 font-mono'>
      <div className='flex h-12 items-center pl-4'>
        <div className='flex space-x-1 text-sm'>
          <Link href='/'>
            <a className='rounded px-3 py-2 text-white hover:bg-lime-500'>Home</a>
          </Link>
          <Link href='/memo'>
            <a className='rounded px-3 py-2 text-white hover:bg-lime-500'>Memo_App(CSR)</a>
          </Link>
          <Link href='/ssg'>
            <a className='rounded px-3 py-2 text-white hover:bg-lime-500'>SSG</a>
          </Link>
          <Link href='/ssr'>
            <a className='rounded px-3 py-2 text-white hover:bg-lime-500'>SSR</a>
          </Link>
          <Link href='/isr'>
            <a className='rounded px-3 py-2 text-white hover:bg-lime-500'>ISR</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};
