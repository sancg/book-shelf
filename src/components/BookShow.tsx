import moduleCss from '../App.module.css';
import { Book } from '../types';
type props = { book: Book; onDelete: (book: Book) => void };

export const BookShow = ({ book, onDelete }: props) => {
  return (
    <article className={moduleCss.card}>
      <div className='card__header'>
        <button type='button' onClick={() => onDelete(book)}>
          Delete
        </button>
      </div>
      <div className='card__content'>
        <div>
          <img
            src='https://images.unsplash.com/photo-1554109394-7e351053be0d?q=80&w=1363&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt=''
          />
        </div>
        <p>{book.title}</p>
      </div>
    </article>
  );
};
