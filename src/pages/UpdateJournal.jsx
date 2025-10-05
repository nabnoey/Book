import React, { useState, useEffect } from "react";
import JournalService from "../services/journal.service.js";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";


const UpdateJournal = () => {

  const navigate = useNavigate();
    const { id } = useParams();

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
    coverImage: ""
  });
  useEffect(() => {
    const updateJournal = async (id) => {
      try {
        const resp = await JournalService.getJournalById(id);
        // console.log(resp.data.data);
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
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden mt-10">
      <div className="container mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 max-w-2xl"
        >
          <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
             Update Journal
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
                value={journal.title}
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
                value={journal.author}
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
                value={journal.category}
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
                value={journal.publishYear}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">issn</span>
              </label>
              <input
                type="text"
                placeholder="Enter issn"
                className="w-full input input-bordered"
                name="issn"
                value={journal.issn}
                onChange={handleChange}
                readOnly
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">volume</span>
              </label>
              <input
                type="text"
                placeholder="Enter volume"
                className="w-full input input-bordered"
                name="volume"
                value={journal.volume}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">issue</span>
              </label>
              <input
                type="text"
                placeholder="Enter issue"
                className="w-full input input-bordered"
                name="issue"
                value={journal.issue}
                onChange={handleChange}
                readOnly
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">publisher</span>
              </label>
              <input
                type="text"
                placeholder="Enter publisher"
                className="w-full input input-bordered"
                name="publisher"
                value={journal.publisher}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">Description</span>
              </label>
              <input
                type="text"
                placeholder="Enter description"
                className="w-full input input-bordered"
                name="description"
                value={journal.description}
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
                value={journal.coverImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                name="coverImage"
              />
              {journal.coverImage && (
                <div className="flex items-center gap-2 mt-2">
                  <img className="h-32" src={journal.coverImage} alt="cover preview" />
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

export default UpdateJournal
