import { useState } from 'react';
import moduleCss from '../App.module.css';
import { Book } from '../types';

type props = {
  addBook: (book: Book) => void;
};
export const NewBook = ({ addBook }: props) => {
  const [title, setTitle] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    const newBook = { title, id: Math.random() + new Date().getTime() };
    e.preventDefault();
    addBook(newBook);
    setTitle('');
  };
  return (
    <form method='post' className={moduleCss.form__content} onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: '10px' }}>Add a book</h2>
      {/* <fieldset about='Adding new book' aria-placeholder='Hi'> */}
      <label htmlFor='titleBook'>Title</label>
      <input
        type='text'
        name='titleBook'
        id='titleBook'
        value={title} // Uncontrolled component {Please resolved}
        onChange={handleChange}
      />
      {/* </fieldset> */}
      <div style={{ marginTop: '10px' }}>
        <button type='submit' className={moduleCss.form__content__button}>
          Submit
        </button>
      </div>
    </form>
  );
};
