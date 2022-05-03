import { CustomLink } from 'components/CustomLink';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className='w-screen bg-primary-600 font-mono'>
      <div className='flex h-12 items-center pl-4'>
        <div className='flex space-x-1 text-sm'>
          <CustomLink href='/'>Home</CustomLink>
          <CustomLink href='/memo-app'>Memo-App(CSR)</CustomLink>
          <CustomLink href='/ssg'>SSG</CustomLink>
          <CustomLink href='/ssr'>SSR</CustomLink>
          <CustomLink href='/isr'>ISR</CustomLink>
          <CustomLink href='/csr'>SSG+CSF</CustomLink>
        </div>
      </div>
    </nav>
  );
};
