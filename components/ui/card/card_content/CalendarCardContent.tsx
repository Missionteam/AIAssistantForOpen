import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import Divider from "@mui/material/Divider";
import Link from "next/link";

export default function CalendarCardContent({ dates }: { dates: any[] }) {
  return (
    <>
      <Card variant="outlined" sx={{ width: "320px" }}>
        <React.Fragment>
          <CardContent>
            <img
              src="/nav-menu/googleCalendar.png"
              alt=""
              sizes=""
              style={{ width: "40px", padding: "10px 0" }}
            />
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              カレンダーに以下の内容を追加しました。
            </Typography>
            {dates?.map((date, index) => (
              <div key={index}>
                <div className="mt-2 flex items-center">
                  <p style={{ fontSize: "8px" }}>{formatTime(date.start)}</p>
                  <Divider style={{ opacity: "1", width: "90%" }} />
                </div>
                <div
                  style={{
                    backgroundColor: "rgb(3, 155, 229)",
                    borderRadius: "6px",
                    color: "#fff",
                    padding: "20px 10px",
                    margin: "3px 0 3px 20px",
                  }}
                >
                  {formatDate(date.start)}{date.title}
                </div>
                <div className="flex items-center">
                  <p style={{ fontSize: "8px" }}>{formatTime(date?.end)}</p>
                  <Divider style={{ opacity: "1", width: "90%" }} />
                </div>
              </div>
            ))}
          </CardContent>
          <CardActions>
            <Link href="/pages/schedule"><Button size="small">Learn More</Button></Link>
          </CardActions>
        </React.Fragment>
      </Card>
    </>
  );
}

function formatTime(input: string) {
  const date = new Date(input);
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${hour}:${minute.toString().padStart(2, "0")}`;
}

function formatDate(input: string) {
  const date = new Date(input);

  const month = date.getMonth() + 1; // JavaScriptの月は0から始まるので1を加える
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${month}/${day} ${hour}:${minute.toString().padStart(2, "0")}`;
}
