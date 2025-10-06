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
          <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-700 mb-4 drop-shadow-sm">
          Books
        </h1>
   
      </div>

     
      <BookList books={books} />
    </div>
  );
};

export default Books;
