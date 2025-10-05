import React, { useState, useEffect } from "react";
import JournalList from "../components/JournalList";
import Swal from "sweetalert2";
import JournalService from "../services/journal.service";

const Journals = () => {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    const getAllJournal = async () => {
      try {
        const response = await JournalService.getAllJournal();
        if (response.status === 200) {
          setJournals(response.data.data || []); 
        }
      } catch (error) {
        Swal.fire({
          title: "Get All Journals",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };

    getAllJournal();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gradient-to-b from-purple-50 to-yellow-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-700 mb-4 drop-shadow-sm">
          Journals
        </h1>
        <div className="flex justify-center">
          <a
            href="/AddJournal"
            className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-semibold px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
          >
            Add Journal
          </a>
        </div>
      </div>

      {journals && journals.length > 0 ? (
        <JournalList journals={journals} />
      ) : (
        <p className="text-center text-gray-500 text-lg">ยังไม่มีวารสาร</p>
      )}
    </div>
  );
};

export default Journals;
