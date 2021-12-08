import React, { useEffect } from 'react';
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useNavigate, useHistory } from 'react-router-dom';




function MovieList() {

    const dispatch = useDispatch();
    const history = useHistory(); 

    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const details = (movie) => {
        // navigate to /details page
        history.push('/details');
                // pass down movie id to details and then perform a get request with the id as a search
        dispatch({type: 'GET_SPECIFIC_MOVIE', payload: movie.id});
    }

    const addMovie = () => {
        history.push("/addmovie");
    }

    return (
        <main>
            <h1>MovieList</h1>
            <button onClick={addMovie}>add movie</button>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        //onClick, run the details function and passing it the individual movie info that was clicked on 
                        <div key={movie.id} >
                                <h3>{movie.title}</h3>
                                <img onClick={() => details(movie)} src={movie.poster} alt={movie.title}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;