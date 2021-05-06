import React, { useState } from "react";
import styled from "styled-components"
import backend_address from "../backend-address";

function Note(props) {
    const [editing, setEditing] = useState(false);

    //these will only be used when editing a note.
    const [heading, setHeading] = useState(props.heading);
    const [text, setText] = useState(props.text);

    const deleteNote = () => {
        fetch(backend_address + "/v2/notes", {
            method: "DELETE",
            body: JSON.stringify({
                heading: props.heading,
                text: props.text
            }),
            headers: {
                "Content-Type":"application/json; charset = UTF-8"
            }
        }).then((res) => res.json()).then((res) => {
            if(res.message === "Marked for Deletion") {
                alert("Refresh to see the results");
            }
        });
    }
    const editNote = () => {
        console.log("edit");
        if(editing) {
            //finish editing, save

        }
        setEditing(!editing);
    }
    return (
        <div className = "note">
            {!editing? 
            <div>
                <h1>{heading}</h1>
                <p>{text}</p>
            </div> :
            <div className = "note-editing">
                <h1 contentEditable onChange = {(event) => {
                    setHeading(event.target.value);
                }}>{heading}</h1>
                <p>{text}</p>
                <input type = "text" value = {heading} onChange = {(event) => {
                    setHeading(event.target.value);
                }}/>
                <textarea value = {text} onChange = {(event) => {
                    setText(event.target.value);
                }}/>
            </div>}
            
            <NoteOptions>
                <Option onClick = {deleteNote}>Delete</Option>
                <Option onClick = {editNote} >Edit</Option>
            </NoteOptions>
        </div>
    );
};


const NoteOptions = styled.div`
    position: relative;
    margin: 10px;
    display:flex;
    opacity: 0;
    justify-content: space-around;

    &:hover {
        opacity: 100%;
    }
`;

const Option = styled.a`
    text-decoration: none;
    font-weight: 600;
    padding: 5px;
    background-color: white;
    box-shadow: 0.5px 0.5px 0.5px 0.5px black;
`;

export default Note;