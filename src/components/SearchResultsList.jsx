import React from 'react';
import '../assets/styles/SearchResultsList.css';
import defaultImage from '../assets/image-not-found.jpg'
import BookCard from './BookCard';

export const SearchResultsList = ({ bookData }) => {
  return (
    <div className="results-grid">
      {
        bookData.map((item,id) => {
          let thumbnail = defaultImage;
          if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail) {
            thumbnail = item.volumeInfo.imageLinks.smallThumbnail;
          }
          let title=item.volumeInfo.title;
          let author=item.volumeInfo.authors;
          let bookId=item.id;

          const book = {
            id: bookId,
            thumbnail: thumbnail,
            title: title,
            author: author
          };
            return <BookCard key={id} book={book} />;
        })}
    </div>
  )
};


