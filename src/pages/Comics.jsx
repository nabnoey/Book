import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import ComicList from "../components/ComicList";
import ComicService from "../services/comic.service";

const Comics = () => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const getAllComics = async () => {
      try {
        const response = await ComicService.getAllComic();
        if (response.status === 200) {
          setComics(response.data.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get All Comics",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };

    getAllComics();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-gradient-to-b from-purple-50 to-yellow-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-700 mb-4 drop-shadow-md">
          Comics
        </h1>
        
      </div>

      {/* Comic List */}
      <ComicList comics={comics} />
    </div>
  );
};

export default Comics;
