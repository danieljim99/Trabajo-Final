import {gql, useMutation, useQuery} from "@apollo/client";
import React, { useState } from 'react';
import '../../styles/EditNote.css';
import Colors from './Colors';

const NOTES = gql`
    query notes($username: String!, $token: ID!) {
        notes(username: $username, token: $token) {
            _id
            title
            body
            color {
                r
                g
                b
            }
        }
    }
`;

const EDITNOTE = gql`
    mutation ($username: String!, $token: ID!, $_id: ID!, $title: String!, $body: String!, $r: Int!, $g: Int!, $b: Int!) {
        editNote(username: $username, token: $token, _id: $_id, title: $title, body: $body, r: $r, g: $g, b: $b) {
            _id
        }
    }
`;

const EditNote = (props) => {
    const [mutation] = useMutation(EDITNOTE);

    const [color, setColor] = useState(props.editingNote.color);

    const changeColorHandler = (color) => {
        setColor(color);
    }

    const {loading, data, error, refetch} = useQuery(NOTES, {
        variables: {
            username: props.user.username,
            token: props.user.token
        }
    });

    if(loading) return <div className="Loading">Loading...</div>

    if(error) return <div className="Error">Error... :(</div>

    props.updateNotes(data.notes);

    const editNoteHandler = () => {
        const title = (document.getElementById("titleInput").value) ? document.getElementById("titleInput").value : props.editingNote.title;
        const body = (document.getElementById("bodyInput").value) ? document.getElementById("bodyInput").value : props.editingNote.body;
        const {r, g, b} = color;

        mutation({
            variables: {
                username: props.user.username,
                token: props.user.token,
                _id: props.editingNote._id,
                title: title,
                body: body,
                r: r,
                g: g,
                b: b
            }
        }).then(response => {
            console.log(response);
            refetch().then(fetchResponse => {
                props.edit(undefined);
            });
        });
    };

    return (
        <div className="EditNote" style={{backgroundColor: `rgb(${props.editingNote.color.r}, ${props.editingNote.color.g}, ${props.editingNote.color.b})`}}>
            <input className="TitleInput" id="titleInput" placeholder="New title"/>
            <textarea className="BodyInput" id="bodyInput" placeholder="New body"/>
            <Colors changeColor={changeColorHandler}/>
            <div className="Buttons">
                <button className="AcceptButton" onClick={() => editNoteHandler()}>
                    Accept
                </button>
                <button className="CancelButton" onClick={() => props.edit(undefined)}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EditNote;