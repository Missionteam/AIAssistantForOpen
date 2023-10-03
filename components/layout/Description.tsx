import { Button, Snackbar } from "@mui/material";
import styles from "./description.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { notoSerifJP, yuseiMagic } from "@/app/fonts";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";

export default function Description({ hide }: { hide: () => void }) {
  return (
    <>
      <div className={`${styles.whiteBox}`}>
        <div className={`${styles.closeIcon} flex`}>
          <div className={`${yuseiMagic.className}`}>
            <p className={styles.text}>説明を閉じ、使用を開始しましょう→</p>
          </div>
          <CloseIcon onClick={hide} />
        </div>
        <div className={`${styles.blackBox}`}>
          <img src="/explain.png" alt="" />
        </div>
        <div className={`${styles.description}`}>
          <img
            src="/assistant-logo.png"
            alt=""
            className={styles.assistantImg}
          />

          <div className={`${styles.check}`}>
            <p className={`${styles.title} ${notoSerifJP.className}`}>
              AIが下記の対応済み。
            </p>
            <CheckedList text="メールの整理" />
            <CheckedList text="下書きの作成" />
            <CheckedList text="日程やタスクをカレンダーに追加" />
            <div className={`flex items-center`}>
              {/* <p className={`${yuseiMagic.className} mt-1 mr-2`}>→</p> */}
              <Link href={"/pages/schedule"}>
                <div className={`${styles.file}`}>
                  <TaskOutlinedIcon />
                  <p>予定表_0917</p>
                </div>
              </Link>
            </div>
            {/* <Button variant="outlined" className={`${styles.button}`} onClick={hide}>
              <p>説明を閉じて、実際に試す</p>
            </Button> */}
          </div>
        </div>
      </div>
      
    </>
  );
}

function CheckedList({ text }: { text: string }) {
  return (
    <>
      <div className={`${styles.checkedItem} ${notoSerifJP.className}`}>
        <p>{text}</p>
        <img src="/checked.png" alt="" />
      </div>
    </>
  );
}
