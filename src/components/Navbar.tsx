import { CustomLink } from 'components/CustomLink';

export const Navbar = () => {
  return (
    <nav className='w-screen bg-primary-600 font-mono'>
      <div className='flex h-12 items-center pl-4'>
        <div className='flex space-x-1 text-sm'>
          <CustomLink href='/' testId='home'>
            Home
          </CustomLink>
          <CustomLink href='/memo-app' testId='memo-app'>
            Memo-App(CSR)
          </CustomLink>
          <CustomLink href='/ssg' testId='ssg'>
            SSG
          </CustomLink>
          <CustomLink href='/ssr' testId='ssr'>
            SSR
          </CustomLink>
          <CustomLink href='/isr' testId='isr'>
            ISR
          </CustomLink>
          <CustomLink href='/csr' testId='csr'>
            SSG+CSF
          </CustomLink>
          <CustomLink href='/blog' testId='blog'>
            Blog
          </CustomLink>
        </div>
      </div>
    </nav>
  );
};
