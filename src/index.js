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
}

function *getSpecificMovie(action){
    console.log( 'in getSpecificMovie:', action.payload );
    try{
        const response = yield axios.get( `/api/movie/${action.payload}` );
        console.log( 'back from SPECIFIC get:', response.data );
        // use a "put" to dispatch for sagas
        //SET means go from the saga to the reducer 
        yield put( { type: 'SET_SPECIFIC_MOVIE', payload: response.data[0] } );
      } catch( err ){
        alert( 'no' );
        console.log( err );
      }
}//end getSpecificMovie


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

// Used to store movies returned from the server
const specificMovie = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SPECIFIC_MOVIE':
            console.log("specific movies reducer", action.payload);
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
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
