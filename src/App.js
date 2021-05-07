import React, {useEffect, useState} from "react"
import './App.css';
import NavBar from "./components/NavBar"
import Content from "./components/Content"
import NoteControls from "./components/NoteControls"
import back_address from "./backend-address.js"

function App() {
  const [notes, setNotes] = useState([]);
  const [delId, setDelId] = useState(-1);
  useEffect(() => {
    fetch((back_address + "/v2/notes")).then(
      (response) => {
        return response.json()
      }
    ).then((res) => {
      setNotes(res);
    }).catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if(delId === -1) return null;
    const new_notes = notes.slice();
    new_notes.splice(delId);
    setNotes(new_notes);
    setDelId(-1);
  }, [delId, notes])

  return (
    <div className ="App">
      <NavBar />
      <Content  notes = {notes} setDelId = {setDelId}/>
      <NoteControls notes = {notes} setNotes = {setNotes} />
    </div>
  );
}

export default App;
