import NotesSearchBar from './NotesSearchBar';
import AddNoteButton from './AddNoteButton';
import LogoutButton from './LogoutButton';
import '../../styles/NotesHeader.css';
import React from 'react';

const NotesHeader = (props) => {
    return (
        <div className="NotesHeader">
            <LogoutButton logout={props.logout} user={props.user}/>
            <NotesSearchBar searchNote={props.searchNote}/>
            <AddNoteButton updateNotes={props.updateNotes} user={props.user}/>
        </div>
    );
};

export default NotesHeader;