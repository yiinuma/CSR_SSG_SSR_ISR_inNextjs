export type MemoType = {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string;
  mark_div: number;
};

export type CreateMemoType = Omit<MemoType, 'id'>;
