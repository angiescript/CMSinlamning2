import React from "react";
import { useState, useEffect } from "react";

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
    <div>
      <p>Du kanske också är intresserad av:</p>
      {opposites.map((work, i) =>
        work.attributes.genres.data.map((genre) => {
          return (
            genre.attributes.genre === filter && (
              <div key={i}>
                <p>{work.attributes.title}</p>
              </div>
            )
          );
        })
      )}
    </div>
  );
};

export default RenderedOpposites;
