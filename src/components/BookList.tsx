import moduleCss from '../App.module.css';
import { Book } from '../types';
import { BookShow } from './BookShow';

type props = {
  books: Book[];
  onDelete: (book: Book) => void;
  onEdit: (book: Book) => void;
};
export default function BookList({ books, onDelete, onEdit }: props) {
  const renderBookShow = books.map((book) => (
    <BookShow key={book.id} book={book} onDelete={onDelete} onEdit={onEdit} />
  ));

  return <section className={moduleCss.grid__book}>{renderBookShow}</section>;
}
