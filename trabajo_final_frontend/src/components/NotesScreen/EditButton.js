import '../../styles/EditButton.css';
import React from 'react';

const EditButton = (props) => {
    return (
        <button className="EditButton" onClick={() => props.edit(props.note)}>
            Edit
        </button>
    );
};

export default EditButton;