import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import ComicService from "../services/comic.service";

const AddComics = () => {
  const navigate = useNavigate();

  const [comic, setComic] = useState({
    title: "",
    author: "",
    category: "",
    publishYear: "",
    isbn: "",
    series: "",
    volumeNumber: "",
    illustrator: "",
    colorType: "",
    targetAge: "",
    description: "",
    coverImage: ""
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "number" && value !== "" ? Number(value) : value;
    setComic((prev) => ({ ...prev, [name]: val }));
  };

  const resetForm = () => {
    setComic({
      title: "",
      author: "",
      category: "",
      publishYear: "",
      isbn: "",
      series: "",
      volumeNumber: "",
      illustrator: "",
      colorType: "",
      targetAge: "",
      description: "",
      coverImage: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numericFields = ["publishYear", "volumeNumber"];
    const payload = Object.entries(comic).reduce((acc, [key, value]) => {
      if (numericFields.includes(key) && value !== "") {
        acc[key] = Number(value);
      } else if (value !== "") {
        acc[key] = value;
      }
      return acc;
    }, {});

    try {
      const res = await ComicService.createComic(payload);
      if (res.status === 201 || res.status === 200) {
        await Swal.fire({
          title: "🎉 Comic Added Successfully!",
          text: `"${comic.title}" has been added to your collection.`,
          icon: "success",
        });
        resetForm();
        navigate("/comics");
      }
    } catch (error) {
      Swal.fire({
        title: "Error ❌",
        text: error.response?.data?.message || error.message || "Failed to add comic.",
        icon: "error",
      });
      console.error("Create comic error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-amber-50 to-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-lg border border-purple-100 hover:shadow-2xl hover:shadow-amber-200 transition-all duration-500"
      >
        <h1 className="text-5xl font-serif font-extrabold text-center bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 bg-clip-text text-transparent mb-2">
          Add New Comic
        </h1>
        <p className="text-center text-gray-500 text-lg mb-10">
          Record a new comic in your collection.
        </p>

        <h2 className="text-2xl font-serif font-bold text-purple-700 mb-4 border-b-2 border-amber-200 pb-2">
          📘 Comic Essentials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-purple-900 font-serif font-semibold mb-2 text-sm">Title</label>
            <input
              type="text"
              name="title"
              value={comic.title}
              onChange={handleChange}
              required
              placeholder="Enter title"
              className="w-full border border-purple-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 rounded-lg p-3 bg-white/80 transition-all duration-200 shadow-sm text-gray-800 placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-purple-900 font-serif font-semibold mb-2 text-sm">Author</label>
            <input
              type="text"
              name="author"
              value={comic.author}
              onChange={handleChange}
              placeholder="Enter author"
              className="w-full border border-purple-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 rounded-lg p-3 bg-white/80 transition-all duration-200 shadow-sm text-gray-800 placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-purple-900 font-serif font-semibold mb-2 text-sm">Category</label>
            <input
              type="text"
              name="category"
              value={comic.category}
              onChange={handleChange}
              placeholder="Enter category"
              className="w-full border border-purple-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 rounded-lg p-3 bg-white/80 transition-all duration-200 shadow-sm text-gray-800 placeholder-gray-400"
            />
          </div>
        </div>

        <h2 className="text-2xl font-serif font-bold text-purple-700 mb-4 border-b-2 border-amber-200 pb-2">
          📚 Publication Info
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-purple-900 font-serif font-semibold mb-2 text-sm">Series</label>
            <input
              type="text"
              name="series"
              value={comic.series}
              onChange={handleChange}
              placeholder="Enter series"
              className="w-full border border-purple-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 rounded-lg p-3 bg-white/80 shadow-sm text-gray-800 placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-purple-900 font-serif font-semibold mb-2 text-sm">Volume Number</label>
            <input
              type="number"
              name="volumeNumber"
              value={comic.volumeNumber}
              onChange={handleChange}
              placeholder="Enter volume number"
              className="w-full border border-purple-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 rounded-lg p-3 bg-white/80 shadow-sm text-gray-800 placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-purple-900 font-serif font-semibold mb-2 text-sm">Publish Year</label>
            <input
              type="number"
              name="publishYear"
              value={comic.publishYear}
              onChange={handleChange}
              placeholder="Enter publish year"
              className="w-full border border-purple-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 rounded-lg p-3 bg-white/80 shadow-sm text-gray-800 placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-purple-900 font-serif font-semibold mb-2 text-sm">Illustrator</label>
            <input
              type="text"
              name="illustrator"
              value={comic.illustrator}
              onChange={handleChange}
              placeholder="Enter illustrator"
              className="w-full border border-purple-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 rounded-lg p-3 bg-white/80 shadow-sm text-gray-800 placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-purple-900 font-serif font-semibold mb-2 text-sm">Color Type</label>
            <input
              type="text"
              name="colorType"
              value={comic.colorType}
              onChange={handleChange}
              placeholder="Enter color type"
              className="w-full border border-purple-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 rounded-lg p-3 bg-white/80 shadow-sm text-gray-800 placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-purple-900 font-serif font-semibold mb-2 text-sm">Target Age</label>
            <input
              type="text"
              name="targetAge"
              value={comic.targetAge}
              onChange={handleChange}
              placeholder="Enter target age"
              className="w-full border border-purple-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 rounded-lg p-3 bg-white/80 shadow-sm text-gray-800 placeholder-gray-400"
            />
          </div>
        </div>

        <h2 className="text-2xl font-serif font-bold text-purple-700 mb-4 border-b-2 border-amber-200 pb-2">
          📖 Description & Cover
        </h2>
        <div className="grid grid-cols-1 gap-6 mb-8">
          <div>
            <label className="block text-purple-900 font-serif font-semibold mb-2 text-sm">Description</label>
            <textarea
              name="description"
              value={comic.description}
              onChange={handleChange}
              placeholder="Enter description"
              rows={4}
              className="w-full border border-purple-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 rounded-lg p-3 bg-white/80 shadow-sm text-gray-800 placeholder-gray-400 resize-none"
            />
          </div>
          <div>
            <label className="block text-purple-900 font-serif font-semibold mb-2 text-sm">Cover Image URL</label>
            <input
              type="text"
              name="coverImage"
              value={comic.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/cover.jpg"
              className="w-full border border-purple-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 rounded-lg p-3 bg-white/80 shadow-sm text-gray-800 placeholder-gray-400"
            />
          </div>
        </div>

        {comic.coverImage && (
          <div className="mt-4 flex flex-col items-center">
            <p className="text-xs text-purple-600 mb-2">Preview:</p>
            <img
              className="h-40 rounded-xl shadow-lg border-2 border-amber-300 hover:scale-105 transition-transform duration-300 object-cover"
              src={comic.coverImage}
              alt="Comic cover preview"
            />
          </div>
        )}

        <div className="flex justify-center items-center mt-12 space-x-6">
          <button
            type="submit"
            className="px-12 py-4 rounded-full text-white font-serif font-bold shadow-lg transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-purple-500 to-amber-400 hover:from-purple-600 hover:to-amber-500"
          >
            ➕ Add Comic
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

export default AddComics;
