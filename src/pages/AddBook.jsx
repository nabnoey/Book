import React, { useState } from "react";
import BookService from "../services/book.service.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}) => (
  <div>
    <label className="block text-purple-900 font-serif font-semibold mb-2 text-sm">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={`Enter ${label.toLowerCase()}`}
      required={required}
      className="w-full border border-purple-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 rounded-lg p-3 bg-white/80 transition-all duration-200 shadow-sm text-gray-800 placeholder-gray-400"
    />
  </div>
);

const AddBook = () => {
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? Number(value) : value;
    setBook((prev) => ({ ...prev, [name]: val }));
  };

  const resetForm = () => {
    setBook({
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
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    const { ...bookData } = book;
    const numericFields = ["publishYear", "pageCount"];

    const cleanedData = Object.entries(bookData).reduce((acc, [key, value]) => {
      if (numericFields.includes(key) && value === "") {
        acc[key] = null;
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});

    const filteredBookData = Object.entries(cleanedData).reduce(
      (acc, [key, value]) => {
        if (value !== "") {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    try {
      const newBook = await BookService.createBook(filteredBookData);

      if (newBook.status === 201 || newBook.status === 200) {
        await Swal.fire({
          title: "Add new book",
          text: "Add new book successfully!",
          icon: "success",
        });
        resetForm();
        navigate("/");
      }
    } catch (error) {
      await Swal.fire({
        title: "Add new book",
        text: error.message || "Request failed",
        icon: "error",
      });
      console.error("Create book error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-amber-50 to-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-lg border border-purple-100 hover:shadow-2xl hover:shadow-amber-200 transition-all duration-500"
      >
        <h1 className="text-5xl font-serif font-extrabold text-center bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 bg-clip-text text-transparent mb-2">
          Add New Book
        </h1>
        <p className="text-center text-gray-500 text-lg mb-10">
          Record a new treasure in your library shelf.
        </p>

        <h2 className="text-2xl font-serif font-bold text-purple-700 mb-4 border-b-2 border-amber-200 pb-2">
          📘 Book Essentials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Input
            label="Title"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
          <Input
            label="Author"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
          <Input
            label="Category"
            name="category"
            value={book.category}
            onChange={handleChange}
          />
        </div>

        <h2 className="text-2xl font-serif font-bold text-purple-700 mb-4 border-b-2 border-amber-200 pb-2">
          🏛️ Publication Info
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {/* <Input
            label="ISBN"
            name="isbn"
             type="text"
            value={book.isbn}
            onChange={handleChange}
          /> */}
          <Input
            label="Publisher"
            name="publisher"
             type="text"
            value={book.publisher}
            onChange={handleChange}
          />
          <Input
            label="Publish Year"
            name="publishYear"
            type="number"
            value={book.publishYear}
            onChange={handleChange}
          />
        </div>

        <h2 className="text-2xl font-serif font-bold text-purple-700 mb-4 border-b-2 border-amber-200 pb-2">
          📖 Physical Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <Input
            label="Edition"
            name="edition"
            value={book.edition}
            onChange={handleChange}
          />
          <Input
            label="Page Count"
            name="pageCount"
            type="number"
            value={book.pageCount}
            onChange={handleChange}
          />
          <Input
            label="Language"
            name="language"
            value={book.language}
            onChange={handleChange}
          />

          <Input
            label="Genre"
            name="genre"
            value={book.genre}
            onChange={handleChange}
          />

              <Input
              label="Description"
              name="description"
              value={book.description}
              onChange={handleChange}
              required
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>

            <label className="block text-purple-900 font-serif font-semibold mb-2 text-sm">
              Cover Image URL
            </label>
            <input
              type="text"
              name="coverImage"
              value={book.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/cover.jpg"
              className="w-full border border-purple-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 rounded-lg p-3 bg-white/80 shadow-sm transition-all duration-200 text-gray-800 placeholder-gray-400"
            />
            {book.coverImage && (
              <div className="mt-4 flex flex-col items-center">
                <p className="text-xs text-purple-600 mb-2">Preview:</p>
                <img
                  className="h-40 rounded-xl shadow-lg border-2 border-amber-300 hover:scale-105 transition-transform duration-300 object-cover"
                  src={book.coverImage}
                  alt="Book cover preview"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-amber-50 border border-amber-200 rounded-xl">
          <p className="text-sm text-purple-700 font-semibold">
            📍 Shelf Location:{" "}
            <span className="font-mono text-lg text-amber-700">
              {book.location}
            </span>
          </p>
        </div>

        <div className="flex justify-center items-center mt-12 space-x-6">
          <button
            type="submit"
            className="px-12 py-4 rounded-full text-white font-serif font-bold shadow-lg transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-purple-500 to-amber-400 hover:from-purple-600 hover:to-amber-500"
          >
            ➕ Add to Library
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-10 py-4 rounded-full bg-white/70 border border-purple-200 text-gray-700 font-serif font-semibold hover:bg-amber-50 hover:shadow-md transition-all duration-300"
          >
            🧹 Clear Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
