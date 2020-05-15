import NoteTitle from './NoteTitle';
import NoteBody from './NoteBody';
import Buttons from './Buttons';
import '../../styles/Note.css';
import React from 'react';

const Note = (props) => {
    return (
        <div className="Note" style={{backgroundColor: `rgb(${props.note.color.r}, ${props.note.color.g}, ${props.note.color.b})`}}>
            <Buttons user={props.user} note={props.note} updateNotes={props.updateNotes} edit={props.edit}/>
            <NoteTitle title={props.note.title}/>
            <NoteBody body={props.note.body}/>
        </div>
    );
};

export default Note;