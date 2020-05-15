import NotesHeader from './NotesHeader';
import React, { useState } from 'react';
import '../../styles/NotesScreen.css';
import NotesGrid from './NotesGrid';

const NotesScreen = (props) => {
    const [notes, setNotes] = useState(undefined);
    const [filter, setFilter] = useState(undefined);
    const [editingNote, setEditingNote] = useState(undefined);

    const searchNoteHandler = (title) => {
        setFilter(title);
    };

    const updateNotesHandler = (notes) => {
        setNotes(notes);
    };

    const editHandler = (note) => {
        setEditingNote(note);
    };

    return (
        <div className="NotesScreen">
            <NotesHeader logout={props.logout} searchNote={searchNoteHandler} updateNotes={updateNotesHandler} user={props.user}/>
            <NotesGrid filter={filter} notes={notes} editingNote={editingNote} edit={editHandler} updateNotes={updateNotesHandler} user={props.user}/>
        </div>
    );
}

export default NotesScreen;