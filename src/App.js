import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Box from "./components/Box";
import MoviesList from "./components/MoviesList";
import Loader from "./components/Loader";
import Error from "./components/Error";
import MovieDetails from "./components/MovieDetails";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import { useFetchMovies } from "./hooks/useFetchMovies";
const KEY = "45e0b54c";

const App = () => {
  const [query, setQuery] = useState("");
  const [isSelected, setIsSelected] = useState(null);
  const [watched, setWatched] = useState([]);

  const { movies, error, isLoading } = useFetchMovies(query);

  function handleSelectMovie(id) {
    setIsSelected((prevId) => (id === prevId ? null : id));
  }
  function handeCloseMovie() {
    setIsSelected(null);
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <main className="main">
        <Box>
          {isLoading && <Loader />}
          {error && <Error message={error} />}
          {!isLoading && !error && (
            <MoviesList movies={movies} handleSelect={handleSelectMovie} />
          )}
        </Box>
        <Box>
          {isSelected ? (
            <MovieDetails
              selectedId={isSelected}
              onCloseMovie={handeCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDelete={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </main>
    </>
  );
};

export default App;
