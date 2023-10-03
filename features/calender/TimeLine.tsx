"use client";
import { FC, use, useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import addHours from "date-fns/addHours";
import startOfHour from "date-fns/startOfHour";
import startOfToday from "date-fns/startOfToday";
import "./timeline.css";
import { useGoogleCalendarEvents } from "@/lib/google-calendar/EventHook";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useFetchDate from "features/mail/provider/dateProvider";
import CloseIcon from "@mui/icons-material/Close";

const eventStyle = (
  event: object,
  start: Date,
  end: Date,
  isSelected: Boolean,
) => {
  return {
    className: "",
    style: {
      backgroundColor: "rgb(3, 155, 229)",
      borderRadius: "6px",
      color: "#fff",
    },
  };
};

export default function TimeLine({onClose}:{onClose?:()=>void})  {
  // const { events, isLoggedIn } = useGoogleCalendarEvents();
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [groupedDates, setGroutedDates] = useState<any[]>([]);
  const mailEvents = useFetchDate();
  // useEffect(() => {
  //   {
  //     events.map((event: any) => {
  //       const start = event.start.dateTime || event.start.date;
  //       const end = event.end.dateTime || event.end.date;
  //       const firstEvent = {
  //         start: new Date(start),
  //         end: new Date(end),
  //         title: event.summary,
  //       };
  //       myEvents.push(firstEvent);
  //     });
  //   }
  // }, [events]);
  useEffect(() => {
    const groupedDatesLocal: any[] = [];
    {
      mailEvents.map((doc: any) => {
        const start = doc.start;
        const date = start.split("T");
        if (!groupedDatesLocal[date]) {
          groupedDatesLocal[date] = [];
        }
        groupedDatesLocal[date].push(doc);
        const end = doc.end;
        const startDate = new Date(start);
        const endDate = addHours(startDate, 1);
        const firstEvent = {
          start: startDate,
          end: endDate,
          title: doc.title,
        };
        myEvents.push(firstEvent);
      });
    }
    setGroutedDates(groupedDatesLocal);
  }, [mailEvents]);

  const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
    const { start, end } = data;

    setMyEvents((currentEvents) => {
      const firstEvent = {
        start: new Date(start),
        end: new Date(end),
      };
      return [...currentEvents, firstEvent];
    });
  };
  function handleOnClick() {
    console.log(myEvents);
  }

  const onEventDrop: withDragAndDropProps["onEventDrop"] = (data:any) => {
    console.log(data);
  };

  return (
    <>
      {/* <button onClick={handleOnClick}>Click me</button> */}
      <div className="relative">
        <CloseIcon className="absolute right-4 top-4" onClick={onClose}/>
        <DnDCalendar
          defaultView="week"
          events={myEvents}
          localizer={localizer}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          eventPropGetter={(event:any, start:any, end:any, isSelected) =>
            eventStyle(event, start, end, isSelected)
          }
          resizable
          min={new Date(0, 0, 0, 7, 0)}
          max={new Date(0, 0, 0, 23, 59)}
          style={{ height: "100vh", backgroundColor: "white" }}
        />
      </div>
    </>
  );
};

const locales = {
  "en-US": enUS,
};
const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
const now = new Date();
const start = endOfHour(now);
const end = addHours(start, 2);
// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
//@ts-ignore
const DnDCalendar = withDragAndDrop(Calendar);


// () => {
//   const events = [];
//   const now = new Date();
//   for (let i = 0; i < 7; i++) {
//     const start = addHours(startOfWeek(now), 10 + i * 24); // 20:00スタートの日付を作成
//     const end = addHours(start, 1); // スタートから2時間後の日付を作成
//     events.push({
//       title: "デイリースクラム",
//       start,
//       end,
//     });
//   }
//   return events;
// }
