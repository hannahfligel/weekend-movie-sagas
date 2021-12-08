import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useHistory } from "react-router-dom";

function Details(props) {
  //const reducerName = useSelector( store => store.reducerName );
  //const [name, setName] =useState ( null );

  const dispatch = useDispatch();
  const history = useHistory();

  const movies = useSelector(store => store.movies);

//   const movies = useSelector((store) => store.movies);

//   useEffect(() => {
//     dispatch({ type: "FETCH_MOVIES" });
//   }, []);

//   const back = () => {
//     history.push("/");
//   };

  return (
    <div>
      <h1>Details</h1>
      {/* history.goBack back to previous page */}
      <button onClick={history.goBack}>Back to list</button>
      {/* <section className="movies">
        {movies.map((movie) => {
          return (
            <div key={movie.id}>
              <h3>{movie.title}</h3>
              <ul>
                <li>{movie.description}</li>
              </ul>
            </div>
          );
        })}
      </section> */}
    </div>
  );
}

export default Details;
