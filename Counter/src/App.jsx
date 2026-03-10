import React,{useState} from "react";
import Counter from "./Counter.jsx";

function App(){
  const [counters,setCounters] = useState([0,0,0]);
  const incre = (idx) => {
    const newCounter = [...counters];
    if(newCounter[idx] < 10){
      newCounter[idx]++;
      setCounters(newCounter);
    }
  };
  const decre = (idx) => {
    const newCounter = [...counters];
    if(newCounter[idx] > 0){
      newCounter[idx]--;
      setCounters(newCounter);
    }
  };
  const reset = (idx) => {
    const newCounter = [...counters];
    newCounter[idx] = 0;
    setCounters(newCounter);
  };
  const resetAll = () => {
    setCounters([0,0,0]);
  };
  return(
    <div style={{textAlign : "center"}}>
      <h1>Interactive Counter Dashboard</h1>
      <button onClick={resetAll}>Reset All</button>
      {
        counters.map((count,idx) => (
          <Counter
            key = {idx}
            count ={count}
            onIncre = {()=>incre(idx)}
            onDecre = {()=>decre(idx)}
            onReset = {()=>reset(idx)}
            />
        ))}

    </div>
  );
}
export default App;