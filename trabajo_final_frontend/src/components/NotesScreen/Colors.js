import React, { useState } from 'react';
import '../../styles/Colors.css';
import Color from './Color';

const Colors = (props) => {
    const [selectedColor, setSelectedColor] = useState(0);

    const changeColorHandler = (color, r, g, b) => {
        setSelectedColor(color);
        props.changeColor({r, g, b});
    };

    return (
        <div className="Colors">
            <Color selectedColor={selectedColor} changeColor={changeColorHandler} r={255} g={255} b={255} colorNumber={0}/>
            <Color selectedColor={selectedColor} changeColor={changeColorHandler} r={245} g={183} b={177} colorNumber={1}/>
            <Color selectedColor={selectedColor} changeColor={changeColorHandler} r={252} g={243} b={207} colorNumber={2}/>
            <Color selectedColor={selectedColor} changeColor={changeColorHandler} r={235} g={222} b={240} colorNumber={3}/>
            <Color selectedColor={selectedColor} changeColor={changeColorHandler} r={171} g={235} b={198} colorNumber={4}/>
            <Color selectedColor={selectedColor} changeColor={changeColorHandler} r={250} g={215} b={100} colorNumber={5}/>
            <Color selectedColor={selectedColor} changeColor={changeColorHandler} r={214} g={234} b={248} colorNumber={6}/>
        </div>
    );
};

export default Colors;