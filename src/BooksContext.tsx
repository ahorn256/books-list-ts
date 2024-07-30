import { createContext, Dispatch, SetStateAction } from "react";
import { Book } from './Book';

const BooksContext = createContext<[Book[], Dispatch<SetStateAction<Book[]>>]>([[], () => {}]);

export default BooksContext;
