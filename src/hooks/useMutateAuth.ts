import { useState } from 'react';
import { useMutation } from 'react-query';

import { axiosInstance } from 'lib/axiosInstance';
import toast from 'react-hot-toast';
import jwtDecode from 'jwt-decode';

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

  const login = async () => {
    const { loginInstance } = axiosInstance();
    const { data } = await loginInstance.post<AxiosType>('login', { email, password });
    const decodedToken = jwtDecode<AxiosExpType>(data.access_token);
    localStorage.setItem('auth', JSON.stringify(true));
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('exp', JSON.stringify(decodedToken.exp));
    return data;
  };

  const loginMutation = useMutation(login, {
    onSuccess: () => {
      reset();
      toast.success('ログインに成功しました');
    },
    onError: (err: any) => {
      alert(err.message);
      reset();
    },
  });

  return {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
  };
};
