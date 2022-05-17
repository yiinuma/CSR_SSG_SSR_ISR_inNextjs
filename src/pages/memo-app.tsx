import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { Layout } from 'components/uiParts/Layout/Layout';
import { authState } from 'store/authState';
import { MainLayout } from 'components/uiParts/Layout/MainLayout';
import { InputForm } from 'components/pages/memo-app/InputForm';
import { TodoList } from 'components/pages/memo-app/TodoList';
import { Modal } from 'components/pages/memo-app/Modal';
import { PrimaryButton } from 'components/uiParts/button/PrimaryButton';
import { useMutateAuth } from 'hooks/useMutateAuth';

const MemoApp: NextPage = () => {
  const router = useRouter();
  const auth = useRecoilValue(authState);
  const { logout } = useMutateAuth();

  useEffect(() => {
    if (auth) return;
    router.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {auth && (
        <Layout title='Memo-App(CSR)'>
          <div className='mt-[-48px] flex w-[80%] justify-end'>
            <PrimaryButton onClick={logout}>Logout!</PrimaryButton>
          </div>
          <MainLayout>
            <InputForm />
            <TodoList />
            <Modal />
          </MainLayout>
        </Layout>
      )}
    </>
  );
};

export default MemoApp;
