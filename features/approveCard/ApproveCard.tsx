"use client";
import CustomButton from "@/components/ui/button/Button";
import styles from "./ApproveCard.module.css";
import Button from "@mui/material/Button";
import { ActionType } from "types/actionType";
import { actionData } from "types/actionType";
import EditIcon from "@mui/icons-material/Edit";
import { approve } from "features/mail/functions/mailfuncitions";
import { doc } from "firebase/firestore";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function ApproveCard({
  doc,
  actionType,
  from,
  replySummary = "Thank you for message. I would like to join the team. How do I do to join the team?",
  messageSummary = "Join the Pro team?",
  onClick,
}: {
  doc: any;
  actionType: ActionType;
  from: string;
  messageSummary?: string;
  replySummary?: string;
  onClick: () => void;
}) {
  const { title, imagePath } = actionData[actionType];
  return (
    <>
      <div className={`${styles.approveCard}`} onClick={onClick}>
        <div className={`${styles.title} flex`}>
          <img src={imagePath} alt="" />
          <div>
            <h3>{doc.subject}</h3>
            <div>
              <p>from: {from}</p>
            </div>
          </div>
        </div>
        <div className={`${styles.main} flex`}>
          <img src="/approve-card/sms.png" alt="" />
          <p>{messageSummary}</p>
        </div>
        <div className={`${styles.main} flex `}>
          <img
            src="/approve-card/line1.png"
            alt=""
            style={{ marginTop: "8px" }}
          />
          <p>{replySummary}</p>
        </div>
        <div className={`${styles.btns} flex justify-center`}>
          <Button variant="outlined" startIcon={<VisibilityIcon />}>
          詳細を見る
          </Button>

          <Button
            variant="contained"
            color="primary"
            className={styles.blue}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              approve(doc);
              console.log("click");
            }}
          >
            承認する
          </Button>
        </div>
      </div>
    </>
  );
}
