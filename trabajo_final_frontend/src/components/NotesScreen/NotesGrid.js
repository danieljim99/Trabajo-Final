import {gql, useQuery} from "@apollo/client";
import '../../styles/NotesGrid.css';
import EditNote from './EditNote';
import Note from './Note';
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

const NotesGrid = (props) => {
    const {loading, data, error} = useQuery(NOTES, {
        variables: {
            username: props.user.username,
            token: props.user.token
        }
    });

    if(loading) return <div className="Loading">Loading...</div>

    if(error) return <div className="Error">Error... :(</div>

    props.updateNotes(data.notes);

    if(props.editingNote) {
        return (
            <div className="NotesGrid">
                <EditNote editingNote={props.editingNote} updateNotes={props.updateNotes} edit={props.edit} user={props.user}/>
            </div>
        );
    } else {
        if(props.notes) {
            const notes = props.notes.filter(note => note.title.toUpperCase().includes(props.filter ? props.filter.toUpperCase() : ""));
    
            if(notes.length > 0) {
                return (
                    <div className="NotesGrid">
                        {notes.map(note => {
                            return (
                                <Note note={note} user={props.user} updateNotes={props.updateNotes} edit={props.edit} key={note._id}/>
                            );
                        })}
                    </div>
                );
            } else {
                return (
                    <div className="NoNotes">
                        There are no Notes
                    </div>
                );
            }
        } else {
            return (
                <div className="NoNotes">
                    There are no Notes
                </div>
            );
        }
    }
};

export default NotesGrid;