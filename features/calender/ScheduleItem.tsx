import styles from "../../app/pages/schedule/schedule.module.css";
import Button from "@mui/material/Button";

export default function ScheduleItem({
  time,
  title,
  onClick
}: {
  time: string;
  title: string;
  onClick?:()=>void;
}) {
  return (
    <>
      <div className={`${styles.scheduleItem}`}>
        <div>
          <p>{time}</p>
          <p>{title}</p>
        </div>
        <Button variant="outlined" color="primary" onClick={onClick}>
          詳細
        </Button>
      </div>
    </>
  );
}
