import styles from "../modal/Modal.module.css";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import "../modal/local.css";
import TextWithLineBreaks from "utils/text/LineBreaks";
import { approve } from "features/mail/functions/mailfuncitions";

export default function ReplyDialog({doc}:{doc:any}) {
  return (
    <>
      <div className={`${styles.replyContainer} absolute bottom-0 ${styles.right80}`}>
        <p
          className="pb-4 pt-4 text-white"
          style={{ textAlign: "center", backgroundColor: "#1976d2" }}
        >
          以下の内容で対応しました。
        </p>
        <div className={styles.mailContainer}>
          <TextWithLineBreaks text={doc?.reply} />
        </div>
        <div className={`${styles.btns} mb-3 flex justify-center`}>
          <Button variant="outlined" startIcon={<EditIcon />}>
            編集する
          </Button>
          <div className={styles.blue}>
            <Button
              variant="contained"
              color="primary"
              className={styles.blue}
              onClick={() => {
                approve(doc);
              }}
            >
              承認する
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
