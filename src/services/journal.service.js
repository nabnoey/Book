import api from "./api.js";
const JOURNAL_API = import.meta.env.VITE_JOURNALS_API;

//get all
const getAllJournal = async () => {
  return await api.get(JOURNAL_API);
};

//get by ID
const getJournalById = async (id) => {
  return await api.get(`${JOURNAL_API}/${id}`);
};
//update by ID
const editJournalById = async (id, journal) => {
  return await api.put(`${JOURNAL_API}/${id}`, journal);
};

//add
const createJournal = async (journal) => {
  return await api.post(`${JOURNAL_API}`, journal);
};
//delete
const deleteJournal = async (id) => {
  return await api.delete(`${JOURNAL_API}/${id}`);
};

const JournalService = {
  getAllJournal,
  getJournalById,
  editJournalById,
  createJournal,
  deleteJournal,
};

export default JournalService;
