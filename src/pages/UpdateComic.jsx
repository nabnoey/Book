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
        // console.log(resp.data.data);
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
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden mt-10">
      <div className="container mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 max-w-2xl"
        >
          <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Update Comic
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
                readOnly
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

            <div>
              <label className="label">
                <span className="text-base label-text text-black">Cover Image URL</span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered"
                value={comic.coverImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                name="coverImage"
              />
              {comic.coverImage && (
                <div className="flex items-center gap-2 mt-2">
                  <img className="h-32" src={comic.coverImage} alt="cover preview" />
                </div>
              )}
            </div>


            <div className="flex justify-center items-center my-6 space-x-4">
              <button type="submit" className="btn bg-green-500 text-white px-6">
                Confirm
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

}

export default UpdateComic
