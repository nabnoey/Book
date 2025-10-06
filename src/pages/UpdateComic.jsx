import React, { useState, useEffect } from "react";
import ComicService from "../services/comic.service.js";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";

const UpdateComic = () => {
  
  const navigate = useNavigate();
    const { id } = useParams();

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
  useEffect(() => {
    const updateComic = async (id) => {
      try {
        const resp = await ComicService.getComicById(id);
        if (resp.status === 200) {
          setComic(resp.data.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get All journal",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    updateComic(id);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComic((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();


    try {
      const newComic = await ComicService.editComicById(id ,comic);

      if (newComic.status === 201 || newComic.status === 200) {
        await Swal.fire({
          title: "Update comic",
          text: "Update successfully!",
          icon: "success",
        });
        navigate("/comics");
      }

    } catch (error) {
      await Swal.fire({
        title: "Update comic",
        text: error.message || "Request failed",
        icon: "error",
      });
      console.error("Create comic error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-yellow-50 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 ring-2 ring-purple-300">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6 drop-shadow-sm">
          Update Comic
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5 text-purple-800">
          {/* Title */}
          <div>
            <label className="block mb-1 font-semibold text-purple-700">Title</label>
            <input
              type="text"
              name="title"
              value={comic.title}
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
                value={comic.author}
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
                value={comic.category}
                onChange={handleChange}
                placeholder="Enter category"
                className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
          </div>

          {/* Publish Year & ISBN */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold text-purple-700">Publish Year</label>
              <input
                type="number"
                name="publishYear"
                value={comic.publishYear}
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
                value={comic.isbn}
                readOnly
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 bg-gray-100"
              />
            </div>
          </div>

          {/* Series & Volume */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold text-purple-700">Series</label>
              <input
                type="text"
                name="series"
                value={comic.series}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-purple-700">Volume Number</label>
              <input
                type="number"
                name="volumeNumber"
                value={comic.volumeNumber}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
          </div>

          {/* Illustrator & Color Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold text-purple-700">Illustrator</label>
              <input
                type="text"
                name="illustrator"
                value={comic.illustrator}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-purple-700">Color Type</label>
              <input
                type="text"
                name="colorType"
                value={comic.colorType}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block mb-1 font-semibold text-purple-700">Cover Image URL</label>
            <input
              type="text"
              name="coverImage"
              value={comic.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            {comic.coverImage && (
              <div className="mt-3 flex justify-center">
                <img
                  src={comic.coverImage}
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
              Update Comic
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateComic;