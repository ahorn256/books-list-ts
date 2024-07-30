import React, { useState, ReactNode } from "react";
import BooksContext from "./BooksContext";
import { Book } from './Book';

type Props = {
  children: ReactNode,
};

const BooksProvider: React.FC<Props> = ({children}) => {
  const [books, setBooks] = useState<Book[]>([]);

  return (
    <BooksContext.Provider value={[books, setBooks]}>
      {children}
    </BooksContext.Provider>
  );
}

export default BooksProvider;
