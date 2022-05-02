import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { axiosInstance } from 'lib/axiosInstance';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import { authState } from 'store/authState';

type AxiosType = {
  access_token: string;
  error?: string;
};

type AxiosExpType = {
  id: number;
  iat: number;
  exp: number;
};

export const useMutateAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const setAuth = useSetRecoilState<boolean>(authState);
  const { loginInstance } = axiosInstance();
  const queryClient = useQueryClient();

  const reset = () => {
    setEmail('');
    setPassword('');
  };

  const loginMutation = useMutation(
    async () => {
      const { data, status } = await loginInstance.post<AxiosType>('login', {
        email,
        password,
      });
      if (status === 401) return;
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
    queryClient.removeQueries('memos');
    router.push('/');
  }, [queryClient, router, setAuth]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    logout,
  };
};
