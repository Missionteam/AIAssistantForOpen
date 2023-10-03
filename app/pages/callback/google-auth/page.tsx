"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Callback() {
  const [events, setEvents] = useState<any[]>([]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    const fn = async () => {
      // getパラメータの認証コードを取得する
      const code = searchParams.get("code");
      if (!code) return;
      console.log("code: ", code);
      const response = await axios.post(
        "http://localhost:3000/api/auth/get-google-auth-token",
        {
          authorizationCode: code,
        },
      );

      const { tokens } = response.data.response;
      if (typeof window !== 'undefined') {
        localStorage.setItem('refreshToken', tokens.refresh_token);
    }
      console.log("tokens: ", tokens);
      const res = await axios.post(
        "http://localhost:3000/api/google-calendar",
        {
            refreshToken: tokens.refresh_token,
        },
      );
      setEvents(res.data.events);
    };

    fn().then();
  }, [pathname]);

  return (
    <div>
      <ul>
        {events.map((event: any) => {
        const start = event.start.dateTime || event.start.date;
          return <li key={event.id}>{start}{event.id}</li>;
        })}
      </ul>
    </div>
  );
}

export const dynamic = "force-dynamic";
