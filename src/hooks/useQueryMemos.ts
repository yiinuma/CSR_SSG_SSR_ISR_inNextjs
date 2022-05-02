import { useQuery } from 'react-query';
import { EditedMemoType, MemoType } from 'types/memo';
import { axiosInstance } from 'lib/axiosInstance';

export const useQueryMemos = () => {
  const { loginInstance } = axiosInstance();

  const getMemos = async () => {
    const { data } = await loginInstance.get('/memos', {});
    return data;
  };
  return useQuery<EditedMemoType[], Error>({
    queryKey: ['memos'],
    queryFn: getMemos,
    staleTime: Infinity,
  });
};
