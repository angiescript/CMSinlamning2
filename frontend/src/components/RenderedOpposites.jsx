import React from "react";
import { useState, useEffect } from "react";
import book from "../book.png";
import audiobook from "../audiobook.png";
import "../Rendered.css";

const RenderedOpposites = ({ typeChoice, filter }) => {
  const [opposites, setOpposites] = useState([]);

  let fetchOpposite = async (choice) => {
    if (choice === "books") {
      try {
        const resp = await fetch(
          `http://localhost:1337/api/audioBooks?populate=*`
        );
        const fetchedWorks = await resp.json();
        setOpposites(fetchedWorks.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const resp = await fetch(`http://localhost:1337/api/books?populate=*`);
        const fetchedWorks = await resp.json();
        setOpposites(fetchedWorks.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchOpposite(typeChoice);
  }, [typeChoice]);

  return (
    <div className="opposites">
      <p>Verk inom {filter} i andra format:</p>
      <div className="worksGrid">
        {opposites.map((work, i) =>
          work.attributes.genres.data.map((genre) => {
            return (
              genre.attributes.genre === filter && (
                <div key={i} className="worksChild">
                  {work.attributes.length ? (
                    <div className="additionalInfo">
                      <div className="mainDetails">
                        <img className="icon" src={audiobook} alt="audiobook" />
                        <h3>{work.attributes.title}</h3>
                      </div>
                      <div className="subDetails">
                        <p>Release-datum: {work.attributes.released}</p>
                        <p>Längd: {work.attributes.length} min</p>
                        <p>Betyg: {work.attributes.rating}/5</p>
                      </div>
                    </div>
                  ) : (
                    <div className="additionalInfo">
                      <div className="mainDetails">
                        <img className="icon" src={book} alt="book" />
                        <h3>{work.attributes.title}</h3>
                      </div>
                      <div className="subDetails">
                        <p>Författare: {work.attributes.author}</p>
                        <p>Antal sidor: {work.attributes.pages}</p>
                        <p>Betyg: {work.attributes.rating}/5</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            );
          })
        )}
      </div>
    </div>
  );
};

export default RenderedOpposites;
