import './App.css';
import BooksProvider from './BooksProvider';
import BooksList from './BooksList';

function App() {
  return (
    <BooksProvider>
      <BooksList />
    </BooksProvider>
  );
}

export default App;
