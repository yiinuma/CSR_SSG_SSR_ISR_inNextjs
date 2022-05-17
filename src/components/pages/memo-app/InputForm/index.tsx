/* eslint-disable react/display-name */
import { memo, useState, FC } from 'react';
import dayjs from 'dayjs';

import { useMutateMemo } from 'hooks/useMutateMemo';
import { InputField } from 'components/uiParts/input/inputField';
import { FormInput } from 'components/uiParts/input/FormInput';

export const InputForm: FC = memo(() => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const { createMemoMutation } = useMutateMemo();

  const getInputDay = () => {
    const inputDay = dayjs().format('YYYY/MM/DD');
    return inputDay;
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const date = getInputDay();
    const complete = false;
    createMemoMutation.mutate({ title, category, description, date, mark_div: Number(complete) });
    setTitle('');
    setCategory('');
    setDescription('');
    setSubmitDisabled(true);
  };

  return (
    <form className='flex flex-row items-end justify-center gap-2'>
      <div className='w-5/12'>
        <InputField htmlFor='title' label='Title'>
          <br />
          <FormInput
            id='title'
            required
            type='text'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSubmitDisabled(false);
            }}
          />
        </InputField>
      </div>
      <div className='w-2/12'>
        <InputField htmlFor='category' label='Category'>
          <br />
          <FormInput
            id='category'
            required={false}
            type='text'
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubmitDisabled(false);
            }}
          />
        </InputField>
      </div>
      <div className='w-5/12'>
        <InputField htmlFor='description' label='Description'>
          <br />
          <FormInput
            id='description'
            required={false}
            type='text'
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setSubmitDisabled(false);
            }}
          />
        </InputField>
      </div>

      <button
        id='submit'
        type='button'
        className={`ml-2 h-10 min-w-fit rounded px-4 py-2 ${
          title === '' || submitDisabled
            ? 'bg-slate-300'
            : 'bg-primary-600 text-white hover:bg-primary-500'
        }`}
        onClick={handleSubmit}
        disabled={title === ''}
      >
        Submit
      </button>
    </form>
  );
});
