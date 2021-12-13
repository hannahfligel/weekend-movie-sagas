import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import MovieList from "../MovieList/MovieList";
import Details from "../Details/Details";
import AddMovie from "../AddMovie/AddMovie";
import Button from "react-bootstrap/Button";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";

function App() {
  const history = useHistory();

  return (
    <div className="App">
      <Router>
        <Header />
        <Route path="/" exact>
          <MovieList />
        </Route>

        {/* Details page */}
        <Route path="/details">
          <Details />
        </Route>

        <Route path="/addmovie">
          <AddMovie />
        </Route>

        {/* Add Movie page */}
      </Router>

      <footer className="footer">
        © 2021 ALL RIGHTS RESERVED BY HANNAH FLIGEL
      </footer>
    </div>
  );
}

export default App;
