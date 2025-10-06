import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import JournalList from "../components/JournalList.jsx"
import JournalService from "../services/journal.service.js";

const Journals = () => {
  const [journal, setJournal] = useState([]);

  useEffect(() => {
    const getAllJournal = async () => {
      try {
        const response = await JournalService.getAllJournal();
        if (response.status === 200) {
          console.log("API Response:", response.data);
          console.log("Journal array:", response.data.data);
          setJournal(response.data.data);
        
        }
      } catch (error) {
        Swal.fire({
          title: "Get All journal",
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
      
      </div>

      
        <JournalList journal={journal} />
     
    </div>
  );
};

export default Journals;
