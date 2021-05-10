import React, { useState } from "react"
import back_address from "../backend-address.js"

function NoteControls(props) {
    const [heading, setHeading] = useState("");
    const [text, setText] = useState("");
    const [read_only, setReadOnly] = useState(false);

    function handleChange(event) {
        const {name, value} = event.target;
        if(name === "heading") {
            setHeading(value);
        }
        else if(name === "text") {
            setText(value);
        }
    }

    function handleCheckBox(event) {
        setReadOnly(!read_only);
    }

    function createNote(event) {
        event.preventDefault();
        const newNotes = props.notes.slice(); //copy the array
        newNotes.push(
            {
                heading: heading,
                text: text,
                read_only: read_only
            }
        ) // add the new note to the start of the array
        props.setNotes(newNotes);
        //add the new note to the server copy
        fetch((back_address + "/v2/notes"), {
            method: 'POST',
            body: JSON.stringify({heading: heading, text:text, read_only: read_only}),
            headers: {
                'Content-type': 'application/json; charset = UTF-8'
            }
        }).then(response => response.json())
        .then(res => {
            console.log(res);
        }).catch((err) => console.log(err));
        setHeading("");
        setText("");
        setReadOnly(false);
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
                ></textarea>
                <br />
                <label>
                <input name = "isreadonly" onChange = {handleCheckBox} checked = {read_only} type = "checkbox" /> Read-Only?
                </label>
                <br />
                {read_only && <p><b>Note:</b> This note once created cannot be deleted or edited</p>}
                <br/>
            </form>
            <button onClick = {createNote}>Create</button>
        </div>
    )
}

export default NoteControls;