import { NextPage } from 'next';
import { FormEvent, useEffect } from 'react';

import { Layout } from 'components/Layout/Layout';
import { LoginInput } from 'components/input/LoginInput';
import { InputField } from 'components/InputField';
import { useMutateAuth } from 'hooks/useMutateAuth';
import { useRecoilState } from 'recoil';
import { authState } from 'store/authState';
import { PrimaryButton } from 'components/button/PrimaryButton';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { email, setEmail, password, setPassword, loginMutation, logout } = useMutateAuth();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate();
  };
  const [auth, setAuth] = useRecoilState<boolean>(authState);
  const router = useRouter();

  useEffect(() => {
    const localExp = Number(localStorage.getItem('exp'));
    const localAuth = localStorage.getItem('auth');
    if (localExp >= new Date().getTime() / 1000 && localAuth) {
      const exp = new Date(localExp * 1000);
      setAuth(true);
      // console.log('セッション有効期限', exp);
    } else {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <p className='my-5 text-xl font-bold'>CSR_SSG_SSR_ISR Test Page</p>
      <figure className='mt-4 flex'>
        <div className='border-1 relative m-auto w-full max-w-md rounded-xl bg-white py-10 px-1 shadow-lg'>
          {!auth ? (
            <div className='text-primary my-4 mx-6'>
              <div className='mt-3 flex items-center justify-center'>
                <h1 className='text-primary mt-2 mb-4 text-2xl font-medium'>
                  Login to your account
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
                <InputField htmlFor='email' label='Email:'>
                  <LoginInput
                    id='email'
                    required
                    type='mail'
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeHolder='Email Address'
                  />
                </InputField>
                <InputField htmlFor='password' label=' Password:'>
                  <LoginInput
                    id='password'
                    required={false}
                    type='password'
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeHolder='Password'
                  />
                </InputField>
                <div className='mt-4 flex items-center justify-center'>
                  <PrimaryButton>Login</PrimaryButton>
                </div>
              </form>
            </div>
          ) : (
            <div className='flex flex-col items-center gap-y-4'>
              <div className='mx-16'>Login is in progress</div>
              <PrimaryButton onClick={logout}>Logout</PrimaryButton>
            </div>
          )}
        </div>
      </figure>
    </Layout>
  );
};

export default Home;
