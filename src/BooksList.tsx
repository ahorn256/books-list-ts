import React, { useContext, useEffect, useState } from "react";
import BooksContext from "./BooksContext";
import BooksListItem from "./BooksListItem";
import './BooksList.css';
import { FetchError } from "./FetchError";

const BooksList:React.FC = () => {
  const [ books, setBooks ] = useContext(BooksContext);
  const [ error, setError ] = useState<FetchError|null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BOOKS_SERVER_URL}`);

        if(!response.ok) {
          throw new Error('fetch request failed with: ' + response.status + ' ' + response.statusText);
        }

        const data:Object[] = await response.json();
        
        setBooks(data.map(item => {
          return {
            title: 'title' in item ? String(item.title) : '',
            author: 'author' in item ? String(item.author) : '',
            isbn: 'isbn' in item ? String(item.isbn) : '',
            rating: 'rating' in item ? parseInt(String(item.rating)) : 0,
            id: 'id' in item ? parseInt(String(item.id)) : 0,
          }
        })); // TODO: Data from server is not validated. How to handle data properly?
        setError(null);
      } catch(error) {
        if (error instanceof Error) {
          setError({ message: error.message });
        } else if (typeof error === 'object' && error !== null && 'message' in error) {
          setError(error as FetchError);
        } else {
          setError({ message: 'Unbekannter Fehler' });
        }
      }
    })()
  }, [setBooks, setError]);

  if(error) {
    return (
      <>
        <h3>Error</h3>
        <p>{error.message}</p>
        <p>Does 'json-server' run? (npx json-server -p 3001 -w data.json)</p>
      </>
    );
  } else if(!books.length) {
    return (
      <h3>No books</h3>
    );
  } else {
    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Autor</th>
            <th>ISBN</th>
            <th>Bewertung</th>
          </tr>
        </thead>
        <tbody>
          { books.map(book => <BooksListItem key={book.id} book={book}/>) }
        </tbody>
      </table>
    );
  }
}

export default BooksList;
