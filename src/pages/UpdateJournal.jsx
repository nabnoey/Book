import React, { useState, useEffect } from "react";
import JournalService from "../services/journal.service"
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";


const UpdateJournal = () => {

  const navigate = useNavigate();
    const { id } = useParams();

  const [journal, setJournal] = useState({  title: "",
    author: "",
    category: "",
    publishYear: "",
    issn: "",
    volume: "",
    issue: "",
    publicationFrequency: "MONTHLY",
    publisher: "",
    description: "",
    coverImage: ""});
  useEffect(() => {
    const updateJournal = async (id) => {
      try {
        const resp = await JournalService.getJournalById(id);
        if (resp.status === 200) {
          setJournal(resp.data.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get All restaurants",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    updateJournal(id);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJournal((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e?.preventDefault();


    try {
      const newJournal = await JournalService.editJournalById(id,journal)

      if (newJournal.status === 201 || newJournal.status === 200) {
        await Swal.fire({
          title: "Update journal",
          text: "Update journal successfully!",
          icon: "success",
        });
        navigate("/journals");
      }

    } catch (error) {
      await Swal.fire({
        title: "Update journal",
        text: error.message || "Request failed",
        icon: "error",
      });
      console.error("Create journal error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-yellow-50 py-10">
      <div className="w-full max-w-2xl text-purple-800 bg-white rounded-2xl shadow-xl p-8 ring-2 ring-purple-300">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6 drop-shadow-sm">
          Update Journal
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block mb-1 font-semibold text-purple-700">Title</label>
            <input
              type="text"
              name="title"
              value={journal.title}
              onChange={handleChange}
              placeholder="Enter title"
              className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          </div>

          {/* Author & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold text-purple-700">Author</label>
              <input
                type="text"
                name="author"
                value={journal.author}
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
                value={journal.category}
                onChange={handleChange}
                placeholder="Enter category"
                className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
          </div>

          {/* Publish Year & ISSN */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold text-purple-700">Publish Year</label>
              <input
                type="number"
                name="publishYear"
                value={journal.publishYear}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-purple-700">ISSN</label>
              <input
                type="text"
                name="issn"
                value={journal.issn}
                readOnly
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 bg-gray-100"
              />
            </div>
          </div>

          {/* Volume & Issue */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold text-purple-700">Volume</label>
              <input
                type="text"
                name="volume"
                value={journal.volume}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-purple-700">Issue</label>
              <input
                type="text"
                name="issue"
                value={journal.issue}
                readOnly
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 bg-gray-100"
              />
            </div>
          </div>

          {/* Publisher & Description */}
          <div>
            <label className="block mb-1 font-semibold text-purple-700">Publisher</label>
            <input
              type="text"
              name="publisher"
              value={journal.publisher}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-purple-700">Description</label>
            <input
              type="text"
              name="description"
              value={journal.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block mb-1 font-semibold text-purple-700">Cover Image URL</label>
            <input
              type="text"
              name="coverImage"
              value={journal.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            {journal.coverImage && (
              <div className="mt-3 flex justify-center">
                <img
                  src={journal.coverImage}
                  alt="cover preview"
                  className="h-40 rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-yellow-400 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition"
            >
              Update Journal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateJournal;