import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import ComicList from "../components/ComicList";
import ComicService from "../services/comic.service";
const Comics = () => {
  const [comic, setComic] = useState([]);
  
 
  useEffect(() => {
    const getAllComic = async () => {
      try {
        const response = await ComicService.getAllComic()

        if (response.status === 200) {
          setComic(response.data.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get All journal",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };

    getAllComic();
  }, []);
  return (
    <div className="flexcontainer mx-auto">
      <div>
        <h1 className=" flex title justify-center text-3xl text-center m-5 p-5">
          Comics
        </h1>
      </div >

      <ComicList comics={comic} />
    </div>
  );
};

export default Comics;