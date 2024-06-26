import { useEffect, useRef, useState } from 'react';
import BookList from './components/BookList';
import { NewBook } from './components/NewBook';
import moduleCss from './App.module.css';
import { Book } from './types';
import { PlusIcon } from '@heroicons/react/24/outline';

function App() {
  const [showForm, setShowForm] = useState(false);
  const newBookForm = useRef<HTMLFormElement>(null);

  const [books, setBooks] = useState<Book[]>([]);

  const getAllBooks = async () => {
    const books = await fetch('http://127.0.0.1:3001/books').then((r) => r.json());
    setBooks(books);
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  useEffect(() => {}, [books]);

  const createBook = async (title: string) => {
    const newBook: Book = await fetch('http://127.0.0.1:3001/books', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ title: title?.trim() }),
    }).then((r) => r.json());

    setBooks((prev) => [...prev, newBook]);
  };

  const editBook = async (updateBook: Book) => {
    const { title } = updateBook;
    const changeBook = await fetch(`http://localhost:3001/books/${updateBook.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({ title: title?.trim() }),
    }).then((r) => r.json());

    const updateBooks: Book[] = books.map((book) => {
      if (book.id === changeBook.id) {
        return changeBook;
      }
      return book;
    });
    // console.log({ books, updateBooks });
    setBooks(updateBooks);
  };

  const deleteBook = async (remove: Book) => {
    const removeBook = await fetch(`http://localhost:3001/books/${remove.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    }).then((r) => r.status);
    if (removeBook === 200) {
      const filtered = books.filter((book) => book.id !== remove.id);
      setBooks(filtered);
    }
  };

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
