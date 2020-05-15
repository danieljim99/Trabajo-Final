import '../../styles/NotesSearchBar.css';
import React from 'react';

const NotesSearchBar = (props) => {
    const takeInput = (id) => {
        props.searchNote(document.getElementById(id).value);
    };

    return (
        <div className="NotesSearchBar">
            <input className="NotesSearchInput" id="notesSearchInput" type="text" placeholder="Search Note" onChange={() => takeInput("notesSearchInput")}/>
        </div>
    );
};

export default NotesSearchBar;