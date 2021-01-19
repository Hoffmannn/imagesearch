import "./App.css";
import { useState } from "react";
import { Container, Form, Button, Spinner, Image } from "react-bootstrap";

function App() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const apiKey = "0wbjg49v60jcE_30i5EUxNuNvtMKD-ADwIxn-c4ZkYw";

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    fetch(
      `https://api.unsplash.com/search/photos/?client_id=${apiKey}&query=${search}`
    )
      .then((res) => res.json())
      .then((result) => {
        setImage(result.results[0].urls.small);
        setLoading(false);
      });
  }

  function handleSearchRandom(e) {
    e.preventDefault();
    setLoading(true);
    fetch(`https://api.unsplash.com/photos/random/?client_id=${apiKey}`)
      .then((res) => res.json())
      .then((result) => {
        setImage(result.urls.small);
        setLoading(false);
      });
  }
  return (
    <div className="App">
      <h1>Search an image!</h1>
      <p>
        made by <a href="https://github.com/Hoffmannn">Lucas Hoffmann</a>
      </p>
      <Container>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="'Pretty mountains'"
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSearch}>
            Search
          </Button>

          <Button variant="primary" type="submit" onClick={handleSearchRandom}>
            Search Random
          </Button>
        </Form>
        <div className="imageArea">
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <Image src={image} rounded fluid />
          )}
        </div>
      </Container>
    </div>
  );
}

export default App;
