import React, { useState, useEffect } from "react";
import { BookList } from "../components/BookList";
import Swal from "sweetalert2";
import BookService from "../services/book.service";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        const response = await BookService.getAllBooks();
        if (response.status === 200) {
          setBooks(response.data.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get All Book",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };

    getAllBooks();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gradient-to-b from-purple-50 to-yellow-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-700 mb-4 drop-shadow-sm">
          Books
        </h1>
        <div className="flex justify-center">
          <a
            href="/AddBook"
            className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-semibold px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
          >
            Add Book
          </a>
        </div>
      </div>

     
      <BookList books={books} />
    </div>
  );
};

export default Books;
