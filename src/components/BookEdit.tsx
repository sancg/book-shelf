import { PlusCircleIcon } from '@heroicons/react/24/outline';
import style from './BookShow.module.css';
import { useState } from 'react';
import { Book } from '../types';

type props = {
  book: Book;
};
export default function BookEdit({ book }: props) {
  const [editTitle, setEditTitle] = useState(book.title);

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(event.target.value);
  };

  return (
    <form
      method='get'
      className={style.card__content__edit}
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      }}
    >
      <label htmlFor='title'>
        <input
          type='text'
          name='title'
          id='title'
          value={editTitle}
          onChange={onChangeInputHandler}
        />
      </label>
      <button className={style.card__btn} type='submit'>
        <PlusCircleIcon width={25} />
      </button>
    </form>
  );
}
