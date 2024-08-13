import React, { ReactNode } from 'react';
import { Star, StarBorder} from '@mui/icons-material';
import './Rating.css';
import { Book } from './Book';

export type OnRate = (bookId: number, rating: number) => void;

type Props = {
  book: Book,
  onRate: OnRate,
}

const Rating:React.FC<Props> = ({book, onRate}) => {
  const stars:ReactNode[] = [];
  for(let i = 1; i < 6; i++) {
    stars.push(
      <button className='ratingButton' key={i} onClick={() => onRate(book.id, i)}>
        { book.rating >= i ? <Star/> : <StarBorder/> }
      </button>
    );
  }

  return (
    <ul>
      { stars }
    </ul>
  );
}

export default Rating;
