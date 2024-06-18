import { PencilSquareIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import style from './BookShow.module.css';
import { useState } from 'react';
import { Book } from '../types';
type props = {
  book: Book;
  onEditBook: (book: Book) => void;
};
export default function BookEdit({ book, onEditBook }: props) {
  const [showEdit, setShowEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(book.title);

  const handleEditClick = (_event: React.MouseEvent<HTMLButtonElement>) => {
    setShowEdit((prev) => !prev);
  };

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onEditBook({ id: book.id, title: editTitle });
  };
  let content = (
    <>
      <p title={book.title} aria-label={book.title}>
        {book.title}
      </p>
      <button className={style.card__btn} type='button' onClick={handleEditClick}>
        <PencilSquareIcon width={25} />
      </button>
    </>
  );

  if (showEdit) {
    content = (
      <form method='get' className={style.card__content__edit} onSubmit={handleSubmit}>
        <label htmlFor='title'>
          <input type='text' name='title' value={editTitle} onChange={onChangeInputHandler} />
        </label>
        <button className={style.card__btn} type='submit' onClick={handleEditClick}>
          <PlusCircleIcon width={25} />
        </button>
      </form>
    );
  }
  return <div className={style.card__content__edit}>{content}</div>;
}
