import React from 'react';
import '../../index.css';
import Square from '../Square';

const Board = ({row, col, onClick, board})=> {
    const renderSquare = (i, j) => {
        return <Square 
                  i = {i}
                  j = {j}
                  key={i+j}
                  onClick = {()=>onClick(i, j)} 
                  value={board[i][j]}
              />;
      }
    const  renderBoard = (numRow, numCol)=>{
          const res = []
          for(var row = 0; row < numRow; row++)
              res.push(renderRow(row, numCol))
          return (
              <div>
                   {res.map((item, index) => (item))}
              </div>
          )
      }
    const renderRow = (row, numCol) =>{
          const res = []
          for(var col = 0; col < numCol; col++) {
              res.push(renderSquare(row, col));
          }
          return (
              <div className="board-row" key={row}>
                  {res.map((item, index) => (item))}
              </div>
          );
      }


    return (
        <div>
            {renderBoard(row, col)}
        </div>
        
    );
  }
export default Board;