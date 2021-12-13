import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useHistory } from "react-router-dom";
import { Container, ButtonGroup, Button } from "react-bootstrap";
import "./AddMovie.css";


function AddMovie(props) {
  //const reducerName = useSelector( store => store.reducerName );
  //const [name, setName] =useState ( null );

  const dispatch = useDispatch();
  const history = useHistory();

  const genres = useSelector((store) => store.genres);

  //create a useState hook to store the inputs for the newMovie object
  //this is the object that will be sent to the db
  const [newMovie, setNewMovie] = useState({
    title: "",
    poster: "",
    description: "",
    genre_id: 0, //<-- since genre will be placed into the movies_genres junction table, only the id is needed rather than the name
  });

  const submit = () => {
      dispatch ({
          type: 'SUBMIT_MOVIE',
          payload: newMovie
      })
      history.push('/');
  }

  const cancel = () => {
      history.push('/');
  }


  //use useEffect to dispatch a get req to get all genres from data base
  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
  }, []);

  return (
    <div>
      <Container>
        <h2>Add Movie</h2>
        <form className="addMovieForm">
          <label htmlFor="movieTitle"> Movie title
            <input
              id="movieTitle" onChange={(event) => setNewMovie({ ...newMovie, title: event.target.value })}
            />
          </label>
          <label htmlFor="imageUrl"> Image URL 
            <input
              id="imageUrl" onChange={(event) => setNewMovie({ ...newMovie, poster: event.target.value })}
            />
          </label>
          <label htmlFor="movieDescription"> Movie description
            <textarea
              id="movieDescription" onChange={(event) => setNewMovie({ ...newMovie, description: event.target.value })}
            ></textarea>
          </label>
          <label htmlFor="genreInput">Movie Genre
          <select
            onChange={(event) => setNewMovie({ ...newMovie, genre_id: event.target.value })}
            id="genreInput"
            name="Movie Genre"
          >
            <option>select genre</option>
            {genres.map((genre) => {
              return (
                //onClick, run the details function and passing it the individual movie info that was clicked on
                <option value={genre.id} key={genre.id}>
                  {genre.name}
                </option>
              );
            })}
          </select>
          </label>
          <ButtonGroup className="buttonGroup" vertical>
            <Button className="submitButton" onClick={submit}>Submit</Button>
            <Button className="cancelButton" onClick={cancel}>Cancel</Button>
          </ButtonGroup>
        </form>
      </Container>
    </div>
  );
}

export default AddMovie;
