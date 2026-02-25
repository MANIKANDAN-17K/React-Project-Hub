import { useState,useEffect,useRef } from "react";
import "./App.css";

function StatBadge({label,value,color}){
  return(
    <div className={`stat-badge stat-badge--${color}`}>
          <div className="stat-badge__value">{value}</div>
          <div className="stat-badge__label">{label}</div>
        </div>
  );
}

function CoinFace({result}){
  if(result === null) return <span className="coin-emoji">🪙</span>;
  if (result === "Heads") return <span className="coin-emoji">👑</span>;
  return <span className="coin-emoji">🦅</span>;
}

function HistoryLog({history}){
  const bottomRef = useRef(null);
  useEffect(() => {
    if(bottomRef.current){
      bottomRef.current.scrollIntoView({behavior:"smooth"});
    }

  },[history]);
  if(history.length === 0){
    return <div className="history__empty">No flips yet. Hit the button!</div>;
  }
  return(
  <div className="history__list">
        {/* STEP 1 → JSX: key= is required when rendering lists */}
        {history.map((flip, index) => (
          <div
            key={index}
            className={`history__item history__item--${flip.result.toLowerCase()}`}
          >
            <span className="history__index">#{index + 1}</span>
            <span className="history__result">
              {flip.result === "Heads" ? "👑" : "🦅"} {flip.result}
            </span>
            <span className="history__time">{flip.time}</span>
          </div>
        ))}
        {/* STEP 7 → useRef: attach ref to this invisible div at the bottom */}
        <div ref={bottomRef} />
      </div>  
  );
}

export default function App(){
    const [result, setResult]       = useState(null);
    const [isFlipping, setIsFlipping] = useState(false);
    const [heads, setHeads]         = useState(0);
    const [tails, setTails]         = useState(0);
    const [history, setHistory]     = useState([]);
    const [streak, setStreak]       = useState({ side: null, count: 0 });

    const flipCoin = () => {
        if (isFlipping) return; // Guard: ignore clicks mid-flip
    
        setIsFlipping(true);
        setResult(null);
    
        // setTimeout simulates the coin flying in the air (600ms delay)
        setTimeout(() => {
          const flip = Math.random() < 0.5 ? "Heads" : "Tails";
          const now = new Date().toLocaleTimeString();
    
          setResult(flip);
          setIsFlipping(false);
    
          // STEP 3 → Safe way to update state based on previous value:
          // pass a function to the setter → setX(prev => prev + 1)
          if (flip === "Heads") {
            setHeads(prev => prev + 1);
          } else {
            setTails(prev => prev + 1);
          }
    
          // Always create a NEW array — never mutate state directly!
          setHistory(prev => [...prev, { result: flip, time: now }]);
    
          setStreak(prev => {
            if (prev.side === flip) return { side: flip, count: prev.count + 1 };
            return { side: flip, count: 1 };
          });
        }, 600);
      };
    
    
      const reset = () => {
        setResult(null);
        setIsFlipping(false);
        setHeads(0);
        setTails(0);
        setHistory([]);
        setStreak({ side: null, count: 0 });
      };
    
      const total = heads + tails;
    
      return (
        <div className="app">
          <div className="container">
    
            {/* ── HEADER ── */}
            <div className="header">
              <h1 className="header__title">Coin Flip</h1>
            </div>
            {/* ── COIN CARD ── */}
            <div className="card coin-card">
    
              {/* Coin circle */}
              <div className={`coin ${isFlipping ? "coin--flipping" : ""} ${result ? `coin--${result.toLowerCase()}` : ""}`}>
                {/* STEP 8 → CoinFace is a child component receiving result as prop */}
                <CoinFace result={isFlipping ? null : result} />
              </div>
    
              {/* STEP 5 → CONDITIONAL RENDERING — show different text based on state */}
              {result && !isFlipping && (
                <div className={`result-text result-text--${result.toLowerCase()}`}>
                  {result}!
                </div>
              )}
    
              {isFlipping && <div className="result-text result-text--flipping">Flipping...</div>}
    
              {!result && !isFlipping && (
                <div className="result-text result-text--idle">Press flip to start</div>
              )}
    
              {/* STEP 5 → && short-circuit: only renders when streak.count >= 3 */}
              {streak.count >= 3 && (
                <div className="streak-badge">
                   {streak.count}× {streak.side} streak!
                </div>
              )}
    
              {/* STEP 4 → EVENT HANDLER: onClick={flipCoin} */}
              {/* Note: onClick={flipCoin}  ✅  NOT  onClick={flipCoin()}  ❌ */}
              <button
                className={`btn-flip ${isFlipping ? "btn-flip--disabled" : ""}`}
                onClick={flipCoin}
                disabled={isFlipping}
              >
                {isFlipping ? "Flipping..." : "Flip Coin"}
              </button>
            </div>
    
            {/* ── STATS — STEP 2: Props passed to StatBadge ── */}
            <div className="stats-row">
              <StatBadge label="Heads" value={heads} color="gold"    />
              <StatBadge label="Total" value={total} color="neutral" />
              <StatBadge label="Tails" value={tails} color="purple"  />
            </div>
    
            {/* Win-rate bar — STEP 5: only shows when total > 0 */}
            {total > 0 && (
              <div className="progress-card card">
                <div className="progress-bar">
                  <div
                    className="progress-bar__fill"
                    style={{ width: `${(heads / total) * 100}%` }}
                  />
                </div>
                <span className="progress-label">
                  {Math.round((heads / total) * 100)}% Heads
                </span>
              </div>
            )}
    
            {/* ── HISTORY — uses STEP 6 useEffect + STEP 7 useRef inside ── */}
            <div className="card history-card">
              <div className="card__label">Flip History</div>
              {/* STEP 8: HistoryLog is a composed component */}
              <HistoryLog history={history} />
            </div>
    
            {/* Reset — only shows after at least one flip */}
            {total > 0 && (
              <button className="btn-reset" onClick={reset}>
                Reset Everything
              </button>
            )}    
          </div>
        </div>
      );
}