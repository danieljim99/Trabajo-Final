import '../../styles/Color.css';
import React from 'react';

const Color = (props) => {
    return (
        <div className={props.selectedColor === props.colorNumber ? "ColorSelected" : "Color"} onClick={() => props.changeColor(props.colorNumber, props.r, props.g, props.b)} style={{backgroundColor: `rgb(${props.r}, ${props.g}, ${props.b})`}}/>
    );
};

export default Color;