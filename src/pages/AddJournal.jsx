import React, { useState } from "react";
import JournalService from "../services/journal.service.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Input = ({ label, name, value, onChange, type = "text", required = false }) => (
  <div>
    <label className="block text-purple-900 font-serif font-semibold mb-2 text-sm">{label}</label>
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

const AddJournal = () => {
  const navigate = useNavigate();

  const [journal, setJournal] = useState({
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
    publicationFrequency: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? Number(value) : value;
    setJournal((prev) => ({ ...prev, [name]: val }));
  };

  const resetForm = () => {
    setJournal({
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
      publicationFrequency: "",
    });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    const numericFields = ["publishYear", "pageCount"];
    const cleanedData = Object.entries(journal).reduce((acc, [key, value]) => {
      if (numericFields.includes(key) && value === "") acc[key] = null;
      else acc[key] = value;
      return acc;
    }, {});

    const filteredJournalData = Object.entries(cleanedData).reduce((acc, [key, value]) => {
      if (value !== "") acc[key] = value;
      return acc;
    }, {});

    try {
      const newJournal = await JournalService.createJournal(filteredJournalData);

      if (newJournal.status === 201 || newJournal.status === 200) {
        await Swal.fire({
          title: "Add new journal",
          text: "Journal added successfully!",
          icon: "success",
        });
        resetForm();
        navigate("/");
      }
    } catch (error) {
      await Swal.fire({
        title: "Add new journal",
        text: error.message || "Request failed",
        icon: "error",
      });
      console.error("Create journal error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-amber-50 to-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-lg border border-purple-100 hover:shadow-2xl hover:shadow-amber-200 transition-all duration-500"
      >
        <h1 className="text-5xl font-serif font-extrabold text-center bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 bg-clip-text text-transparent mb-2">
          Add New Journal
        </h1>
        <p className="text-center text-gray-500 text-lg mb-10">
          Record a new academic journal in your collection.
        </p>

        <h2 className="text-2xl font-serif font-bold text-purple-700 mb-4 border-b-2 border-amber-200 pb-2">
          📰 Journal Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Input label="Title" name="title" value={journal.title} onChange={handleChange} required />
          <Input label="Author" name="author" value={journal.author} onChange={handleChange} />
          <Input label="Category" name="category" value={journal.category} onChange={handleChange} />

          {/* <Input label="Publication Frequency" name="publicationFrequency" value={journal.publicationFrequency} onChange={handleChange} />
          <Input label="Publisher" name="publisher" value={journal.publisher} onChange={handleChange} /> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-purple-900 font-serif font-semibold mb-2 text-sm">
              Description
            </label>
            <textarea
              name="description"
              value={journal.description}
              onChange={handleChange}
              rows="5"
              placeholder="Write a short description..."
              className="w-full border border-purple-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 rounded-lg p-3 bg-white/80 shadow-sm transition-all duration-200 text-gray-800 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-purple-900 font-serif font-semibold mb-2 text-sm">
              Cover Image URL
            </label>
            <input
              type="text"
              name="coverImage"
              value={journal.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/cover.jpg"
              className="w-full border border-purple-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 rounded-lg p-3 bg-white/80 shadow-sm transition-all duration-200 text-gray-800 placeholder-gray-400"
            />
            {journal.coverImage && (
              <div className="mt-4 flex flex-col items-center">
                <p className="text-xs text-purple-600 mb-2">Preview:</p>
                <img
                  className="h-40 rounded-xl shadow-lg border-2 border-amber-300 hover:scale-105 transition-transform duration-300 object-cover"
                  src={journal.coverImage}
                  alt="Journal cover preview"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-amber-50 border border-amber-200 rounded-xl">
          <p className="text-sm text-purple-700 font-semibold">
            📍 Shelf Location:{" "}
            <span className="font-mono text-lg text-amber-700">{journal.location}</span>
          </p>
        </div>

        <div className="flex justify-center items-center mt-12 space-x-6">
          <button
            type="submit"
            className="px-12 py-4 rounded-full text-white font-serif font-bold shadow-lg transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-purple-500 to-amber-400 hover:from-purple-600 hover:to-amber-500"
          >
            ➕ Add Journal
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

export default AddJournal;
