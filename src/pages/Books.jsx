import React, { useState, useEffect } from "react";
import { BookList } from "../components/BookList";
import Swal from "sweetalert2";
import BookService from "../services/book.service";
const Books = () => {
  const [books, setBooks] = useState([]);
  
 
  useEffect(() => {
    const getAllBook = async () => {
      try {
        const response = await BookService.getAllBooks()

        if (response.status === 200) {
          setBooks(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get All Book",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };

    getAllBook();
  }, []);
  return (
    <div className="flexcontainer mx-auto">
      <div>
        <h1 className=" flex title justify-center text-3xl text-center m-5 p-5">
          Books
        </h1>
      </div >

      <BookList books={books} />
    </div>
  );
};

export default Books;