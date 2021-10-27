import React, { useState } from 'react';

import '../../index.css';
import Board from '../Board';
import calculateWinner from '../utils/helper'

const Game = ({row, col, onClick}) => {
  const [board, setBoard] = useState(new Array(row).fill({char: null, highLight: false}).map(() => new Array(col).fill({char: null, highLight: false})));
  const [history, setHistory] = useState([{step: 0,i: 0, j: 0, char: {char: null, highLight: false}, xIsNext: true}]);
  const [ended, setEnded] = useState(false);
  const [current, setCurrent] = useState(0);
  const [asc, setAsc] = useState(true);
  const [resultMessage, setResultMessage] = useState("");
 
  const handleClick = (i, j)=> {
    if (ended)
      return;
    const newBoard = board; 
    if (newBoard[i][j].char!=null)
      return;
    var newHistory = history;
    var xIsNext = newHistory[current].xIsNext;
    if (!asc)
      xIsNext = newHistory[newHistory.length-1 - current].xIsNext;
    const char = xIsNext ? {char: "X", highLight: false} : {char: "O", highLight: false};

    newBoard[i][j] = char;
    for(var k = history.length - 1; k >=0; k--)
      if (newHistory[k].step > current)
      newHistory.splice(k, 1);
    newHistory = newHistory.slice(0, current + 1);
    if (asc)
      newHistory.push({step: current+1,i, j, char, xIsNext: !xIsNext});
    else
      newHistory.unshift({step: current+1,i, j, char, xIsNext: !xIsNext});
   
    
    
    setBoard(newBoard);
    setHistory(newHistory);
    setCurrent(current+1);
    
    const res = calculateWinner(newBoard, i, j, char.char) 
    if (res != null)
      {
        res.forEach(e => {
          newBoard[e.i][e.j].highLight = true;
        });
        setBoard(newBoard);
        setEnded(true);
        setResultMessage("Winner: Player " + char.char);
       
      }
    else{
        if (newHistory.length-1 >= row * col)
        {
          setEnded(true);
          setResultMessage("Draw game");

        }
        else{
          setEnded(false);
          setResultMessage("");
        }
    }
    
  }
  const jumpTo = (step)=>{
    if (step === current)
      return;
    const newBoard = board; 
    var curMove = null;
    const newHistory = history;
    for(var i = 0; i < newHistory.length; i++){
      if (newHistory[i].step <= step){
          if(newHistory[i].step !== 0){
            newHistory[i].char.highLight = false;
            newBoard[newHistory[i].i][newHistory[i].j] = newHistory[i].char;
          }
        
      }
      else
        newBoard[newHistory[i].i][newHistory[i].j] = {char: null, highLight: false};
        if (newHistory[i].step === step)
          curMove = newHistory[i]
    }
    setBoard(newBoard);
    setHistory(newHistory);
    setCurrent(step);
    const res = calculateWinner(newBoard, curMove.i, curMove.j, curMove.char.char) 

    if (res != null)
      {
        res.forEach(e => {
          newBoard[e.i][e.j].highLight = true;
        });
        setBoard(newBoard);
        setEnded(true);
        setResultMessage("Winner: Player " + curMove.char.char);
      }
    else{
      if (step >= row * col){
        setEnded(true);
        setResultMessage("Draw game");
      }
      else
      {
        setEnded(false);
        setResultMessage("");
      }
    }
      

  }
  const sort = (asc)=>{
  
    var newHistory = history;
    newHistory = newHistory.sort((a, b) => {
      if (asc)
        return a.step - b.step;
      return  b.step - a.step;
    })
  
    //history = history.reverse();
    setHistory(newHistory);
    setAsc(asc);
  }
  var curPlayer = "";
  const moves = history.map((step, move) => {
    const charLocated = step.char.char
    const desc = step.step !== 0 ? charLocated + ' in (' + step.i + ',' +step.j+ ')' :'Go to game start';
    const color = step.step === current ? 'red' : 'white' 
    if (step.step === current)
        curPlayer = step.xIsNext ? 'X' : 'O';
      return (
        <div key = {move} style = {{display: 'flex', padding: "5px"}}>
          <div style = {{width: '90px'}}>
              {step.step !== 0 ? 'Step '+ step.step + '. ' : ''}
            </div>
          <div key={step.step} style = {{display: 'flex'}}>
            <button style={{background: color, width: '150px', }} onClick={() => jumpTo(step.step)}>{desc}</button>
          </div>
        </div>
        
      );
    });


  return (
    <div >
      <div style={{marginBottom: '20px', fontSize: '20px', alignSelf:'center'}}>
        Lý Duy Nam - 18127159 - BTCN02 - Caro refactor
      </div>
      <div>
          <button style = {{marginBottom: 10}} onClick = {onClick}>
              Quay về
          </button>
      </div>
      <div className="game" >
        <div className="game-board">
          <Board 
              board={board}
              row={row} 
              col = {col}
              onClick={(i, j) => handleClick(i, j)}
          />
        </div>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <div className="game-info" >
            {ended?null:<div>Next Player: {curPlayer}</div>}
            <div className="scroll-view">{moves}</div>
            <div style={{fontSize: '20px', fontWeight: 'bold'}}>{resultMessage}</div>
          </div>
          <div className="game-info" >
            <div>Sort the moves</div>
            <div>
                <div>
                  <input 
                    type="radio" 
                    id="Ascending" 
                    checked={asc} 
                    name="rad" 
                    value="0"
                    onChange = {()=>{sort(true)}} />
                  <label >Ascending </label>
                </div>
                <div>
                  <input 
                    type="radio" 
                    id="Descending" 
                    checked={!asc} 
                    name="rad" 
                    value="1" 
                    onChange = {()=>{sort(false)}} />
                  <label >Descending </label>
                </div>
                
            </div>
          </div>
        </div>
        
      </div>
    </div>);
}


export default Game;