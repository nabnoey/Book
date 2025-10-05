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
   <div className="w-80 bg-white border border-pink-100 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
  
  <div className="p-6">
   
    {props.coverImage ? (
      <img
        src={props.coverImage}
        alt={props.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
    ) : (
      <div className="w-full h-48 bg-pink-50 flex items-center justify-center text-gray-400 text-sm rounded-md mb-4">
        No Image
      </div>
    )}

    <h2 className="text-xl font-semibold text-pink-700 mb-4">{props.title}</h2>

    <div className="text-gray-700 space-y-2 text-sm">
      <p><strong>Author:</strong> {props.author}</p>
      <p><strong>Genre:</strong> {props.genre}</p>
      <p><strong>Publication Date:</strong> {props.publicationDate}</p>
      <p><strong>ISBN:</strong> {props.isbn}</p>
    </div>

    <div className="flex justify-end gap-3 mt-6">
      <button
        onClick={() => handleDelete(props.itemId)}
        className="bg-red-400 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
      >
        Delete
      </button>
      <a
        href={`/updateBook/${props.itemId}`}
        className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
      >
        Edit
      </a>
    </div>
  </div>
</div>
  );
};

export default BookCard;