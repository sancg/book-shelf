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

  const createBook = (book: Book) => {
    setBooks((prev) => [...prev, book]);
  };

  const deleteBook = (remove: Book) => {
    const filtered = books.filter((book) => book.id !== remove.id);
    setBooks(filtered);
  };

  return (
    <div className={moduleCss.layout}>
      <h1>Reading List</h1>
      <div className={moduleCss.layout__content}>
        <BookList books={books} onDelete={deleteBook} />
      </div>
      <NewBook addBook={createBook} />
    </div>
  );
}

export default App;
