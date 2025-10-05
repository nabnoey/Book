import api from "./api.js";
const ITEM_API = import.meta.env.VITE_ITEMS_API;

//get all
const getAllItem = async () => {
  return await api.get(ITEM_API);
};

//get by ID
const getItemById = async (id) => {
  return await api.get(`${ITEM_API}/${id}`);
};


const itemService = {
  getAllItem,
  getItemById
};

export default itemService;
