import api from "./api.js";
const ITEM_API = import.meta.env.VITE_ITEMS_API;


const getAllItem = async () => {
  return await api.get(ITEM_API);
};


const getItemById = async (id) => {
  return await api.get(`${ITEM_API}/${id}`);
};


const itemService = {
  getAllItem,
  getItemById
};

export default itemService;
