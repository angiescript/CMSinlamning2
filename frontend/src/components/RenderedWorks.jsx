
const RenderedWorks = ({ works, filter }) => {

  let filterWorks = (works, filter) => {
    if (filter) {
      return works.map((work, i) =>
        work.attributes.genres.data.map((genre) => {
          return (
            genre.attributes.genre === filter && (
              <div key={i}>
                <p>{work.attributes.title}</p>
              </div>
            )
          );
        })
      );
    } else {
      return works.map((work, i) => (
        <div key={i}>
          <p>{work.attributes.title}</p>
        </div>
      ));
    }
  };

  return <div>{filterWorks(works, filter)}</div>;
};

export default RenderedWorks;
