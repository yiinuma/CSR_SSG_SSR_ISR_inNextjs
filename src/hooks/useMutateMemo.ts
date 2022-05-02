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
  const createMemoMutation = useMutation(
    (postData: CreateMemoType) => loginInstance.post<MemoType>('/memo', postData),
    {
      onSuccess: (res, _) => {
        const previousMemos = queryClient.getQueryData<EditedMemoType[]>(['memos']);
        if (previousMemos) {
          queryClient.setQueryData(['memos'], [...previousMemos, res.data]);
        }
      },
      onError: (err: any) => {
        alert(err.message);
      },
    },
  );

  // 何でもメモ更新
  const updateMemoMutation = useMutation(
    (putData: MemoType) => loginInstance.put<MemoType>(`/memo/${putData.id}`, putData),
    {
      onSuccess: (res, variables) => {
        const previousMemos = queryClient.getQueryData<EditedMemoType[]>(['memos']);
        if (previousMemos) {
          queryClient.setQueryData(
            ['memos'],
            previousMemos.map((memo) => (memo.id === variables.id ? res.data : memo)),
          );
        }
      },
      onError: (err: any) => {
        alert(err.message);
      },
    },
  );

  // 何でもメモ削除
  const deleteMemoMutation = useMutation(
    (id: string) => loginInstance.delete<MemoType>(`/memo/${id}`),
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
    createMemoMutation,
    updateMemoMutation,
    deleteMemoMutation,
    createLoading,
    updateLoading,
    deleteLoading,
  };
};
