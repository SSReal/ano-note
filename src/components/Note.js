import React, { useState } from "react";
import styled from "styled-components"
import backend_address from "../backend-address";

function Note(props) {
    const [editing, setEditing] = useState(false);

    const [heading, setHeading] = useState(props.heading);
    const [text, setText] = useState(props.text);

    //used to store the unedited note
    const  [oldNote, setOldNote] = useState({
        heading: heading,
        text: text
    });

    const deleteNote = () => {
        fetch(backend_address + "/v2/notes", {
            method: "DELETE",
            body: JSON.stringify({
                heading: heading,
                text: text
            }),
            headers: {
                "Content-Type":"application/json; charset = UTF-8"
            }
        }).then((res) => res.json()).then((res) => {
            if(res.message === "Marked for Deletion") {
                props.setDelId(props.index); //set the delete index to its index
            }
        });
    }
    const editNote = () => {
        console.log("edit");
        if(editing) {
            //finish editing, save
            fetch(backend_address + "/v2/notes/update", {
                method: "POST",
                body: JSON.stringify({
                    old: oldNote,
                    new: {
                        heading: heading,
                        text: text
                    }
                }),
                headers : {
                    "Content-Type" : "application/json; charset = UTF-8"
                }
            }).catch((err) => {console.log(err)})
                .then((res) => res.json())
                .then((res) => {
                    if(res.message === "Updated") {
                        alert("Changes saved successfully");
                    }
                })
        }
        else {
            //start editing
            setOldNote({
                heading: heading,
                text: text
            });
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
                <input type = "text" value = {heading} onChange = {(event) => {
                    setHeading(event.target.value);
                }}/>
                <textarea value = {text} onChange = {(event) => {
                    setText(event.target.value);
                }}/>
            </div>}
            
            <NoteOptions>
                {(!editing) && <Option onClick = {deleteNote}>Delete</Option>}
                <Option onClick = {editNote} >{(!editing)?"Edit":"Save Changes"}</Option>
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
    justify-self: flex-end;

    &:hover {
        opacity: 100%;
    }

    @media only screen and (max-width: 560px) {
        & {
            opacity: 100%;
        }
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