import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AddMovie(props) {
  //const reducerName = useSelector( store => store.reducerName );
  //const [name, setName] =useState ( null );

  const dispatch = useDispatch();

  const genres = useSelector((store) => store.genres);

  //create a useState hook to store the inputs for the newMovie object
  //this is the object that will be sent to the db
  const [newMovie, setNewMovie] = useState({
    title: "",
    poster: "",
    description: "",
    genre: 0, //<-- since genre will be placed into the movies_genres junction table, only the id is needed rather than the name
  });

  //use useEffect to dispatch a get req to get all genres from data base
  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
  }, []);

  return (
    <div>
      <h1>AddMovie</h1>
      <input
        onChange={(event) => setNewMovie({ title: event.target.value })}
        placeholder="movie title"
      ></input>
      <input
        onChange={(event) => setNewMovie({ poster: event.target.value })}
        placeholder="image url"
      ></input>
      <textarea
        onChange={(event) => setNewMovie({ description: event.target.value })}
        placeholder="movie description"
      ></textarea>
      <label htmlFor="genreInput">Movie Genre</label>
      <select
        onChange={(event) => setNewMovie({ genre: event.target.value })}
        id="genreInput"
        name="Movie Genre"
      >
        <option>Select genre</option>
        {genres.map((genre) => {
          return (
            //onClick, run the details function and passing it the individual movie info that was clicked on
            <option value={genre.id} key={genre.id}>
              {genre.name}
            </option>
          );
        })}
      </select>
      <button>Save</button>
      <button>Cancel</button>
    </div>
  );
}

export default AddMovie;
