import './App.css';
import BooksList from './BooksList';
import Form from './Form';
import { Book, InputBook } from './Book';
import { useContext, useEffect, useState } from 'react';
import BooksContext from './BooksContext';
import { FetchError } from './FetchError';

function App() {
  const [ books, setBooks ] = useContext(BooksContext);
  const [ error, setError ] = useState<FetchError|null>(null);
  const [ idCounter, setIdCounter ] = useState(0);

  useEffect(() => {
    if(!idCounter) {
      const maxId = books.reduce((maxId, book) => maxId < book.id ? book.id : maxId, 0);
      setIdCounter(maxId);
    }
  }, [idCounter, books]);

  async function onSave(book: InputBook) {
    const newBook:Book = {
      ...book,
      id: idCounter + 1,
      rating: 0,
    };
    setIdCounter(newBook.id);

    try{
      const response = await fetch(`${process.env.REACT_APP_BOOKS_SERVER_URL}`, {
        method: 'POST',
        body: JSON.stringify(newBook),
        headers: {
          'content-type': 'application/json',
        },
      });

      if(!response.ok) {
        throw new Error('fetch request failed with: ' + response.status + ' ' + response.statusText);
      }

      setBooks(curBooks => [...curBooks, newBook]);
      setError(null);
    }catch(error) {
      if (error instanceof Error) {
        setError({ message: error.message });
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        setError(error as FetchError);
      } else {
        setError({ message: 'Unbekannter Fehler' });
      }
    }
  }

  return (
    <>
      {error && (
        <div className="error">
          <h3>Error:</h3>
          <p>{error.message}</p>
        </div>
      )}
      <Form onSave={onSave}/>
      <BooksList />
    </>
  );
}

export default App;
