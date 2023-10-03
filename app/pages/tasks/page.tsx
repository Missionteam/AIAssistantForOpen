"use client";
import NavMenu from "@/components/ui/NavMenu/NavMenu";
import styles from "./tasks.module.css";
import styles2 from "../dashboard/dashboard.module.css";
import { db } from "@/lib/firebase/initialize";
import "./tasks.css";
import { useEffect, useState } from "react";
import { TaskItem, TaskList } from "types/tasks";
import { Button, Divider } from "@mui/material";
import useFetchTasks from "features/mail/provider/taskProvider";
import MailBodyModal from "@/components/ui/modal/MailBodyModal";
import TimeLine from "features/calender/TimeLine";
import TaskListView from "features/tasks/TaskListView";
import Alert from "@mui/material/Alert";
import FeedbackContainer from "features/feedback/FeedbackContainer";
import Questionnaire from "features/feedback/Questionnaire";
import Meeting from "features/feedback/meeting";
import FBIcon from "features/feedback/FBIcon";
import FBModal from "features/feedback/FBModal";

export default function Page() {
  const allTask = useFetchTasks("tasks");
  const [selectedTask, setSelectedTask] = useState<any>(allTask[0]);
  const [isShowTimeLine, setIsShowTimeLine] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const[showFBs,setShowFBs]=useState(true);
  const[showFBModals,setShowFBModals]=useState(false);
  return (
    <>
      <div
        className={`${styles2.body} flex min-h-screen w-full items-start justify-start`}
      >
        <NavMenu />
        <div
          className={`${styles2.dashBoard} relative flex items-start justify-center`}
        >
          <div>
            <Alert severity="info" className="m-auto w-4/5">
              メールの中からToDoが抜き出され、ここに記入されます。
            </Alert>
            <div className={`${styles.taskSheet}`}>
              <div className="flex items-center justify-between">
                <h6 className={styles.title}>Tasks</h6>
                <Button
                  autoCapitalize="false"
                  color="inherit"
                  sx={{ textTransform: "none" }}
                >
                  <img
                    src="/nav-menu/notion.png"
                    style={{ width: "18px", marginRight: "10px" }}
                  ></img>
                  <p>Notionと連携(準備中)</p>
                </Button>
              </div>
              <Divider />
              <div className={`${styles.main}`}>
                {allTask.map((taskList, index) => (
                  <div key={index}>
                    <TaskListView tasks={taskList} hasDetailButton onClick={()=>{setModalShow(true);setSelectedTask(taskList)}}/>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="">
            {isShowTimeLine ? (
              <TimeLine onClose={() => setIsShowTimeLine(false)} />
            ) : (
              <div className="absolute right-3">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setIsShowTimeLine(true)}
                >
                  カレンダーを表示
                </Button>
              </div>
            )}
          </div>
        </div>
        <MailBodyModal
          message={selectedTask?.mail ?? ("" as String)}
          fromAdress={selectedTask?.fromAdress}
          onHide={() => setModalShow(false)}
          show={modalShow}
          subject={selectedTask?.subject}
        ></MailBodyModal>
         <FBModal show={showFBModals} onHide={()=>setShowFBModals(false)}/>
      </div>
      {showFBs?<>
      <FeedbackContainer onClickMax={()=>setShowFBModals(true)} onClickMinimize={()=>setShowFBs(false)}/></>:<FBIcon onClick={()=>setShowFBs(true)}/>}

    </>
  );
}
