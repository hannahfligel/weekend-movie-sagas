import React from "react";
import Button from "react-bootstrap/Button";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App/App.css";
import { useNavigate, useHistory } from "react-router-dom";
import AddMovieButton from "../AddMovieButton/AddMovieButton";
import MovieList from "../MovieList/MovieList";

function Header() {
  const filmIcon = <FontAwesomeIcon icon={faFilm} />;

  const history = useHistory();

  const movielist = () => {
    history.push("/");
  };

  return (
    <header className="App-header">
      <h1 onClick={movielist}>
        <span className="filmIcon">{filmIcon}</span>The Movies Saga
      </h1>
      <AddMovieButton />
    </header>
  );
}

export default Header;
