"use client";
import CustomButton from "@/components/ui/button/Button";
import Grid from "@mui/material/Unstable_Grid2";
import MailBody from "features/mail/MailBody";
import MailSnippet from "features/mail/MailSnippet";
import { mails } from "db/mails";
import { useState, useEffect,useRef } from "react";
import { useHandleSubmit } from "features/gpt/hooks/PostGPT";
import MailReplyBody from "features/mail/MailReplyBody";
import styles from "./play-ground.module.css";
import NavMenu from "@/components/ui/NavMenu/NavMenu";
import useFetchMails, {
  DocumentData,
} from "features/mail/provider/mailProvider";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Link from "next/link";
import ReplyDialog from "@/components/ui/dialog/ReplyDialog";

export default function Home() {
  const [res, setRes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { allDocuments } = useFetchMails("mails_imapclient");
  const [doc, setdoc] = useState<DocumentData>(allDocuments[0]);
  const isFirstRun = useRef(true);
  const handleSubmit = useHandleSubmit(setRes, setIsSubmitting);
  useEffect(() => {
    if (isFirstRun.current) {
    setdoc(allDocuments[0]);
    isFirstRun.current = false;
    }
  }, [allDocuments]);
  return (
    <>
      <div className="container-fluid relative flex h-screen items-stretch p-0">
        <NavMenu />
        <div className={styles.dashBoard}>
          <div
            className={`fixed top-0 h-screen w-1/5 overflow-auto ${styles.backGroundColor}`}
          >
            <div className="h-16"></div>

            <div className={styles.border}>
              {allDocuments.map((document) => {
                return (
                  <MailSnippet
                    key={document.id}
                    doc={document}
                    onTap={() => setdoc(document)}
                  ></MailSnippet>
                );
              })}
            </div>
          </div>
          <div
            className={styles.main}
            style={{ marginLeft: "25%", width: "73%" }}
          >
            <div className={`${styles.toolBar}`}>
              <div></div>
              <Link href={"/pages/dashboard"}>
                <div className="flex">
                  <AutorenewIcon />
                  <p>Aモードに変更</p>
                </div>
              </Link>
            </div>
            <MailBody doc={doc}></MailBody>
            <ReplyDialog doc={doc}></ReplyDialog>
            {/* <div className="mb-5 flex h-1/5 flex-col bg-white">
              <div className="flex">
                <img src="/AiAssistantLogo.png" alt="" width={200} />
                <h4>以下のように対応しました。</h4>
              </div>
              <CustomButton
                text="承認"
                backgroundColor="#2b83e2"
                borderRadius="20px"
                style={{ marginTop: "10px" }}
              ></CustomButton>
            </div> */}
            {/* <MailReplyBody doc={doc}></MailReplyBody> */}
          </div>
        </div>
      </div>
    </>
  );
}
