import Game from './components/Game'
import ReactDOM from 'react-dom';
import { useState } from 'react';
// ========================================

const App = ()=>{
  const [size, setSize] = useState(-1)
  const [error, setError] = useState("")
  const ChooseSizeMode = ()=>{
    return (
      <form onSubmit = {(e)=>{
        const s = +e.target[0].value;
        if (s >= 5)
          setSize(s);
        else {
          setError("Min size: 5x5");
        } 
          e.preventDefault();
        }}>
        <label>
            Enter size of board: 
        </label>
          <input type="number"  name="size" />
          <button>Enter</button>
          <div style = {{color: 'red'}}>{error}</div>
      </form>
    );
  }
  return (
    size !== -1 ? <Game row = {size} col = {size} onClick = {()=>{setSize(-1)}}/>
      : 
      <ChooseSizeMode/>
    )
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
  );