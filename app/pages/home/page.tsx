"use client";
import "./pages.css";
import Balancer from "react-wrap-balancer";
import Image from "next/image";
import TalkList from "features/chat/components/TalkList";
import MyTimer from "features/timer/components/timer";
import TimerProvider from "features/timer/provider/TimerProvider";
import TimerTester from "@/components/ui/TimerTester";
import MyEditor from "features/document/components/EditorTest";
import DocumentSheet from "features/document/components/DocumentSheet";
import {
  EditorContextProvider,
  useEditorContext,
} from "features/document/provider/EditorProvider";
import SetDataButton from "features/document/hooks/SetText";

export default function Home() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);
  return (
    <>
      <EditorContextProvider>
        <TimerProvider value={time}>
          <div className="z-10 flex w-full flex-row px-5 xl:px-0">
            <div className="h-90 relative w-6/12">
              <MyTimer />
              {/* <div className="h-96"><Image src="/operater.png" alt="" fill style={{ objectFit: "contain" }}></Image></div> */}
              {/* <div className="h-96"></div> */}
              <div className="z-20">
                <TalkList></TalkList>
              </div>
            </div>
            <div className="h-90 relative w-6/12">
              <DocumentSheet>
                <MyEditor></MyEditor>
              </DocumentSheet>
            </div>
          </div>
        </TimerProvider>
      </EditorContextProvider>
    </>
  );
}
