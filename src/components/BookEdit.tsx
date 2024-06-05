import { PencilSquareIcon } from '@heroicons/react/24/outline';
import style from './BookShow.module.css';
type props = {
  title: string;
  onEditBook: () => void;
};
export default function BookEdit({ title, onEditBook }: props) {
  return (
    <div className={style.card__content__edit}>
      <p title={title} aria-label={title}>
        {title}
      </p>
      <button className={style.card__btn} type='button'>
        <PencilSquareIcon width={25} />
      </button>
    </div>
  );
}
