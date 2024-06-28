import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline';
import style from './BookShow.module.css';
import { Book } from '../types';
import BookEdit from './BookEdit';
import { useContext, useState } from 'react';
import { BookContext } from '../context/books';
type props = { book: Book };

export const BookShow = ({ book }: props) => {
  const { deleteBook } = useContext(BookContext);

  const [showEdit, setShowEdit] = useState(false);
  const handleEditClick = (_event: React.MouseEvent<HTMLButtonElement>) => {
    setShowEdit((prev) => !prev);
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
    content = <BookEdit book={book} />;
  }

  return (
    <article className={style.card}>
      <div className={style.card__header}>
        <button className={style.card__btn} type='button' onClick={() => deleteBook(book)}>
          <XCircleIcon width={25} />
        </button>
      </div>
      <div className='card__content'>
        <div>
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s'
            alt=''
          />
        </div>
      </div>
      <div className={style.card__content__edit}>{content}</div>
    </article>
  );
};
