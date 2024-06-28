import { useEffect, useRef, useState } from 'react';
import BookList from './components/BookList';
import { NewBook } from './components/NewBook';
import moduleCss from './App.module.css';
import { PlusIcon } from '@heroicons/react/24/outline';

function App() {
  const [showForm, setShowForm] = useState(false);
  const newBookForm = useRef<HTMLFormElement>(null);

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
        <BookList />
      </div>

      {!!showForm ? (
        <NewBook handleRef={newBookForm} toggle={toggleNewBookForm} />
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
