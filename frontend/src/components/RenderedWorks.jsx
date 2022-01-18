import React from "react";
import book from "../book.png";
import audiobook from "../audiobook.png";
import "../Rendered.css";

const RenderedWorks = ({ works, filter }) => {
  let filterWorks = (works, filter) => {
    if (filter && filter !== "*") {
      return works.map((work, i) =>
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
      );
    } else {
      return works.map((work, i) => (
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
          <div className="additionalInfo"></div>
        </div>
      ));
    }
  };

  return <div className="worksGrid">{filterWorks(works, filter)}</div>;
};

export default RenderedWorks;
