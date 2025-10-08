import React, { useState, useEffect } from "react";
import BookService from "../services/book.service.js";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";

const UpdateBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState({
       title: "",
    author: "",
    category: "",
    publishYear: "",
    isbn: "",
    publisher: "",
    edition: "",
    pageCount: "",
    language: "",
    genre: "",
    description: "",
    coverImage: "",
    location: "A1-B2-C3",
  });

  useEffect(() => {
    const updateBook = async (id) => {
      try {
        const resp = await BookService.getBookById(id);
        if (resp.status === 200) {
          setBook(resp.data.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get All book",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    updateBook(id);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };



  const handleSubmit = async (e) => {
    e?.preventDefault();


    try {
      const newBook = await BookService.editBookById(id, book);

      if (newBook.status === 201 || newBook.status === 200) {
        await Swal.fire({
          title: "Update new book",
          text: "Update book successfully!",
          icon: "success",
        });

        navigate("/");
      }

    } catch (error) {
      await Swal.fire({
        title: "Update book",
        text: error.message || "Request failed",
        icon: "error",
      });
      console.error("Create book error:", error);
    }
  };

    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-yellow-50 py-10">
      <div className="w-full max-w-2xl text-purple-800 bg-white rounded-2xl shadow-xl p-8 ring-2 ring-purple-300">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6 drop-shadow-sm">
          Update Book
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
        
          <div>
            <label className="block mb-1 font-semibold text-purple-700">Title</label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              placeholder="Enter title"
              className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          </div>

          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold text-purple-700">Author</label>
              <input
                type="text"
                name="author"
                value={book.author}
                onChange={handleChange}
                placeholder="Enter author"
                className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-purple-700">Category</label>
              <input
                type="text"
                name="category"
                value={book.category}
                onChange={handleChange}
                placeholder="Enter category"
                className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
          </div>

         
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold text-purple-700">Publish Year</label>
              <input
                type="number"
                name="publishYear"
                value={book.publishYear}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-purple-700">ISBN</label>
              <input
                type="text"
                name="isbn"
                value={book.isbn}
                readOnly
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 bg-gray-100"
              />
            </div>
          </div>

          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold text-purple-700">Publisher</label>
              <input
                type="text"
                name="publisher"
                value={book.publisher}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-purple-700">Edition</label>
              <input
                type="text"
                name="edition"
                value={book.edition}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
          </div>

          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold text-purple-700">Page Count</label>
              <input
                type="number"
                name="pageCount"
                value={book.pageCount}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-purple-700">Language</label>
              <input
                type="text"
                name="language"
                value={book.language}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
          </div>

         
          <div>
            <label className="block mb-1 font-semibold text-purple-700">Genre</label>
            <input
              type="text"
              name="genre"
              value={book.genre}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-purple-700">Description</label>
            <input
              type="text"
              name="description"
              value={book.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          
          <div>
            <label className="block mb-1 font-semibold text-purple-700">Cover Image URL</label>
            <input
              type="text"
              name="coverImage"
              value={book.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            {book.coverImage && (
              <div className="mt-3 flex justify-center">
                <img
                  src={book.coverImage}
                  alt="cover preview"
                  className="h-40 rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-yellow-400 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition"
            >
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;