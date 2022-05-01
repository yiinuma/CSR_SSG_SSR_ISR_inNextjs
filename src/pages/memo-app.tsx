import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { Layout } from 'components/Layout/Layout';
import { authState } from 'store/authState';
import { MainLayout } from 'components/Layout/MainLayout';
import { Title } from 'components/Title';

const MemoApp: NextPage = () => {
  const router = useRouter();
  const auth = useRecoilValue(authState);

  useEffect(() => {
    if (auth) return;
    router.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {auth && (
        <Layout>
          <MainLayout>
            <Title />
          </MainLayout>
        </Layout>
      )}
    </>
  );
};

export default MemoApp;
