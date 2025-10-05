import React from "react";
import BookService from "../services/book.service";
import { useNavigate } from "react-router";


const BookCard = (props) => {
    const navigate = useNavigate();
  const handleDelete = async (itemId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this Book?"
    );
    if (!isConfirmed) return;

    try {
      const response = await BookService.deleteBook(itemId)
      if (response.status === 200) {
        alert("Book deleted successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
      
          <p><strong>Author:</strong> {props.author} </p>
          <p><strong>Genre:</strong> {props.genre} </p>
          <p><strong>Publication Date:</strong> {props.publicationDate} </p>
          <p><strong>ISBN:</strong> {props.isbn} </p>
          <p><strong>Price:</strong> ${props.price} </p>
          <p><strong>Quantity:</strong> {props.quantity} </p>
        
          <div className="card-actions justify-end">
            <button
              onClick={() => handleDelete(props.itemId)}
              className="btn btn-soft btn-error"
            >
              Delete
            </button>
            <a
              href={"/updateBook/" + props.itemId}
              className="btn btn-soft btn-warning"
            >
              Edit
            </a>
          </div>
      </div>
    </div>
  );
};

export default BookCard;