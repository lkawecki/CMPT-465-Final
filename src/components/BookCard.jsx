import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/BookCard.css'

const BookCard = ({ book }) => { 
  return (
    <Link to={`/books/${book.id}`} className="book-link">
      <div className="book-card">
        <img className="thumbnail" 
        src={book.thumbnail} 
        alt="Book Thumbnail" />
        <div className="bottom">
          <h2 className="title">{book.title}</h2>
          <h3 className="author">{book.author}</h3>
        </div>
      </div>
    </Link>
  )
}
export default BookCard;


