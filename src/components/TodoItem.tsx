/* eslint-disable react/display-name */
import { memo, FC } from 'react';
import { FaEdit, FaCheck, FaTrashAlt } from 'react-icons/fa';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { modalState } from 'store/modalState';
import { ActionButton } from 'components/button/ActionButton';
import { editIndexState } from 'store/indexState';
import { useMutateMemo } from 'hooks/useMutateMemo';
import { useQueryMemos } from 'hooks/useQueryMemos';
import { Spinner } from 'components/Spinner';

type Props = {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string;
  mark_div: boolean;
  index: number;
  key: string;
};

export const TodoItem: FC<Props> = memo((props) => {
  const { id, title, category, description, date, mark_div, index, key } = props;
  const [modal, setModal] = useRecoilState(modalState);
  const setEditIndex = useSetRecoilState(editIndexState);
  const { updateMemoMutaion, deleteMemoMutaion, updateLoading, deleteLoading } = useMutateMemo();
  const { status } = useQueryMemos();

  if (updateLoading || deleteLoading) return <Spinner />;

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
    <li
      className={`mb-2 w-full rounded ` + (mark_div ? ' bg-slate-200 opacity-60' : ' bg-white')}
      key={id}
    >
      <div className='ml-auto mr-auto flex w-[100%] flex-col'>
        <div className='flex items-center'>
          <p
            className={
              `break-words py-1 px-4 text-left font-semibold` + (mark_div && ` line-through`)
            }
          >
            {title}
          </p>
          {category !== '' && (
            <span className='rounded-full bg-slate-100 px-4 py-1 text-sm'>{category}</span>
          )}
        </div>
        <p className={`break-words py-1 px-4 text-left` + (mark_div && ' line-through')}>
          {description}
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
              handleComplete(id, title, category, description, date, Boolean(mark_div));
            }}
            CustomTag={FaCheck}
            disable={updateLoading}
          />
          <ActionButton
            index={index}
            bg='bg-lime-300'
            onClick={() => {
              handleDelete(id);
            }}
            CustomTag={FaTrashAlt}
            disable={updateLoading || deleteLoading}
          />
        </div>
      </div>
    </li>
  );
});
