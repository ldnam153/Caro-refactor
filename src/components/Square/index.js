import React from 'react';
import '../../index.css';
const Square = ({value, onClick})=> {
    const color = value.highLight ? 'red' : 'white'
    return (
      <button style={{background: color}} className="square" onClick = {onClick}>
        {value.char}
      </button>
    );
  }
export default Square;