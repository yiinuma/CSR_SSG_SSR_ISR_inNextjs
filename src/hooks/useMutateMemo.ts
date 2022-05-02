/* eslint-disable camelcase */
import { useMutation, useQueryClient } from 'react-query';

import { axiosInstance } from 'lib/axiosInstance';
import { CreateMemoType, EditedMemoType, MemoType } from 'types/memo';
import { useState } from 'react';

export const useMutateMemo = () => {
  const { loginInstance } = axiosInstance();
  const queryClient = useQueryClient();
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  // 何でもメモ新規登録
  const createMemoMutaion = useMutation(
    async (pushData: CreateMemoType) => {
      setCreateLoading(true);
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
        setCreateLoading(false);
      },
      onError: (err: any) => {
        setCreateLoading(false);
        alert(err.message);
      },
    },
  );

  // 何でもメモ更新
  const updateMemoMutaion = useMutation(
    async (pushData: MemoType) => {
      setUpdateLoading(true);
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
          setUpdateLoading(false);
        }
      },
      onError: (err: any) => {
        setUpdateLoading(false);
        alert(err.message);
      },
    },
  );

  // 何でもメモ削除
  const deleteMemoMutaion = useMutation(
    async (id: string) => {
      setDeleteLoading(true);
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
        setDeleteLoading(false);
      },
      onError: (err: any) => {
        setDeleteLoading(false);
        alert(err.message);
      },
    },
  );

  return {
    createMemoMutaion,
    updateMemoMutaion,
    deleteMemoMutaion,
    createLoading,
    updateLoading,
    deleteLoading,
  };
};
