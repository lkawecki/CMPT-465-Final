import React from 'react';
//import { Link, useNavigate } from 'react-router-dom';
import './BookCard.css'

const BookCard = ({ book }) => {
  //const navigate = useNavigate();

  const handleCardClick = (bookId) => {
    //navigate.push('/books/${bookId}');
  };  
  return (
    <div className="book-card" 
      onClick={() => handleCardClick(book.id)}>
      <img className="thumbnail" 
      src={book.thumbnail} 
      alt="Book Thumbnail" />
      <div className="bottom">
        <h2 className="title">{book.title}</h2>
        <h3 className="author">{book.author}</h3>
      </div>
      
    </div>
  )
}
export default BookCard;

{/*
<div className="book-card" 
      onClick={() => handleCardClick(book.id)}>
      <Link to={`/books/${book.id}`} 
        style={{ textDecoration: 'none',
        color: 'inherit' }}>
        <img className="thumbnail" 
        src={book.thumbnail} 
        alt="Book Thumbnail" />
        <div className="bottom">
          <h2 className="title">{book.title}</h2>
          <h3 className="author">{book.author}</h3>
        </div>
      </Link>
    </div>
*/}
