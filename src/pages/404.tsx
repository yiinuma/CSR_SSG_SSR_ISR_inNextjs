import { useRouter } from 'next/router';

import { Layout } from 'components/Layout/Layout';
import { PrimaryButton } from 'components/button/PrimaryButton';

export const Page404 = () => {
  const router = useRouter();

  return (
    <>
      <Layout title='404 -Page Not Found!!'>
        <PrimaryButton onClick={() => router.push('/')}>Home</PrimaryButton>
      </Layout>
    </>
  );
};

export default Page404;
