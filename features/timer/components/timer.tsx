import useTimerHook from "../hooks/TimerHook";
import { useContext } from "react";
import { TimerContext } from "../provider/TimerProvider";


export default function MyTimer() {
    const timer = useContext(TimerContext);
    if(!timer){return <></>}
    return (
      <div style={{ textAlign: "center" }}>
        <h1>react-timer-hook </h1>
        <p>Timer Demo</p>
        <div style={{ fontSize: "100px" }}>
          <span>{timer.days}</span>:<span>{timer.hours}</span>:<span>{timer.minutes}</span>:
          <span>{timer.seconds}</span>
        </div>
        <p>{timer.isRunning ? "Running" : "Not running"}</p>
        <button onClick={timer.start}>Start</button>
        <button onClick={timer.pause}>Pause</button>
        <button onClick={timer.resume}>Resume</button>
        <button
          onClick={() => {
            const time = new Date();
            time.setSeconds(time.getSeconds() + 300);
            timer.restart(time);
          }}
        >
          Restart
        </button>
      </div>
    );
  }