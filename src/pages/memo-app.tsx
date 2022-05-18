import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { Layout } from 'components/uiParts/Layout/Layout';
import { MainLayout } from 'components/uiParts/Layout/MainLayout';
import { PrimaryButton } from 'components/uiParts/button/PrimaryButton';
import { TodoList } from 'components/specificPage/memo-app/TodoList';
import { InputForm } from 'components/specificPage/memo-app/InputForm';
import { Modal } from 'components/specificPage/memo-app/Modal';
import { authState } from 'store/authState';
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
