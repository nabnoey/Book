import React, { useState } from "react";
import JournalService from "../services/journal.service.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddJournal = () => {
  const navigate = useNavigate();

  const [journal, setJournal] = useState({
    title: "",
    author: "",
    category: "",
    publishYear: "",
    issn: "",
    volume: "",
    issue: "",
    publicationFrequency: "MONTHLY",
    publisher: "",
    description: "",
    coverImage: "", // ถ้ามีรูป
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
      issn: "",
      volume: "",
      issue: "",
      publicationFrequency: "MONTHLY",
      publisher: "",
      description: "",
      coverImage: "",
    });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    // Clean & filter
    const numericFields = ["publishYear", "volume", "issue"];
    const cleanedData = Object.entries(journal).reduce((acc, [key, value]) => {
      if (numericFields.includes(key) && value === "") acc[key] = null;
      else acc[key] = value;
      return acc;
    }, {});

    const filteredData = Object.entries(cleanedData).reduce((acc, [key, value]) => {
      if (value !== "") acc[key] = value;
      return acc;
    }, {});

    try {
      const newJournal = await JournalService.createJournal(filteredData);

      if (newJournal.status === 201 || newJournal.status === 200) {
        await Swal.fire({
          title: "Add new journal",
          text: "Journal added successfully!",
          icon: "success",
        });
        resetForm();
        navigate("/journals");
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
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden mt-10">
      <div className="container mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full p-8 m-auto bg-gradient-to-r from-indigo-100 via-pink-100 to-yellow-100 rounded-2xl shadow-lg ring-2 ring-pink-300/50 max-w-2xl"
        >
          <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">
            📝 Add a New Journal
          </h1>

          <div className="space-y-5">
            <div>
              <label className="label">
                <span className="text-base font-semibold label-text text-purple-800">Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter title"
                className="w-full input input-bordered border-purple-300 focus:border-purple-500 focus:ring focus:ring-purple-200 rounded-lg"
                name="title"
                value={journal.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base font-semibold label-text text-purple-800">Author</span>
              </label>
              <input
                type="text"
                placeholder="Enter author"
                className="w-full input input-bordered border-purple-300 focus:border-purple-500 focus:ring focus:ring-purple-200 rounded-lg"
                name="author"
                value={journal.author}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base font-semibold label-text text-purple-800">Category</span>
              </label>
              <input
                type="text"
                placeholder="Enter category"
                className="w-full input input-bordered border-purple-300 focus:border-purple-500 focus:ring focus:ring-purple-200 rounded-lg"
                name="category"
                value={journal.category}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base font-semibold label-text text-purple-800">Publish Year</span>
              </label>
              <input
                type="number"
                placeholder="Enter publish year"
                className="w-full input input-bordered border-purple-300 focus:border-purple-500 focus:ring focus:ring-purple-200 rounded-lg"
                name="publishYear"
                value={journal.publishYear}
                onChange={handleChange}
                min="0"
              />
            </div>

            {/* Cover Image preview */}
            <div>
              <label className="label">
                <span className="text-base font-semibold label-text text-purple-800">Cover Image URL</span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered border-purple-300 focus:border-purple-500 focus:ring focus:ring-purple-200 rounded-lg"
                value={journal.coverImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                name="coverImage"
              />
              {journal.coverImage && (
                <div className="flex items-center justify-center mt-3">
                  <img className="h-40 rounded-lg shadow-md" src={journal.coverImage} alt="cover preview" />
                </div>
              )}
            </div>

            <div className="flex justify-center items-center my-6 space-x-6">
              <button
                type="submit"
                className="btn bg-purple-500 hover:bg-purple-600 text-white px-8 py-2 rounded-xl shadow-md transition-all duration-200"
              >
                Add
              </button>
              <button
                type="button"
                className="btn bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-2 rounded-xl shadow-md transition-all duration-200"
                onClick={resetForm}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJournal;
