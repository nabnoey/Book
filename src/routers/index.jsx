import { createBrowserRouter } from "react-router";
import AddBook from "../pages/AddBook.jsx";
import AddComic from "../pages/AddComic.jsx";
import AddJournal from "../pages/AddJournal.jsx";
import Books from "../pages/Books.jsx";
import Comics from "../pages/Comics.jsx";
import Home from "../pages/Home.jsx"
import Journals from "../pages/Journals.jsx";
import UpdateBook from "../pages/UpdateBook.jsx";
import UpdateComic from "../pages/UpdateComic.jsx";
import UpdateJournal from "../pages/UpdateJournal.jsx";
import MainLayout from "../../layouts/MainLaout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Books />,
      },

      {
        path: "/comics",
        element: <Comics />,
      },
      {
        path: "/journals",
        element: <Journals />,
      },

      {
        path: "/updateComic/:id",
        element: <UpdateComic />,
      },
      {
        path: "/updateJournal/:id",
        element: <UpdateJournal />,
      },
      {
        path: "/updateBook/:id",
        element: <UpdateBook />,
      },
      {
        path: "/addBook",
        element: <AddBook />,
      },
      {
        path: "/addComic",
        element: <AddComic />,
      }, {
        path: "/addJournal",
        element: <AddJournal />,
      },
    ]
  },
]);
export default router;
