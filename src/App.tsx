import { useContext, useEffect, useRef, useState } from 'react';
import BookList from './components/BookList';
import { NewBook } from './components/NewBook';
import moduleCss from './App.module.css';
import { Book } from './types';
import { PlusIcon } from '@heroicons/react/24/outline';
import { BookContext } from './context/books';

function App() {
  const [showForm, setShowForm] = useState(false);
  const newBookForm = useRef<HTMLFormElement>(null);

  const { books, createBook, editBook, deleteBook } = useContext(BookContext);

  const toggleNewBookForm = (value: boolean) => setShowForm(value);

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (!newBookForm.current) return;

    if (e?.code === 'Escape') {
      return setShowForm(false);
    }
  };

  const handleEscapeMouse = (e: MouseEvent) => {
    if (!newBookForm.current) return;
    if (newBookForm.current && !newBookForm.current.contains(e.target as Node)) {
      setShowForm(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleEscapeMouse);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleEscapeMouse);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <div className={moduleCss.layout}>
      <h1>Reading List</h1>
      <div className={moduleCss.layout__content}>
        <BookList books={books} onDelete={deleteBook} onEdit={editBook} />
      </div>

      {!!showForm ? (
        <NewBook addBook={createBook} handleRef={newBookForm} toggle={toggleNewBookForm} />
      ) : (
        <button
          className={moduleCss.layout__content__btn}
          onClick={() => toggleNewBookForm(!showForm)}
        >
          <PlusIcon width={24} />
        </button>
      )}
    </div>
  );
}

export default App;
