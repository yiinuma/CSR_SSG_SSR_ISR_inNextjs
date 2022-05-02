/* eslint-disable camelcase */
import { useMutation, useQueryClient } from 'react-query';

import { axiosInstance } from 'lib/axiosInstance';
import { CreateMemoType, EditedMemoType, MemoType } from 'types/memo';

export const useMutateMemo = () => {
  const { loginInstance } = axiosInstance();
  const queryClient = useQueryClient();

  // 何でもメモ新規登録
  const createMemoMutaion = useMutation(
    async (pushData: CreateMemoType) => {
      const { data, status } = await loginInstance.post('/memo', pushData);
      if (status === 400 || status === 401) return;
      return data;
    },
    {
      onSuccess: (res, _) => {
        const previousMemos = queryClient.getQueryData<EditedMemoType[]>(['memos']);
        if (previousMemos) {
          queryClient.setQueryData(['memos'], [...previousMemos, res]);
        }
      },
      onError: (err: any) => {
        alert(err.message);
      },
    },
  );

  // 何でもメモ更新
  const updateMemoMutaion = useMutation(
    async (pushData: MemoType) => {
      const { data, status } = await loginInstance.put(`/memo/${pushData.id}`, pushData);
      if (status === 400 || status === 401) return;
      return data;
    },
    {
      onSuccess: (res, variables) => {
        const previousMemos = queryClient.getQueryData<EditedMemoType[]>(['memos']);
        if (previousMemos) {
          queryClient.setQueryData(
            ['memos'],
            previousMemos.map((memo) => (memo.id === variables.id ? res : memo)),
          );
        }
      },
      onError: (err: any) => {
        alert(err.message);
      },
    },
  );

  // 何でもメモ削除
  const deleteMemoMutaion = useMutation(
    async (id: string) => {
      const { data, status } = await loginInstance.delete(`/memo/${id}`);
      if (status === 400 || status === 401) return;
      return data;
    },
    {
      onSuccess: (_, variables) => {
        const previousMemos = queryClient.getQueryData<EditedMemoType[]>(['memos']);
        if (previousMemos) {
          queryClient.setQueryData(
            ['memos'],
            previousMemos.filter((memo) => memo.id !== variables),
          );
        }
      },
      onError: (err: any) => {
        alert(err.message);
      },
    },
  );

  return {
    createMemoMutaion,
    updateMemoMutaion,
    deleteMemoMutaion,
  };
};
