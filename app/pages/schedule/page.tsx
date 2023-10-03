"use client";
import NavMenu from "@/components/ui/NavMenu/NavMenu";
import styles from "./schedule.module.css";
import styles2 from "../dashboard/dashboard.module.css";
import "./schedule.css";
import TimeLine from "features/calender/TimeLine";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ScheduleItem from "features/calender/ScheduleItem";
import GoogleCalendar from "@/lib/google-calendar/GoogleCalendar";
import GoogleAuth from "features/auth/google-auth";
import useFetchDate from "features/mail/provider/dateProvider";
import { useEffect, useState } from "react";
import { addHours, set } from "date-fns";
import MailBodyModal from "@/components/ui/modal/MailBodyModal";
import Alert from "@mui/material/Alert";
import FeedbackContainer from "features/feedback/FeedbackContainer";
import Questionnaire from "features/feedback/Questionnaire";
import Meeting from "features/feedback/meeting";
import FBIcon from "features/feedback/FBIcon";
import FBModal from "features/feedback/FBModal";

export default function Page() {
  const allDates = useFetchDate();
  const [selectedDate, setSelectedDate] = useState<any>(allDates[0]);
  const [modalShow, setModalShow] = useState(false);
  const [showFBs, setShowFBs] = useState(true);
  const [showFBModals, setShowFBModals] = useState(false);
  const [groupedDates, setGroupedDates] = useState<{ [key: string]: any[] }>(
    {},
  );
  useEffect(() => {
    const groupedDatesLocal: { [key: string]: any[] } = {};

    allDates.forEach((doc: any) => {
      const start = doc.start;
      const dateParts = start.split("T");
      const date = dateParts[0];

      if (!groupedDatesLocal[date]) {
        groupedDatesLocal[date] = [];
      }
      groupedDatesLocal[date].push(doc);
    });

    setGroupedDates(groupedDatesLocal);
  }, [allDates]);

  return (
    <>
      <div
        className={`${styles2.body} flex min-h-screen w-full items-start justify-start`}
      >
        <NavMenu />
        <div className={`${styles2.dashBoard} relative flex`}>
          <div>
            <Alert severity="info" className="m-auto w-4/5">
              メールの中から予定やToDoが抜き出され、ここに記入されます。
            </Alert>
            {/* <div className="flex justify-end mr-3"><GoogleAuth/></div> */}
            <div className={`${styles.scheduleSheet}`}>
              <div className="flex items-center justify-between">
                <h6 className={styles.title}>Schedule</h6>
                {/* <GoogleAuth /> */}
              </div>
              <Divider />
              <div className={`${styles.container}`}>
                {Object.keys(groupedDates).map((date, index) => {
                  const formattedDate = formatDate(date);
                  return (
                    <div key={index}>
                      <p className={styles.date}>{formattedDate}</p>
                      {groupedDates[date].map((item, idx) => {
                        const time = item.start.split("T")[1]
                          ? item.start.split("T")[1].replace(/:00$/, "")
                          : "";
                        return (
                          <ScheduleItem
                            key={idx}
                            time={time}
                            title={item.title}
                            onClick={() => {
                              setSelectedDate(item);
                              console.log(item);
                              setModalShow(true);
                            }}
                          />
                        );
                      })}
                    </div>
                  );
                })}
                {/* <p className={styles.date}>8/6</p>
                <ScheduleItem time="10:00" title="デイリースクラム" />
                <ScheduleItem time="13:00" title="Giax社新規プロジェクトの依頼" />
                <ScheduleItem time="15:00" title="GT社定期ミーティング" />
                <p className={styles.date}>8/7</p>
                <ScheduleItem time="10:00" title="デイリースクラム" />
                <ScheduleItem time="13:00" title="Giax社新規プロジェクトの依頼" />
                <p className={styles.date}>8/8</p>
                <ScheduleItem time="10:00" title="デイリースクラム" />
                <ScheduleItem time="13:00" title="Giax社新規プロジェクトの依頼" />
                <ScheduleItem time="15:00" title="GT社定期ミーティング" /> */}
              </div>
            </div>
          </div>
          {/* <GoogleCalendar /> */}
          <TimeLine></TimeLine>
        </div>
        <MailBodyModal
          message={selectedDate?.mail ?? ("" as String)}
          fromAdress={selectedDate?.fromAdress}
          onHide={() => setModalShow(false)}
          show={modalShow}
          subject={selectedDate?.subject}
        ></MailBodyModal>
      </div>
      <FBModal show={showFBModals} onHide={() => setShowFBModals(false)} />
      {showFBs ? (
        <>
          
          <FeedbackContainer
            onClickMax={() => setShowFBModals(true)}
            onClickMinimize={() => setShowFBs(false)}
          />
        </>
      ) : (
        <FBIcon onClick={() => setShowFBs(true)} />
      )}
    </>
  );
}

const formatDate = (dateString: String) => {
  const [year, month, day] = dateString.split("-");
  return `${parseInt(month)}/${parseInt(day)}`;
};
