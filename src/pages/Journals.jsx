import React, { useState } from "react";
import JournalService from "../services/journal.service";
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
    try {
      const newJournal = await JournalService.insertJournals(journal);
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
    <div className="flex flex-col justify-center min-h-screen bg-amber-50 py-10">
      <div className="container mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full p-8 m-auto bg-white rounded-2xl shadow-xl ring-2 ring-amber-300 max-w-2xl"
        >
          <h1 className="text-3xl font-bold text-center text-amber-800 mb-8">
            Add Journal
          </h1>

          <div className="space-y-5">
            {/* Input fields */}
            {["title","author","category","publishYear","issn","volume","issue","publisher","description"].map((key) => (
              <div key={key}>
                <label className="label">
                  <span className="text-base font-medium text-gray-700">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                </label>
                <input
                  type={["publishYear","volume","issue"].includes(key) ? "number" : "text"}
                  placeholder={`Enter ${key}`}
                  className="w-full input input-bordered border-amber-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition duration-200"
                  name={key}
                  value={journal[key]}
                  onChange={handleChange}
                />
              </div>
            ))}

            {/* Dropdown for publicationFrequency */}
            <div>
              <label className="label">
                <span className="text-base font-medium text-gray-700">Publication Frequency</span>
              </label>
              <select
                name="publicationFrequency"
                value={journal.publicationFrequency}
                onChange={handleChange}
                className="w-full select select-bordered border-amber-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition duration-200"
              >
                <option value="DAILY">DAILY</option>
                <option value="WEEKLY">WEEKLY</option>
                <option value="MONTHLY">MONTHLY</option>
                <option value="QUARTERLY">QUARTERLY</option>
                <option value="YEARLY">YEARLY</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-center items-center my-6 space-x-4">
              <button
                type="submit"
                className="btn text-white bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 px-6 py-2 rounded-lg"
              >
                Add
              </button>
              <button
                type="button"
                className="btn border-amber-400 text-amber-700 hover:bg-amber-100 transition px-6 py-2 rounded-lg"
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