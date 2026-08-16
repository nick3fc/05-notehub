import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import css from "./App.module.css";

import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import NoteForm from "../NoteForm/NoteForm";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Pagination from "../Pagination/Pagination";
import { fetchNotes, deleteNote } from "../../services/noteService";

// import toast, { Toaster } from "react-hot-toast";

// import SearchBar from "../SearchBar/SearchBar";
// import MovieGrid from "../MovieGrid/MovieGrid";
import Modal from "../Modal/Modal";

// import { getMoviesList } from "..//../services/movieService";

// import type { Movie } from "../../types/movie";
import { useQuery } from "@tanstack/react-query";

// import ReactPaginateModule from "react-paginate";
// import type { ReactPaginateProps } from "react-paginate";
// import type { ComponentType } from "react";

// type ModuleWithDefault<T> = { default: T };

// const ReactPaginate = (
//   ReactPaginateModule as unknown as ModuleWithDefault<
//     ComponentType<ReactPaginateProps>
//   >
// ).default;

export default function App() {
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  // const [movie, setMovie] = useState<Movie | null>(null);

  const queryClient = useQueryClient();
  // const handleSearch = (searchString: string) => {
  //   setQuery(searchString);
  //   setcurrentPage(1);
  // console.log("app received ", searchString);
  // console.log("currentPage:", currentPage);
  // };

  // const itemsList = fetchItems();
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes", query, currentPage],
    queryFn: () => fetchNotes(query, currentPage),
  });
  // console.log("filter:", query);
  // console.log("fetchResponseData:", response?.notes);

  const handleDelete = async (id: string) => {
    await deleteNote(id);

    await queryClient.invalidateQueries({
      queryKey: ["notes"],
    });
  };

  // const handleSelect = (movie: Movie) => {
  //   // console.log("app received movie", movie);
  //   setMovie(movie);
  //   setModalOpen(true);
  // };

  // const handleClose = () => {
  //   // console.log("app movieModal close");
  //   setModalOpen(false);
  //   setMovie(null);
  // };

  // ------------------------------------------------------------

  // function App() {
  //   const { data, isLoading, isError } = useQuery({
  //     queryKey: ["movies"],
  //     queryFn: getMovies,
  //   });

  // useEffect(() => {
  //   if (isSuccess && movies.results.length === 0) {
  //     toast("No movies found for your request.", {
  //       style: {
  //         background: "#f3900e",
  //         color: "#000000",
  //       },
  //       duration: 5000,
  //     });
  //   }
  // }, [isSuccess, movies]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        <SearchBox
          handleSearch={(searchString: string) => setQuery(searchString)}
        />
        {/* Пагінація */}
        {response && response.totalPages > 1 && (
          <Pagination
            pageCount={response.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        {/* Кнопка створення нотатки */}
        <button className={css.button} onClick={() => setModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage />
      ) : (
        response &&
        response?.notes.length > 0 && (
          <NoteList notes={response.notes ?? []} onDelete={handleDelete} />
        )
      )}
      {modalOpen && (
        <Modal onModalClose={() => setModalOpen(false)}>
          <NoteForm closeClick={() => setModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
