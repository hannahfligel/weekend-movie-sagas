import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useHistory } from "react-router-dom";

function Details(props) {
  //const reducerName = useSelector( store => store.reducerName );
  //const [name, setName] =useState ( null );

  const dispatch = useDispatch();
  const history = useHistory();

  const specificMovie = useSelector(store => store.specificMovie);

  return (
    <div>
      <h1>Details</h1>
      {/* history.goBack back to previous page */}
      <button onClick={history.goBack}>Back to list</button>
      <p>{specificMovie.title}</p>
      <img src={specificMovie.poster}/>
      <p>{specificMovie.description}</p>
    </div>
  );
}

export default Details;
