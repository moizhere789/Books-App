import React, { createContext, useState } from 'react';

export const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedBooks, setBookmarkedBooks] = useState([]);

  const addBookmark = (book) => {
    setBookmarkedBooks((prevBooks) => [...prevBooks, book]);
  };

  const removeBookmark = (bookId) => {
    setBookmarkedBooks((prevBooks) => prevBooks.filter(book => book.id !== bookId));
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedBooks, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};