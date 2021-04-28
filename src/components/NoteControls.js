import React, { useState } from "react"

function NoteControls(props) {
    const [heading, setHeading] = useState("");
    const [text, setText] = useState("");

    function handleChange(event) {
        const {name, value} = event.target;
        if(name === "heading") {
            setHeading(value);
        }
        else if(name === "text") {
            setText(value);
        }
    }

    function createNote(event) {
        event.preventDefault();
        const newNotes = props.notes.slice(); //copy the array
        newNotes.unshift(
            {
                heading: heading,
                text: text
            }
        ) // add the new note to the start of the array
        props.setNotes(newNotes);
        console.log(props.notes)
    }

    return (
        <div className = "note-controls">
            <form>
                <br/>
                <h3>Create a new note:</h3>
                <br/>
                <input 
                    name = "heading" 
                    type = "text" 
                    placeholder = "Heading Text"
                    onChange = {handleChange}
                    value = {heading}
                ></input>
                <br />
                <br />
                <textarea
                    name = "text" 
                    placeholder = "Note Text"
                    onChange = {handleChange}
                    value = {text}
                    rows = {10}
                    cols = {50}
                ></textarea>
                <br />
            </form>
            <button onClick = {createNote}>Create</button>
        </div>
    )
}

export default NoteControls;