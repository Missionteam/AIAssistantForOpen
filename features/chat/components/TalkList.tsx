import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Chat from "./chat";
import InputForm from "./InputForm";
import { Message } from "../../../types/custom";
import getResponse from "@/app/api/gpt/responseGPT";
import ThreeDotsLoader from "../../../components/ui/ThreeDotsLoader";
import { siteTitle, system_prompt } from "../../../constants/constants";
import { TimerContext } from "features/timer/provider/TimerProvider";
import { useContext, useEffect } from "react";
import VoiceBox from "../hooks.js/VoiceHook";
import usesetDoc from "features/gpt/hooks/SetDoc";

const textareaStyle: React.CSSProperties = { width: "100%", height: 100 };
const audioStyle: React.CSSProperties = { ...textareaStyle };

export default function TalkList() {
  const timer = useContext(TimerContext);
  const [res, setRes] = useState("");
  const [audioData, setAudioData] = useState<Blob>();
  // // chats:メッセージのリストを保持。初期値としてシステムメッセージ（system_prompt）を入れておく
  const [chats, setChats] = useState<Message[]>([
    {
      role: "system",
      content: system_prompt,
    },
  ]);
  usesetDoc(res);
  // isSubmitting: メッセージ送信中かどうかのフラグ。GPTの返答待ちの間「・・・」のアニメーションを表示
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (message: Message) => {
    try {
      setIsSubmitting(true);
      setChats((prev) => [...prev, message]);

      // // ChatGPT APIと通信
      // const response = await fetch("/api/messages/", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     message: [...chats, message].map((d) => ({
      //       role: d.role,
      //       content: d.content,
      //     })),
      //   }),
      // });
      const response = getResponse(message.content);

      const data = await response;
      const newChat: Message = await {
        role: "assistant",
        content: data.answer,
      };
      // if (response.status !== 200) {
      //   throw (
      //     data.error ||
      //     new Error(`Request failed with status ${response.status}`)
      //   );
      // }
      setChats((prev) => [...prev, newChat as Message]);
      const answer = data.answer;
      const re = /setTimer\((\d+)\)/;
      const match = answer.match(re);
      const res = await VoiceBox(answer);
      setRes(data.answer);
      // setAudioData(res);
      if (match && match[1]) {
        console.log(`Time from 'setTimer': ${match[1]} seconds`);
        const time = new Date();
        time.setSeconds(match[1]);
        console.log(`Time from 'setTimer': ${time} seconds`);
        timer?.restart(time);
      } else {
        console.log(`The text does not contain 'setTimer(number)'.`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="z-10 m-auto my-10 w-full max-w-2xl bg-white p-4 md:rounded-lg md:p-10 md:shadow-md">
      <div className="mb-10">
        <AnimatePresence>
          {chats.slice(1, chats.length).map((chat, index) => {
            return <Chat role={chat.role} content={chat.content} key={index} />;
          })}
        </AnimatePresence>
      </div>
      <div className="h-4"></div>
      <InputForm onSubmit={handleSubmit} />
    </div>
  );
}


