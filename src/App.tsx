import { useState } from 'react';
import BookList from './components/BookList';
import { NewBook } from './components/NewBook';
import moduleCss from './App.module.css';
import { Book } from './types';

function App() {
  const [books, setBooks] = useState([
    { title: 'Harry Potter', id: 19235 },
    { title: 'The foundation trilogy', id: 1451023 },
  ]);

  const addBook = (book: Book) => {
    setBooks((prev) => [...prev, book]);
  };

  const deleteBook = (remove: Book) => {
    const filtered = books.filter((book) => book.id !== remove.id);
    setBooks(filtered);
  };
  const renderBooks = books.map((book) => (
    <BookList key={book.id} book={book} onDelete={deleteBook} />
  ));

  return (
    <div className={moduleCss.layout}>
      <h1>Reading List</h1>
      <div className={moduleCss.layout__content}>
        <div className={moduleCss.grid__book}>{renderBooks}</div>
      </div>
      <NewBook addBook={addBook} />
    </div>
  );
}

export default App;
