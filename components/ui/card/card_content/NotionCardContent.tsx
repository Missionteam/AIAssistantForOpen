import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import TaskListView from "features/tasks/TaskListView";
import { TaskList } from "types/tasks";
import Link from "next/link";
import styles from "../../../page/mails/Mail.module.css";

export default function NotionCardContent({ tasks }: { tasks: TaskList }) {
  return (
    <>
      <Card variant="outlined" sx={{ width: "320px" }}>
        <React.Fragment>
          <CardContent>
            <div className={`w-32`}></div>

            <div className="flex">
              {/* <img src="/assistant-logo.png" alt="" width={20} style={{marginRight:"10px"}}/> */}

              <img
                src="/nav-menu/notion.png"
                alt=""
                sizes=""
                style={{ width: "20px", margin: "10px 0" }}
              />
              
            </div>

            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              以下の内容をタスクに追加しました。
            </Typography>
            <TaskListView tasks={tasks} hasDetailButton={false} />
            <div className="flex justify-end">
              <Link href="/pages/tasks">
                <Button size="small">
                  <p style={{ fontSize: "10px" }}>View More</p>
                </Button>
              </Link>
            </div>

            <div className="mt-2 flex w-full ">
            {/* <img src="/assistant-logo.png" alt="" width={20} /> */}

              <img
                src="/nav-menu/googleCalendar.png"
                alt=""
                sizes=""
                style={{ width: "16px", margin: "0 6px" }}
              />

              <Typography
                sx={{ fontSize: 12 }}
                color="text.secondary"
                gutterBottom
              >
                Google Calendarにも追加済み
              </Typography>
              {/* <div className={`${styles.replyHeaderRight}`}>
                <img src="/assistant-logo.png" alt="" width={20} /> */}
                {/* <p>Done by AI </p> */}
              {/* </div> */}
            </div>
          </CardContent>
        </React.Fragment>
      </Card>
    </>
  );
}
