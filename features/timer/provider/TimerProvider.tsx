import React, { createContext } from 'react';
import useTimerHook  from '../hooks/TimerHook';

type TimerState = ReturnType<typeof useTimerHook>;
// タイマーのコンテキストを作成します。
export const TimerContext = createContext<TimerState | null>(null);


// タイマーのプロバイダーを作成します。このプロバイダーはアプリケーションのどこからでもタイマーの状態にアクセスできるようにします。
export default function TimerProvider({ children, expiryTimestamp }:any) {
  const timer = useTimerHook(expiryTimestamp);

  return (
    <TimerContext.Provider value={timer}>
      {children}
    </TimerContext.Provider>
  );
}

