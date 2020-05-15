import '../../styles/NoteBody.css';
import React from 'react';

const NoteBody = (props) => {
    return (
        <div className="NoteBody">
            {props.body}
        </div>
    );
};

export default NoteBody;