import React, {useEffect, useState} from "react"
import './App.css';
import NavBar from "./components/NavBar"
import Content from "./components/Content"
import NoteControls from "./components/NoteControls"
import back_address from "./backend-address.js"

function App() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch((back_address + "/v2/notes")).then(
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
