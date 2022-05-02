import { useQuery } from 'react-query';
import { MemoType } from 'types/memo';
import { axiosInstance } from 'lib/axiosInstance';

export const useQueryMemos = () => {
  const { loginInstance } = axiosInstance();

  const getMemos = async () => {
    const { data } = await loginInstance.get<MemoType[]>('/memos', {});
    return data;
  };
  return useQuery<MemoType[], Error>({
    queryKey: 'memos',
    queryFn: getMemos,
    staleTime: Infinity,
  });
};
