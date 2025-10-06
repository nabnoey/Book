import React from "react";
import BookService from "../services/book.service";

const BookCard = (props) => {
  
  const handleDelete = async (itemId) => {
    const isConfirmed = window.confirm("แน่ใจไหมว่าจะลบหนังสือเล่มนี้?");
    if (!isConfirmed) return;

    try {
      const response = await BookService.deleteBook(itemId);
      if (response.status === 200) {
        alert("ลบหนังสือเรียบร้อยแล้ว!");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-80 bg-gradient-to-br from-purple-50 via-yellow-50 to-purple-50 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden transform hover:scale-105">
      <div className="p-5">
        {props.coverImage ? (
          <img
            src={props.coverImage}
            alt={props.title}
            className="w-full h-56 object-cover rounded-xl mb-4 border-2 border-purple-200"
          />
        ) : (
          <div className="w-full h-56 bg-purple-100 flex items-center justify-center text-gray-400 text-sm rounded-xl mb-4 border-2 border-purple-200">
            No Image
          </div>
        )}

        {/* Title */}
        <h2 className="text-2xl font-bold text-purple-700 mb-3 drop-shadow-sm">
          {props.title}
        </h2>

        {/* Info */}
        <div className="text-gray-700 space-y-2 text-sm">
          <p><strong>Author:</strong> {props.author}</p>
          <p><strong>Category:</strong> {props.category}</p>
          <p><strong>Language:</strong> {props.language}</p>
          <p><strong>PageCount:</strong> {props. pageCount}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => handleDelete(props.itemId)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-xl transition-all duration-200 mr-2 shadow-md hover:shadow-lg"
          >
            Delete
          </button>
          <a
            href={`/updateBook/${props.itemId}`}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Edit
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
