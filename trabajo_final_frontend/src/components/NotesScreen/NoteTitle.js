import '../../styles/NoteTitle.css';
import React from 'react';

const NoteTitle = (props) => {
    return (
        <div className="NoteTitle">
            {props.title}
        </div>
    );
};

export default NoteTitle;