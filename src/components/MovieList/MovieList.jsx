import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./MovieList.css";
import { useNavigate, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import MovieItem from "../MovieItem/MovieItem";
import { Container } from "react-bootstrap";

function MovieList() {
  const dispatch = useDispatch();
  const history = useHistory();

  //bring in all movies from store
  const movies = useSelector((store) => store.movies);

  //use useEffect to dispatch a get req to get all movies from data base
  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
  }, []);

  //   const addMovie = () => {
  //     history.push("/addmovie");
  //   };

  return (
    <main>
      <Container>
        <h2>Movies</h2>

        {/* <Button onClick={addMovie}>add movie</Button> */}
        <section className="movies">
          {movies.map((movie) => {
            return (
              //onClick, run the details function and passing it the individual movie info that was clicked on
              <MovieItem movie={movie} key={movie.id} />
            );
          })}
        </section>
      </Container>
    </main>
  );
}

export default MovieList;
