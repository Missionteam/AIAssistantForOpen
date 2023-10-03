import Modal from "react-bootstrap/Modal";
import styles from "./Modal.module.css";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import "./local.css";
import { useState } from "react";
import { updateDoc } from "firebase/firestore";
import TextWithLineBreaks from "utils/text/LineBreaks";
import { approve } from "features/mail/functions/mailfuncitions";
import SendIcon from "@mui/icons-material/Send";
import KeyboardArrowLeftSharpIcon from "@mui/icons-material/KeyboardArrowLeftSharp";
import KeyboardArrowRightSharpIcon from "@mui/icons-material/KeyboardArrowRightSharp";
import HandledCard from "../card/HandledCard";
import CalendarCardContent from "../card/card_content/CalendarCardContent";
import NotionCardContent from "../card/card_content/NotionCardContent";
import { TaskList } from "types/tasks";
import TaskListView from "features/tasks/TaskListView";
import { useEffect } from "react";
import { yuseiMagic } from "@/app/fonts";
export default function MyModal({
  doc,
  message,
  reply,
  show,
  onHide,
  goNextDoc,
  goPreviousDoc,
}: {
  doc: any;
  message: string;
  reply: string;
  show: boolean;
  onHide: () => void;
  goNextDoc?: () => void;
  goPreviousDoc?: () => void;
}) {
  const [tasks, setTasks] = useState<TaskList | null>(null);
  const [parsedDate, setParsedDate] = useState<any | null>(null);

  useEffect(() => {
    setTasks(null);
    setParsedDate(null);
    if (doc?.tasks) {
      console.log("doc.tasks");
      setTasks({
        title: doc.tasks.title,
        tasks: doc.tasks.tasks,
        id: doc.id,
        ref: null,
      });
    }
    if (doc?.parsedDates) {
      setParsedDate(doc.parsedDates);
      console.log(parsedDate);
    }
  }, [doc]);
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="modalWidth"
      >
        <KeyboardArrowRightSharpIcon
          className={styles.nextDocArrow}
          onClick={goNextDoc}
          htmlColor="#fff"
        />
        <KeyboardArrowLeftSharpIcon
          className={styles.priviousDocArrow}
          onClick={goPreviousDoc}
          htmlColor="#fff"
        />
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title id="contained-modal-title-vcenter">
            {/* <h5>以下の内容で対応しました。</h5> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ width: "100%", overflow: "visible", padding: "0" }}
        >
          <div className={`${styles.main}`}>
            <div className={``}>
              <div style={{ margin: "20px 30px 20px 50px" }}>
                {parsedDate ? (
                  <CalendarCardContent dates={parsedDate} />
                ) : (
                  <div style={{ width: "300px" }}></div>
                )}
              </div>
              <div style={{ margin: "20px 30px 20px 50px" }}>
                {tasks ? <NotionCardContent tasks={tasks} /> : <></>}
              </div>
            </div>

            <div className="flex flex-col">
              <p className={yuseiMagic.className}>↓元のメール</p>
              <div className={styles.mailContainer}>
                {doc?.subject ? doc.subject : "件名なし"}
              </div>
              <div className={styles.mailContainer}>{doc?.fromAdress}</div>
              <div
                className={`${styles.mailContainer} flex-grow`}
                style={{ flexGrow: "1" }}
              >
                <TextWithLineBreaks text={message} />
              </div>
            </div>
           
            <div className={`${styles.replyContainer} align-self-end mr-8 relative`}>
              <div className={`${styles.navText}`}>
              <p
                  className={`${yuseiMagic.className}`}
                >
                  　　↓AIの返信
                </p>
              </div>

              <p
                className="pb-4 pt-4 text-white"
                style={{ textAlign: "center", backgroundColor: "#1976d2" }}
              >
                以下の内容で対応しました。
              </p>
              <div className={styles.mailContainer}>
                <TextWithLineBreaks text={reply} />
              </div>
              <div className={`${styles.btns} mb-3 flex justify-center`}>
                <Button variant="outlined" startIcon={<EditIcon />}>
                  編集する
                </Button>
                <div className={styles.blue}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SendIcon />}
                    className={styles.blue}
                    onClick={() => {
                      approve(doc);
                      onHide();
                    }}
                  >
                    送信　
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer className="w-full">
          
        </Modal.Footer> */}
      </Modal>
    </>
  );
}
