import { useContext } from 'react';
import moduleCss from '../App.module.css';
import { BookShow } from './BookShow';
import { BookContext } from '../context/books';

export default function BookList() {
  const { books } = useContext(BookContext);
  const renderBookShow = books.map((book) => <BookShow key={book.id} book={book} />);

  return <section className={moduleCss.grid__book}>{renderBookShow}</section>;
}
