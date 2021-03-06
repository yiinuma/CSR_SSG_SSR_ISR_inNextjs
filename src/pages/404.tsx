import { useRouter } from 'next/router';

import { Layout } from 'components/uiParts/Layout/Layout';
import { PrimaryButton } from 'components/uiParts/button/PrimaryButton';

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
