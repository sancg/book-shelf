import { XCircleIcon } from '@heroicons/react/24/outline';
import style from './BookShow.module.css';
import { Book } from '../types';
import BookEdit from './BookEdit';
type props = { book: Book; onDelete: (book: Book) => void; onEdit: (book: Book) => void };

export const BookShow = ({ book, onDelete, onEdit }: props) => {
  return (
    <article className={style.card}>
      <div className={style.card__header}>
        <button className={style.card__btn} type='button' onClick={() => onDelete(book)}>
          <XCircleIcon width={25} />
        </button>
      </div>
      <div className='card__content'>
        <div>
          <img
            src='https://images.unsplash.com/photo-1554109394-7e351053be0d?q=80&w=1363&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt=''
          />
        </div>
      </div>
      <BookEdit book={book} onEditBook={onEdit} />
    </article>
  );
};
