import { Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../Details/Details.css";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const chevronLeft = <FontAwesomeIcon icon={faChevronLeft} />;

function Details(props) {
  //const reducerName = useSelector( store => store.reducerName );
  //const [name, setName] =useState ( null );

  const dispatch = useDispatch();
  const history = useHistory();

  const specificMovie = useSelector((store) => store.specificMovie);

  return (
    <Container>
      <Button className="backButton" onClick={history.goBack}>
        <span className="chevronLeft">{chevronLeft}</span>BACK
      </Button>
      <Row>
        {/* history.goBack back to previous page */}
        <Col className="posterCol" xs="12" lg="4">
          <img src={specificMovie.poster} />
        </Col>
        <Col xs="8">
          <Row>
            <p className="detailTitle">{specificMovie.title}</p>
          </Row>
          <Row className="genreRow">
            <div className="genreBox">{specificMovie.genres}</div>
          </Row>
          <Row>
            <p className="detailsDescription">{specificMovie.description}</p>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Details;
