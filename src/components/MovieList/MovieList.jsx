import React, { useEffect } from 'react';
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useNavigate, useHistory } from 'react-router-dom';



function MovieList() {

    const dispatch = useDispatch();
    const history = useHistory(); 

    //bring in all movies from store 
    const movies = useSelector(store => store.movies);

    //use useEffect to dispatch a get req to get all movies from data base 
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    //create a details function that takes in the clicked on movie as an argument 
    const details = (movie) => {
        // navigate to /details page
        history.push('/details');
        //Dispatch GET_SPECIFIC_MOVIE to get a specific movie from the database using the movie's id and save it to the store 
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