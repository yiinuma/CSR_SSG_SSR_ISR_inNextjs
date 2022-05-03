import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { Layout } from 'components/Layout/Layout';
import { authState } from 'store/authState';
import { MainLayout } from 'components/Layout/MainLayout';
import { InputForm } from 'components/InputForm';
import { TodoList } from 'components/TodoList';
import { Modal } from 'components/Modal';
import { PrimaryButton } from 'components/button/PrimaryButton';
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
