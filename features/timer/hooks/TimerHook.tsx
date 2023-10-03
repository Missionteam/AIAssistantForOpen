import { useTimer } from "react-timer-hook";

// カスタムフックを作成します。これにより、タイマーのロジック部分を再利用可能にします。
export default (expiryTimestamp: Date) =>{
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  };
}