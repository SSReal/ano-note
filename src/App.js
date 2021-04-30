import React, {useEffect, useState} from "react"
import './App.css';
import NavBar from "./components/NavBar"
import Content from "./components/Content"
import NoteControls from "./components/NoteControls"

function App() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9000/v1/notes").then(
      (response) => response.json()
    ).then((res) => setNotes(res)).catch((err) => console.log(err));
  }, [])

  return (
    <div className ="App">
      <NavBar />
      <Content  notes = {notes}/>
      <NoteControls notes = {notes} setNotes = {setNotes} />
    </div>
  );
}

export default App;
