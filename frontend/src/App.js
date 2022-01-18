import "./App.css";
import logo from "./logo.png";
import { useState, useEffect } from "react";
import RenderedWorks from "./components/RenderedWorks";
import RenderedOpposites from "./components/RenderedOpposites";

function App() {
  const [typeChoice, setTypeChoice] = useState("");
  const [works, setWorks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchWorks = async (choice) => {
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

  const fetchGenres = async () => {
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
      fetchGenres();
    }
  }, [typeChoice]);

  return (
    <div className="App">
      <header className="App-header">
        <img className="logo-header" src={logo} alt="logo" />
        <h1>Bibliotekssök</h1>
      </header>

      <div className="content">
        <div className="bookOrAudio">
          {!typeChoice ? (
            <p className="originQuestion">Vad vill du visa?</p>
          ) : (
            <></>
          )}

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

        <div className="mainFlexbox">
          {typeChoice && (
            <div className="filteringOptions">
              <select onChange={handleGenre}>
                <option value="*">Välj genre</option>
                {genres.map((genre, i) => (
                  <option key={i} value={genre.attributes.genre}>
                    {genre.attributes.genre}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="results">
            {typeChoice ? (
              <div>
                {!filter ? (
                  <p>Visar samtliga resultat:</p>
                ) : (
                  <div>
                    {filter !== "*" ? (
                      <p>Visar verk inom {filter}:</p>
                    ) : (
                      <p>Visar samtliga resultat:</p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <p>Vänligen välj om du vill visa upp böcker eller ljudböcker.</p>
            )}

            <RenderedWorks works={works} filter={filter} />
            {filter && (
              <RenderedOpposites typeChoice={typeChoice} filter={filter} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
