/* eslint-disable react/display-name */
import { memo, useEffect, useState, FC } from 'react';

import { ModalInput } from 'components/uiParts/input/ModalInput';
import { InputField } from 'components/uiParts/input/inputField';
import { useMutateMemo } from 'hooks/useMutateMemo';
import { useQueryMemos } from 'hooks/useQueryMemos';
import { useEdited } from 'hooks/useEdited';

export const Modal: FC = memo(() => {
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const { editedModal, setEditedModalState, editedIndex, setEditedIndexState } = useEdited();
  const { updateMemoMutation } = useMutateMemo();
  const { data: memos, status } = useQueryMemos();

  useEffect(() => {
    if (editedIndex !== null && memos) {
      setEditTitle(memos[editedIndex].title);
      setEditCategory(memos[editedIndex].category);
      setEditDescription(memos[editedIndex].description);
    }
  }, [editedIndex, memos]);

  if (status === 'error') return <p>{'Error'}</p>;

  const editClear = () => {
    setEditedModalState(false);
    setEditedIndexState(null);
    setEditTitle('');
    setEditCategory('');
    setEditDescription('');
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (editedIndex === null || memos === undefined) return;
    const newData = {
      id: memos[editedIndex].id,
      title: editTitle,
      category: editCategory,
      description: editDescription,
      date: memos[editedIndex].date,
      mark_div: Number(memos[editedIndex].mark_div),
    };
    updateMemoMutation.mutate(newData);
    editClear();
  };

  return (
    <div
      id='modal'
      className={`fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-slate-500 bg-opacity-75 antialiased opacity-0 transition duration-300 ease-in-out ${
        editedModal ? ' visible opacity-100' : 'invisible'
      }`}
    >
      <input
        onClick={editClear}
        className='modal-bg absolute top-0 left-0 z-10 h-full w-full opacity-0'
      />
      <div className='z-20 mx-auto flex w-11/12 max-w-2xl flex-col rounded-lg border border-gray-300 shadow-xl sm:w-5/6 lg:w-1/2'>
        <div className='flex flex-row justify-between rounded-tl-lg rounded-tr-lg border-b border-gray-200 bg-white p-6'>
          <p className='font-semibold text-gray-800'>Memo ??????</p>
          <button onClick={editClear} className='modal-close'>
            <svg
              className='pointer-events-none h-6 w-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              >
                {' '}
              </path>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col space-y-4 bg-gray-50 px-10 py-6'>
            <InputField htmlFor='title' label='Title'>
              <ModalInput
                CustomTag='textarea'
                id='title'
                required
                type='text'
                value={editTitle}
                onChange={(e) => {
                  setEditTitle(e.target.value);
                }}
              />
            </InputField>
            <InputField htmlFor='category' label='Category'>
              <ModalInput
                CustomTag='input'
                id='category'
                required={false}
                type='text'
                value={editCategory}
                onChange={(e) => {
                  setEditCategory(e.target.value);
                }}
              />
            </InputField>
            <InputField htmlFor='description' label='Description'>
              <ModalInput
                CustomTag='textarea'
                id='description'
                required={false}
                type='text'
                value={editDescription}
                onChange={(e) => {
                  setEditDescription(e.target.value);
                }}
              />
            </InputField>
          </div>
          <div className='flex flex-row items-center justify-between rounded-bl-lg rounded-br-lg border-t border-gray-200 bg-white p-5'>
            <input
              onClick={() => {
                setEditTitle('');
                setEditCategory('');
                setEditDescription('');
              }}
              type='button'
              value='?????????'
              className='rounded bg-slate-400 px-4 py-2 font-semibold text-white'
            />

            <input
              type='submit'
              value='??????'
              className='rounded bg-blue-500 px-4 py-2 font-semibold text-white'
            />
          </div>
        </form>
      </div>
    </div>
  );
});
