import React from "react";
import BookCard from "./BookCard";

export const BookList = ({ books }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.isArray(books) &&
        books
          .filter((book) => book && book._id)
          .map((book) => (
            <BookCard
              key={book._id}
              itemId={book._id}
              title={book.title}
              author={book.author}
              isbn={book.isbn}
              genre={book.genre}
              publicationDate={book.publicationDate}
              price={book.price}
              quantity={book.quantity}
            />
          ))}
    </div>
  );
};
