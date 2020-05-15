import {gql, useMutation, useQuery} from "@apollo/client";
import '../../styles/AddNoteButton.css';
import React from 'react';

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

const ADDNOTE = gql`
    mutation ($username: String!, $token: ID!, $title: String!, $body: String!) {
        addNote(username: $username, token: $token, title: $title, body: $body) {
            _id
        }
    }
`;

const AddNoteButton = (props) => {
    const [mutation] = useMutation(ADDNOTE);

    const {loading, data, error, refetch} = useQuery(NOTES, {
        variables: {
            username: props.user.username,
            token: props.user.token
        }
    });

    if(loading) return <div className="Loading">Loading...</div>

    if(error) return <div className="Error">Error... :(</div>

    props.updateNotes(data.notes);

    const addNoteButtonHandler = () => {
        const title = prompt("Introduce the title of the new note", "Title");
        const body = prompt("Introduce the body of the new note", "Body");

        if(title && body) {
            mutation({
                variables: {
                    username: props.user.username,
                    token: props.user.token,
                    title: title,
                    body: body
                }
            }).then(response => {
                console.log(response);
                refetch();
            });
        }
    };

    return(
        <button className="AddNoteButton" onClick={() => addNoteButtonHandler()}>
            New Note
        </button>
    );
};

export default AddNoteButton;