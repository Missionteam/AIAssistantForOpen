import styles2 from "./MailList.module.css";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import DriveFileMoveOutlinedIcon from "@mui/icons-material/DriveFileMoveOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Divider from "@mui/material/Divider";
import { Arrow } from "@radix-ui/react-popover";
import styles from "./Mail.module.css";
import "./local.css";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TurnLeftRoundedIcon from "@mui/icons-material/TurnLeftRounded";
import TurnRightRoundedIcon from "@mui/icons-material/TurnRightRounded";

import { Button } from "@mui/material";
import TextWithLineBreaks from "utils/text/LineBreaks";
import Paper from "@mui/material/Paper";
import MinimizeIcon from "@mui/icons-material/Minimize";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseIcon from "@mui/icons-material/Close";

import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import LockClockOutlinedIcon from "@mui/icons-material/LockClockOutlined";
import DrawOutlinedIcon from "@mui/icons-material/DrawOutlined";
import { useState } from "react";
import { TaskList } from "types/tasks";
import { useEffect } from "react";
import CalendarCardContent from "@/components/ui/card/card_content/CalendarCardContent";
import NotionCardContent from "@/components/ui/card/card_content/NotionCardContent";
import { yuseiMagic } from "@/app/fonts";
export default function Mail({
  doc,
  onBack,
  release
}: {
  doc: any;
  onBack: () => void;
  release?: boolean;
}) {
  const name = getRandomSenderName();
  const date = formatDate(doc?.date.toDate());
  //   console.log(doc?.reply);
  const reply = doc?.reply
    .split("\n")
    .map((line: string) => line.trim())
    .join("\n");
  const hasReply =
    doc.category === "important" ||
    doc.category === "task" ||
    doc.category === "date" ||
    doc.category === "schedule" ||
    doc.category === "reply";
  const [tasks, setTasks] = useState<TaskList | null>(null);
  const [parsedDate, setParsedDate] = useState<any | null>(null);
  const [replyText, setReplyText] = useState(reply);
  const [subjectText, setSubjectText] = useState('Re'+doc?.subject);
  const [toText, setToText] = useState(name);


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
  //   const reply = doc?.reply.replace(/\\n/g, '\n');
  return (
    <>
      <div className={`${styles2.sheet} relative`}>
        <div className={`${styles2.tools}`}>
          <ArrowBackOutlinedIcon onClick={onBack} />
          <ArchiveOutlinedIcon />
          <InfoOutlinedIcon />
          <DeleteOutlinedIcon onClick={doc.doc?.delete}/>
          <Divider orientation="vertical" flexItem />
          <EmailOutlinedIcon />
          <AccessTimeOutlinedIcon />
          <AddTaskOutlinedIcon />
          <Divider orientation="vertical" flexItem className="h-full" />
          <DriveFileMoveOutlinedIcon />
          <LabelOutlinedIcon />
          <MoreVertOutlinedIcon />

          <div className={`${styles2.rightTools}`}>
            <KeyboardArrowLeftOutlinedIcon />
            <KeyboardArrowRightOutlinedIcon />
          </div>
        </div>
        <div className={`${styles.title}`}>
          <h2>{doc?.subject}</h2>
          <LocalPrintshopOutlinedIcon />
          <OpenInNewOutlinedIcon />
        </div>
        <div className="ng-tns-c1434763513-1 flex w-full items-center">
          <div className="ml-2 h-10 w-10">
            <img
              alt="User avatar"
              className="ng-star-inserted h-full w-full rounded-full"
              src="/userblank.png"
            />
          </div>
          <div className="m-3">
            <div className={`${styles.fromBox}`}>
              <h6 className={`${styles.from}`}>{release?doc.fromAdress: name}</h6>
              <p className={`${styles.to}`}> {release?"":"<noreply@tm.openai.com>"}</p>
            </div>
            <div className={`${styles.toBox}`}>
              <p className={`${styles.to}`}> To 自分</p>
              <ArrowDropDownOutlinedIcon />
            </div>
          </div>
          <div className={`${styles2.rightTools}`}>
            <p className={styles.to}>{date}</p>
            <StarBorderIcon />
            <TurnLeftRoundedIcon />
            <MoreVertOutlinedIcon />
          </div>
        </div>
        <div
          className={`${styles.body}`}
          style={{ alignItems: hasReply ? "flex-start" : "center" }}
        >
          <TextWithLineBreaks text={doc?.body} />
        </div>
        <div className={`${styles.btns}`}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<TurnLeftRoundedIcon />}
            sx={{ borderRadius: "20px", padding: "5px 26px" }}
          >
            <p> 返信 </p>
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<TurnRightRoundedIcon />}
            sx={{
              marginLeft: "10px",
              borderRadius: "20px",
              padding: "5px 26px",
            }}
          >
            <p>転送</p>
          </Button>
        </div>

        {hasReply ? (
            
          <div className={`${styles.reply}`}>
            {/* <div className={`flex w-full justify-center mb-4`}>
            <img src="/assistant-logo.png" alt="" width={30} className="mr-2"/>
            {tasks ? <h6 className={yuseiMagic.className}>タスクを追加し、下書きを作成しました。</h6>:parsedDate?<h6 className={yuseiMagic.className}>予定を追加し、下書きを作成しました。</h6>:<h6 className={yuseiMagic.className}>下書きを作成しました。</h6>}    
            </div> */}


            {tasks ? (
              <div className={`mb-3 ${styles.elevation}`}>
                <NotionCardContent tasks={tasks} />
              </div>
            ) : (
              <></>
            )}
            {parsedDate ? (
              <div className={`mb-3 ${styles.elevation}`}>
                <CalendarCardContent dates={parsedDate} />
              </div>
            ) : (
              <></>
            )}
            <Paper elevation={5} className="w-full">

              <div className={`${styles.replyHeader}`}>
                <p>新規メッセージ</p>
                <div className={`${styles.replyHeaderRight}`}>
                  <img src="/assistant-logo.png" alt="" width={200} />
                  <p>Wrote by AI  </p>
                  <MinimizeIcon />
                  <OpenInFullIcon />
                  <CloseIcon />
                </div>
              </div>
              <div className={`${styles.inputContainer}`}>
                <label className={`${styles.label}`}>宛先</label>
                <input value={toText} onChange={(e)=> setToText(e.target.value)}></input>
              </div>

              <input
                className={`${styles.input}`}
                placeholder="件名"
                value={subjectText}
                onChange={(e) => setSubjectText(e.target.value)}
              ></input>
              <textarea className={`${styles.inputBody}`} value={replyText} onChange={(e) => setReplyText(e.target.value)}/>
              <div className={`${styles.btmTools}`}>
                <Button
                  variant="contained"
                  endIcon={<ArrowDropDownOutlinedIcon />}
                  sx={{
                    borderRadius: "20px",
                    padding: "5px 9px 5px 26px",
                    marginLeft: "10px",
                  }}
                >
                  送信
                </Button>
                <div className={`w-2`}></div>
                <FormatColorTextIcon />
                <AttachFileIcon />
                <InsertLinkIcon />
                <InsertEmoticonIcon />
                <InsertPhotoOutlinedIcon />
                <LockClockOutlinedIcon />
                <DrawOutlinedIcon />
                <MoreVertOutlinedIcon />
                <DeleteOutlinedIcon sx={{ marginLeft: "auto !important" }} />
              </div>
            </Paper>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JavaScriptの月は0から始まるので1を加える
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${year}/${month}/${day} ${hour}:${minute
    .toString()
    .padStart(2, "0")}`;
}

const senderNames = [
  "山田 太郎",
  "佐藤 次郎",
  "鈴木 三郎",
  "田中 四郎",
  "高橋 五郎",
  "田村 六郎",
  "Michael Johnson",
  "Sarah Smith",
  "John Doe",
  "Emily Davis",
  "Robert Wilson",
];

function getRandomSenderName(): string {
  const randomIndex = Math.floor(Math.random() * senderNames.length);
  return senderNames[randomIndex];
}
