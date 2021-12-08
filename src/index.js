import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('GET_SPECIFIC_MOVIE', getSpecificMovie);
    yield takeEvery('FETCH_GENRES', getGenres);
    yield takeEvery('SUBMIT_MOVIE', submitMovie);
}

//generator function that performs that axios post req for the new movie information  
function *submitMovie(action){
    console.log('-->in submitMovie', action.payload);
    try {
        yield axios.post('/api/movie', action.payload);
    }
    catch (error) {
        console.log('ERROR in addMovie post', error);
    }
}


function *getGenres(action){
    console.log( 'in getGenres', action.payload );
    try{
        const response = yield axios.get( `/api/genre`);
        yield put( {
            type: 'SET_GENRES',
            payload: response.data 
        })
    }catch( err ){
        alert( 'no' );
        console.log( err );
    }
}//end getGenres

//create a getSpecificMovie generator function 
function *getSpecificMovie(action){
    console.log( 'in getSpecificMovie:', action.payload ); 
    try{
        //create a variable called response to hold the value of what the get req gets back from the server
        const response = yield axios.get( `/api/movie/${action.payload}` );// <-- action.payload is the movie.id passed from MovieList
        console.log( 'back from SPECIFIC get:', response.data );
        // use a "put" to dispatch for sagas
        //SET means go from the saga to the reducer
        //save the response from the get req to a reducer with the type of SET_SPECIFIC_MOVIE 
        yield put( { type: 'SET_SPECIFIC_MOVIE', payload: response.data[0] } ); // <--[0] is because we're getting an array with one item
      } catch( err ){
        alert( 'no' );
        console.log( err );
      }
}//end getSpecificMovie

// create a reducer to store the specific movie returned from the server (dispatched from getSpecificMovie)
const specificMovie = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SPECIFIC_MOVIE':
            console.log("specific movies reducer", action.payload);
            return action.payload;
        default:
            return state;
    }
}


function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            console.log("movies reducer", action.payload)
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
        console.log('SET_GENRES', action.payload)
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        specificMovie
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
