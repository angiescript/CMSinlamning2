import "./App.css";
import { useState, useEffect } from "react";
import RenderedWorks from "./components/RenderedWorks";
import RenderedOpposites from "./components/RenderedOpposites";

function App() {
  const [typeChoice, setTypeChoice] = useState("");
  const [works, setWorks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filter, setFilter] = useState("");

  let fetchWorks = async (choice) => {
    try {
      const resp = await fetch(
        `http://localhost:1337/api/${choice}?populate=*`
      );
      const fetchedWorks = await resp.json();
      setWorks(fetchedWorks.data);
    } catch (err) {
      console.error(err);
    }
  };

  let fetchGenres = async () => {
    try {
      const resp = await fetch("http://localhost:1337/api/genres");
      const fetchedGenres = await resp.json();
      setGenres(fetchedGenres.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChoice = (e) => {
    e.preventDefault();
    setTypeChoice(e.target.value);
  };

  const handleGenre = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  useEffect(() => {
    if (typeChoice) {
      fetchWorks(typeChoice);
    }
  }, [typeChoice]);

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <div className="App">
      <div className="bookOrAudio">
        <p>Vad vill du visa?</p>

        <button onClick={handleChoice} className="choiceButton" value="books">
          Böcker
        </button>

        <button
          onClick={handleChoice}
          className="choiceButton"
          value="audioBooks"
        >
          Ljudböcker
        </button>
      </div>

      <div className="filteringOptions">
        <select onChange={handleGenre}>
          <option>Pick a genre...</option>
          {genres.map((genre, i) => (
            <option key={i} value={genre.attributes.genre}>
              {genre.attributes.genre}
            </option>
          ))}
        </select>
      </div>

      <div className="mainContent">
        <RenderedWorks works={works} filter={filter} />
        {filter && (
          <RenderedOpposites typeChoice={typeChoice} filter={filter} />
        )}
      </div>
    </div>
  );
}

export default App;
