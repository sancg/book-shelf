import { PencilSquareIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import style from './BookShow.module.css';
import { useState } from 'react';
type props = {
  title: string;
  onEditBook: () => void;
};
export default function BookEdit({ title, onEditBook }: props) {
  const [showEdit, setShowEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowEdit((prev) => !prev);
  };

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(event.target.value);
  };

  let content = (
    <>
      <p title={title} aria-label={title}>
        {title}
      </p>
      <button className={style.card__btn} type='button' onClick={onClickHandler}>
        <PencilSquareIcon width={25} />
      </button>
    </>
  );

  if (showEdit) {
    content = (
      <form action='' method='post' className={style.card__content__edit}>
        <label htmlFor='title'>
          <input type='text' name='title' value={editTitle} onChange={onChangeInputHandler} />
        </label>
        <button className={style.card__btn} type='submit' onClick={onClickHandler}>
          <PlusCircleIcon width={25} />
        </button>
      </form>
    );
  }
  return <div className={style.card__content__edit}>{content}</div>;
}
