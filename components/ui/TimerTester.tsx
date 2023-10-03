import { TimerContext } from "features/timer/provider/TimerProvider";
import { useContext } from "react";

export default function TimerTester(){
    const timer = useContext(TimerContext);    
    return <>
    <button onClick={() => {
            const time = new Date();
            time.setSeconds(time.getSeconds() + 300);
            timer?.restart(time);
          }}>TestReset</button>
    </>

}