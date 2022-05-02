/* eslint-disable react/display-name */
import { memo, FC } from 'react';
import { FaEdit, FaCheck, FaTrashAlt } from 'react-icons/fa';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { modalState } from 'store/modalState';
import { ActionButton } from 'components/button/ActionButton';
import { editIndexState } from 'store/indexState';
import { useQueryMemos } from 'hooks/useQueryMemos';
import { Spinner } from 'components/Spinner';
import { useMutateMemo } from 'hooks/useMutateMemo';

export const TodoList: FC = memo(() => {
  const [modal, setModal] = useRecoilState(modalState);
  const setEditIndex = useSetRecoilState(editIndexState);
  const { data: memos, status } = useQueryMemos();
  const { updateMemoMutaion, deleteMemoMutaion, updateLoading, deleteLoading } = useMutateMemo();

  if (status === 'loading') return <Spinner />;
  if (status === 'error') return <p>{'Error'}</p>;

  const handleComplete = (
    id: string,
    title: string,
    category: string,
    description: string,
    date: string,
    complete: boolean,
  ) => {
    const completeChange = !complete;
    const newData = { id, title, category, description, date, mark_div: Number(completeChange) };
    updateMemoMutaion.mutate(newData);
  };

  const handleDelete = (id: string) => {
    deleteMemoMutaion.mutate(id);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setModal(!modal);
  };

  return (
    <ul className='todo-list relative z-0 mt-8 w-full'>
      {memos &&
        memos.map((list, index) => (
          <li
            className={
              `mb-2 w-full rounded ` + (list.mark_div ? ' bg-slate-200 opacity-60' : ' bg-white')
            }
            key={list.id}
          >
            <div className='ml-auto mr-auto flex w-[100%] flex-col'>
              <div className='flex items-center'>
                <p
                  className={
                    `break-words py-1 px-4 text-left font-semibold` +
                    (list.mark_div && ` line-through`)
                  }
                >
                  {list.title}
                </p>
                {list.category !== '' && (
                  <span className='rounded-full bg-slate-100 px-4 py-1 text-sm'>
                    {list.category}
                  </span>
                )}
              </div>
              <p className={`break-words py-1 px-4 text-left` + (list.mark_div && ' line-through')}>
                {list.description}
              </p>
              <div className='flex w-full flex-row items-center justify-end rounded border-t border-slate-200 px-4 py-1'>
                <ActionButton
                  index={index}
                  bg='bg-blue-300'
                  onClick={() => {
                    handleEdit(index);
                  }}
                  CustomTag={FaEdit}
                  disable={updateLoading}
                />
                <ActionButton
                  index={index}
                  bg='bg-amber-300'
                  onClick={() => {
                    handleComplete(
                      list.id,
                      list.title,
                      list.category,
                      list.description,
                      list.date,
                      Boolean(list.mark_div),
                    );
                  }}
                  CustomTag={FaCheck}
                  disable={updateLoading}
                />
                <ActionButton
                  index={index}
                  bg='bg-lime-300'
                  onClick={() => {
                    handleDelete(list.id);
                  }}
                  CustomTag={FaTrashAlt}
                  disable={updateLoading || deleteLoading}
                />
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
});
