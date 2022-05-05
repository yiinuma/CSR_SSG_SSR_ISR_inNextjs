import { atom, useRecoilState } from 'recoil';

const modalState = atom({
  key: 'atomModalState',
  default: false,
});

const editIndexState = atom<number | null>({
  key: 'atomEditIndexState',
  default: null,
});

export const useEdited = () => {
  const [editedModal, setEditedModalState] = useRecoilState(modalState);
  const [editedIndex, setEditedIndexState] = useRecoilState(editIndexState);

  return { editedModal, setEditedModalState, editedIndex, setEditedIndexState };
};
