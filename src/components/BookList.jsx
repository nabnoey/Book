import React from "react";
import BookCard from "./BookCard";

export const BookList = ({ books }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books &&
        books
          .map((book) => (
            <BookCard
              key={book.itemId}
              coverImage={book.coverImage}
              itemId={book.itemId}
              title={book.title}
              author={book.author}
              isbn={book.isbn}
              genre={book.genre}
              publicationDate={book.publicationDate}
            
            />
          ))}
    </div>
  );
};