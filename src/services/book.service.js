import api from "./api.js"
const BOOK_API = import.meta.env.VITE_BOOK_API;


const getAllBooks = async () => {
  return await api.get(BOOK_API);
};


const getBookById = async (id) => {
  return await api.get(`${BOOK_API}/${id}`);
};

const editBookById = async (id, book) => {
  return await api.put(`${BOOK_API}/${id}`, book);
};

const createBook = async (data) => api.post(`${BOOK_API}`, data);

const deleteBook = async (id) => {
  return await api.delete(`${BOOK_API}/${id}`);
};

const BookService = {
  getAllBooks,
  getBookById,
  editBookById,
  createBook,
  deleteBook,
};

export default BookService;
