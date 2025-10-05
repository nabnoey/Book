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
      publicationFrequency: "MONTHLY",
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
      const newJournal = await JournalService.createJournal(filteredJournalData);

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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-50 via-purple-100 to-yellow-50 py-10">
      <div className="w-full max-w-3xl p-8 bg-white rounded-3xl shadow-xl ring-2 ring-purple-200">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-8 drop-shadow-md">
          Add Journal
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {Object.keys(journal).map((key) => (
            <div key={key}>
              <label className="label">
                <span className="text-base font-medium text-purple-800">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              </label>
              <input
                type={["publishYear", "volume", "issue"].includes(key) ? "number" : "text"}
                placeholder={`Enter ${key}`}
                name={key}
                value={journal[key]}
                onChange={handleChange}
                className="w-full input input-bordered border-purple-300 focus:ring-2 focus:ring-purple-300 rounded-xl"
              />
            </div>
          ))}

          <div className="flex justify-center gap-6 mt-6">
            <button
              type="submit"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold shadow-lg transition transform hover:scale-105"
            >
              Add
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-purple-900 rounded-xl font-semibold shadow-md transition transform hover:scale-105"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJournal;
