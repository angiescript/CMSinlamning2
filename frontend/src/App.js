import './App.css';
import { useState, useEffect } from "react";  

function App() {

  const [typeChoice, setTypeChoice] = useState("");
  const [works, setWorks] = useState([]);
  
  let fetchWorks = async (choice) => {
    try {
      const resp = await fetch(`http://localhost:1337/api/${choice}`);
      const fetchedWorks = await resp.json();
      setWorks(fetchedWorks.data);
    } catch (err) {
      console.error(err)
    }
  }
  
  const handleBookSubmit = (e) => {
    e.preventDefault();
    console.log("Handle book!")
  }
  
  const handleAudiobookSubmit = (e) => {
    e.preventDefault();
    console.log("Handle audio!")
  }
  
/*   useEffect(() => {
       fetchWorks(typeChoice)
  }, []) */

  return (
    <div className="App">
      <p>Vad vill du lista?</p>
        <button onClick={handleBookSubmit}>Böcker</button>
        <button onClick={handleAudiobookSubmit}>Ljudböcker</button>
    </div>
  );
}

export default App;
