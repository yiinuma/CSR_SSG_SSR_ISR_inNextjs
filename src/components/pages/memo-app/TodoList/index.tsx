/* eslint-disable react/display-name */
import { memo, FC } from 'react';

import { useQueryMemos } from 'hooks/useQueryMemos';
import { Spinner } from 'components/uiParts/Spinner';
import { TodoItem } from 'components/pages/memo-app/Todoitem';

export const TodoList: FC = memo(() => {
  const { data: memos, status } = useQueryMemos();

  if (status === 'loading') return <Spinner />;
  if (status === 'error') return <p>{'Error'}</p>;

  return (
    <ul className='mt-8 w-full'>
      {memos &&
        memos.map((list, index) => (
          <TodoItem
            key={list.id}
            index={index}
            id={list.id}
            title={list.title}
            category={list.category}
            description={list.description}
            date={list.date}
            mark_div={Boolean(list.mark_div)}
          />
        ))}
    </ul>
  );
});
