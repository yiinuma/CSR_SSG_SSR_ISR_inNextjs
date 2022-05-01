import { useCallback, useState } from 'react';
import { useMutation } from 'react-query';

import { axiosInstance } from 'lib/axiosInstance';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import { authState } from 'store/authState';

type AxiosType = {
  access_token: string;
};

type AxiosExpType = {
  id: number;
  iat: number;
  exp: number;
};

export const useMutateAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const reset = () => {
    setEmail('');
    setPassword('');
  };
  const router = useRouter();
  const setAuth = useSetRecoilState<boolean>(authState);
  const { loginInstance } = axiosInstance();

  const loginMutation = useMutation(
    async () => {
      const { data } = await loginInstance.post<AxiosType>('login', { email, password });
      const decodedToken = jwtDecode<AxiosExpType>(data.access_token);
      localStorage.setItem('auth', JSON.stringify(true));
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('exp', JSON.stringify(decodedToken.exp));
      setAuth(true);
    },
    {
      onSuccess: () => {
        reset();
      },
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    },
  );

  const logout = useCallback(() => {
    setAuth(false);
    localStorage.removeItem('token');
    localStorage.removeItem('exp');
    localStorage.setItem('auth', JSON.stringify(false));
    router.push('/');
  }, [router, setAuth]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    logout,
  };
};
