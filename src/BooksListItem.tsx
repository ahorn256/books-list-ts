import React, { useContext } from "react";
import { Book } from "./Book";
import Rating, { OnRate } from "./Rating";
import BooksContext from "./BooksContext";

type Props = {
  book: Book,
};

const BooksListItem:React.FC<Props> = ({ book }) => {
  const [ books, setBooks] = useContext(BooksContext);
  const onRate:OnRate = (bookId, rating) => {
    setBooks(books.map(book => book.id === bookId ? {...book, rating} : book));
  }

  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.isbn}</td>
      <td><Rating book={book} onRate={onRate} /></td>
    </tr>
  );
}

export default BooksListItem;
