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
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJournal((prev) => ({ ...prev, [name]: value }));
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
      publicationFrequency: "",
      publisher: "",
      description: ""
    });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    const filteredJournalData = Object.entries(journal).reduce((acc, [key, value]) => {
      if (value !== "") {
        acc[key] = value;
      }
      return acc;
    }, {});

    try {
      const newJournal = await JournalService.createJournal(filteredJournalData)

      if (newJournal.status === 201 || newJournal.status === 200) {
        await Swal.fire({
          title: "Add new journal",
          text: "Add new journal successfully!",
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
          className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 max-w-2xl"
        >
          <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Add Journal
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

export default AddJournal
