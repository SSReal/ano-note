import React from "react";
import Note from "./Note"

function Content(props) {
    const NoteComponents = props.notes.map(
        (note, index) => <Note key = {index} heading = {note.heading} text = {note.text} />);
    return (
        <div className = "content">
            {/* display the last 9 notes published or no recent notes, if it is empty*/}
            {NoteComponents.length ? 
                NoteComponents.slice(0,9) : 
                <div className = "no-notes-placeholder"><h3>No recent notes</h3> <p>Create one..?</p></div>
            }
        </div>
    );
}

export default Content;