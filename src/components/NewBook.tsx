import { useState } from 'react';
import moduleCss from '../App.module.css';
import { Book } from '../types';

type props = {
  addBook: (title: string) => void;
  handleRef: React.LegacyRef<HTMLFormElement>;
  toggle: (value: boolean) => void;
};
export const NewBook = ({ addBook, handleRef, toggle }: props) => {
  const [title, setTitle] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addBook(title);
    setTitle('');
    toggle(false);
  };
  return (
    <form
      method='post'
      className={moduleCss.form__content}
      ref={handleRef}
      onSubmit={handleSubmit}
    >
      <h2 style={{ marginBottom: '10px' }}>Add a book</h2>
      <label htmlFor='titleBook'>Title</label>
      <input
        type='text'
        name='titleBook'
        required
        id='titleBook'
        value={title} // Uncontrolled component {Please resolved}
        onChange={handleChange}
      />

      <div style={{ marginTop: '10px' }}>
        <button type='submit' className={moduleCss.form__content__button}>
          Submit
        </button>
      </div>
    </form>
  );
};
