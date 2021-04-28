import React, {useState} from "react"
import './App.css';
import NavBar from "./components/NavBar"
import Content from "./components/Content"
import NoteControls from "./components/NoteControls"

function App() {
  const [notes, setNotes] = useState([])
  return (
    <div className ="App">
      <NavBar />
      <Content  notes = {notes}/>
      <NoteControls notes = {notes} setNotes = {setNotes} />
    </div>
  );
}

export default App;
