import React from "react";

function Counter({ count, onIncre,onDecre,onReset}){
    return(
        <div style = {{margin:"20px",border:"1px solid gray",padding: "20px"}}>
            <h2>{count}</h2>
            <button onClick = {onIncre} disabled = {count=== 10}>
                increment
            </button>
            <button onClick = {onDecre} disabled={count===0}>
                decrement
            </button>
            <button onClick = {onReset}>
                Reset
            </button>
        </div>
    );
}
export default Counter;