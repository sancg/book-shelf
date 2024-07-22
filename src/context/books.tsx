import { createContext, useEffect, useState, useCallback } from 'react';
import { Book } from '../types';

type BookContext = {
  books: Book[];
  createBook: (title: string) => Promise<void>;
  editBook: (book: Book) => Promise<void>;
  deleteBook: (book: Book) => Promise<void>;
};

export const BookContext = createContext<BookContext>({
  books: [],
  createBook: async (_title) => {},
  editBook: async (_book) => {},
  deleteBook: async (_book) => {},
});

type props = {
  children: React.ReactNode;
};
export default function BookWrapper({ children }: props) {
  const [books, setBooks] = useState<Book[]>([]);
  const getAllBooks = useCallback(async () => {
    const books = await fetch('http://127.0.0.1:3001/books').then((r) => r.json());
    setBooks(books);
  }, []);

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
        return { ...book, ...changeBook };
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

  const sharingValue: BookContext = {
    books,
    createBook,
    editBook,
    deleteBook,
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return <BookContext.Provider value={sharingValue}>{children}</BookContext.Provider>;
}
