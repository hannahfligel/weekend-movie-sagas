import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AddMovie( props ){
    //const reducerName = useSelector( store => store.reducerName );
    //const [name, setName] =useState ( null );

    const dispatch = useDispatch();


// - an input field (for the movie title)
// - an input field (for the movie poster image URL))
// - a textarea (for the movie description)
// - a dropdown (for the genres)

    return(
        <div>
            <h1>AddMovie</h1>
            <input placeholder="movie title"></input>
            <input placeholder="image url"></input>
            <textarea placeholder="movie description"></textarea>
        </div>
    )
}

export default AddMovie;