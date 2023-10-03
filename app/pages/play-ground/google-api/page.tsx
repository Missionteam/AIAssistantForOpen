"use client";
import { el } from "date-fns/locale";
import { useEffect, useState } from "react";
import axios from "axios";
import TimeLine from "features/calender/TimeLine";

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        fetchEvents(refreshToken);
      } else {
        console.log("refreshToken: ", "null");
      }
      setIsLoggedIn(!!refreshToken);
    }
  }, []);
  async function fetchEvents(refreshToken:string){
    const res = await axios.post(
        "http://localhost:3000/api/google-calendar",
        {
            refreshToken: refreshToken,
        },
      );
      setEvents(res.data.events);
  }

  const handleOnClick = async () => {
    console.log("handleOnClick");
    const response = await axios.get(
      "http://localhost:3000/api/auth/generate-google-oauth-url",
    );
    console.log('response: ', response.data);
    
    const { authorizeUrl } = response.data;

    // Google認証ページを別タブで開く
    window.open(authorizeUrl, "_blank");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">{isLoggedIn ? <p>ログイン中</p> :  <><p>ログインしていません。</p><button onClick={handleOnClick}>認証する</button></>}</div>
      <div>
      <ul>
        {events.map((event: any) => {
        const start = event.start.dateTime || event.start.date;
          return <li key={event.id}>{start}{event.summary}</li>;
        })}
      </ul>
    </div>
    <TimeLine/>
    </>
  );
}
