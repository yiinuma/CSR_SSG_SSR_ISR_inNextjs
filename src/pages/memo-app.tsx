import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { Layout } from 'components/Layout';
import { authState } from 'store/authState';

const MemoApp: NextPage = () => {
  const router = useRouter();
  const auth = useRecoilValue(authState);

  useEffect(() => {
    if (auth) return;
    router.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div>memo-app</div>
    </Layout>
  );
};

export default MemoApp;
