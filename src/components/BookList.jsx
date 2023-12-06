import React from 'react';

function BookList({ list }) {
  return (
    <div>
      <h2>{list.listName}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* Display books for the list */}
        {list.books.map(book => (
          <div key={book.bookId} style={{ width: '200px', margin: '10px' }}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            {/* Add more book details here */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;