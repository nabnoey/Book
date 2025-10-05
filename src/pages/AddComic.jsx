import React, { useState } from "react";
import ComicService from "../services/comic.service.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";


const AddComic = () => {
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
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComic((prev) => ({ ...prev, [name]: value }));
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
      description: ""
    });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();


    try {
      const newComic = await ComicService.createComic(comic);

      if (newComic.status === 201 || newComic.status === 200) {
        await Swal.fire({
          title: "Add new comic",
          text: "Add new comic successfully!",
          icon: "success",
        });
        resetForm();
        navigate("/comics");
      }

    } catch (error) {
      await Swal.fire({
        title: "Add new comic",
        text: error.message || "Request failed",
        icon: "error",
      });
      console.error("Create comic error:", error);
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden mt-10">
      <div className="container mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 max-w-2xl"
        >
          <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Add Comic
          </h1>

          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="text-base label-text text-black">Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter title"
                className="w-full input input-bordered"
                name="title"
                value={comic.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">Author</span>
              </label>
              <input
                type="text"
                placeholder="Enter author"
                className="w-full input input-bordered"
                name="author"
                value={comic.author}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">Category</span>
              </label>
              <input
                type="text"
                placeholder="Enter category"
                className="w-full input input-bordered"
                name="category"
                value={comic.category}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">Publish Year</span>
              </label>
              <input
                type="number"
                placeholder="Enter publish year"
                className="w-full input input-bordered"
                name="publishYear"
                value={comic.publishYear}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">ISBN</span>
              </label>
              <input
                type="text"
                placeholder="Enter ISBN"
                className="w-full input input-bordered"
                name="isbn"
                value={comic.isbn}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text text-black">series</span>
              </label>
              <input
                type="text"
                placeholder="Enter series"
                className="w-full input input-bordered"
                name="series"
                value={comic.series}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">volumeNumber</span>
              </label>
              <input
                type="number"
                placeholder="Enter volumeNumber"
                className="w-full input input-bordered"
                name="volumeNumber"
                value={comic.volumeNumber}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">illustrator</span>
              </label>
              <input
                type="text"
                placeholder="Enter illustrator"
                className="w-full input input-bordered"
                name="illustrator"
                value={comic.illustrator}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">colorType</span>
              </label>
              <input
                type="text"
                placeholder="Enter colorType"
                className="w-full input input-bordered"
                name="colorType"
                value={comic.colorType}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">targetAge</span>
              </label>
              <input
                type="text"
                placeholder="Enter targetAge"
                className="w-full input input-bordered"
                name="targetAge"
                value={comic.targetAge}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">description</span>
              </label>
              <input
                type="text"
                placeholder="Enter description"
                className="w-full input input-bordered"
                name="description"
                value={comic.description}
                onChange={handleChange}
              />
            </div>


            <div className="flex justify-center items-center my-6 space-x-4">
              <button type="submit" className="btn bg-green-500 text-white px-6">
                Add
              </button>
              <button type="button" className="btn" onClick={resetForm}>
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddComic
