import React from "react";
import Note from "./Note"

function Content(props) {
    const NoteComponents = props.notes.map(
        (note, index) => <Note key = {index} heading = {note.heading} text = {note.text} />);
    NoteComponents.reverse(); //to display most recent ones first
    return (
        <div className = "content">
            {/* display the last 9 notes published or no recent notes, if it is empty*/}
            {NoteComponents.length ? 
                NoteComponents : 
                <div className = "no-notes-placeholder"><h3>No recent notes</h3> <p>Create one..?</p></div>
            }
        </div>
    );
}

export default Content;