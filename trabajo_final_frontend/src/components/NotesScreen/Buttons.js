import RemoveButton from './RemoveButton';
import EditButton from './EditButton';
import '../../styles/Buttons.css';
import React from 'react';

const Buttons = (props) => {
    return(
        <div className="Buttons">
            <EditButton user={props.user} note={props.note} updateNotes={props.updateNotes} edit={props.edit}/>
            <RemoveButton user={props.user} note={props.note} updateNotes={props.updateNotes}/>
        </div>
    );
};

export default Buttons;