import React from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router";

function AddMovieButton() {
  const history = useHistory();

  const addMovie = () => {
    history.push("/addmovie");
  };

  return (
    <Button className="addMovieButton" onClick={addMovie}>
      Add Movie
    </Button>
  );
}

export default AddMovieButton;
