import api from "./api.js";
const JOURNAL_API = import.meta.env.VITE_JOURNAL_API;


const getAllJournal = async () => {
  return await api.get(JOURNAL_API);
};


const getJournalById = async (id) => {
  return await api.get(`${JOURNAL_API}/${id}`);
};

const editJournalById = async (id, journal) => {
  return await api.put(`${JOURNAL_API}/${id}`, journal);
};


const createJournal = async (journal) => {
  return await api.post(`${JOURNAL_API}`, journal);
};

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
