import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AddMovie(props) {
  //const reducerName = useSelector( store => store.reducerName );
  //const [name, setName] =useState ( null );

  const dispatch = useDispatch();

  const genres = useSelector((store) => store.genres);

  //use useEffect to dispatch a get req to get all genres from data base
  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
  }, []);

  return (
    <div>
      <h1>AddMovie</h1>
      <input placeholder="movie title"></input>
      <input placeholder="image url"></input>
      <textarea placeholder="movie description"></textarea>

      <label htmlFor="genreInput">Movie Genre</label>
      <select id="genreInput" name="Movie Genre">
        <option>Select genre</option>
        {genres.map((genre) => {
          return (
            //onClick, run the details function and passing it the individual movie info that was clicked on
            <option value={genre.id}>{genre.name}</option>
          );
        })}
      </select>
    </div>
  );
}

export default AddMovie;
