import { useState, useEffect } from 'react';
import axios from 'axios';

export function useGoogleCalendarEvents() {
  const [events, setEvents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined") {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const res = await fetchEvents(refreshToken);
          setEvents(res.data.events);
        } else {
          console.log("refreshToken: ", "null");
        }
        setIsLoggedIn(!!refreshToken);
      }
    };

    fetchData();
  }, []);

  async function fetchEvents(refreshToken:string) {
    return await axios.post(
      "http://localhost:3000/api/google-calendar",
      {
        refreshToken: refreshToken,
      },
    );
  }

  return { events, isLoggedIn };
}
