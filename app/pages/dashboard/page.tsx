"use client";
import NavMenu from "@/components/ui/NavMenu/NavMenu";
import styles from "./dashboard.module.css";
import ApproveCard from "features/approveCard/ApproveCard";
import "./local.css";
import { ActionType } from "types/actionType";
import { useState, useContext, useEffect } from "react";
import MyModal from "@/components/ui/modal/Modal";
import { Mail } from "db/mails";
import Alert from "@mui/material/Alert";

import { mails } from "db/mails";
import useFetchMails, {
  DocumentData,
} from "features/mail/provider/mailProvider";
import bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MailAuthModal from "features/auth/MailAuthModal";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import LoginIcon from "@mui/icons-material/Login";
import signIn from "features/signup/signIn";
import { AuthContext, UserContextType } from "@/lib/firebase-auth/AuthContext";
import SignoutModal from "features/auth/SignoutModal";
import { on } from "events";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Button from "@mui/material/Button";
import useFetchAccounts from "features/mail/provider/accountsProvider";
import Link from "next/link";
import styles2 from "../play-ground/play-ground.module.css";
import FeedbackContainer from "features/feedback/FeedbackContainer";
import Questionnaire from "features/feedback/Questionnaire";
import Meeting from "features/feedback/meeting";
import FBIcon from "features/feedback/FBIcon";
import FBModal from "features/feedback/FBModal";
import { yuseiMagic } from "@/app/fonts";

export default function Page() {
  const [modalShow, setModalShow] = useState(false);
  const [subscribeSnackShow, setSubscribeSnackShow] = useState(false);
  const [signoutModalShow, setSignoutModalShow] = useState(false);
  const [mailModalShow, setMailModalShow] = useState(false);
  const [hasAccounts, setHasAccounts] = useState(false);
  const { documentGroups, allDocuments } = useFetchMails("mails_imapclient");
  const accounts = useFetchAccounts("accounts");
  const user = useContext<UserContextType>(AuthContext);
  // const user = false;
  const docs_important = documentGroups.important;
  const docs_reply = documentGroups.reply;
  const docs_information = documentGroups.information;
  const docs_noreply = documentGroups.noreply;
  const docs_delete = documentGroups.delete;
  const [openSnack, setOpenSnack] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDoc, setSelectedDoc] = useState(docs_important[0]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFBs, setShowFBs] = useState(true);
  const [showFBModals, setShowFBModals] = useState(false);
  useEffect(() => {
    console.log(accounts);
    if (!user) {
      setHasAccounts(true);
    } else {
      if (accounts) {
        setHasAccounts(true);
      } else {
        setHasAccounts(false);
      }
    }
  }, [accounts, user]);
  function convertActionType(category: any) {
    switch (category) {
      case "reply":
        return ActionType.Reply;
      case "information":
        return ActionType.Information;
      case "delete":
        return ActionType.Delete;
      case "important":
        return ActionType.Important;
      case "date":
        return ActionType.Date;
      default:
        return ActionType.Reply;
    }
  }

  type Direction = "next" | "previous";

  const getAdjacentDocument = (direction: Direction): DocumentData | null => {
    if (!selectedCategory || selectedIndex === null || selectedIndex < 0)
      return null;

    const categories = Object.keys(documentGroups);
    const currentCategoryIndex = categories.indexOf(selectedCategory);
    const docsInCurrentCategory =
      documentGroups[selectedCategory as keyof typeof documentGroups];

    let nextCategoryIndex: number, nextDocIndex: number;
    if (direction === "next") {
      nextCategoryIndex = currentCategoryIndex + 1;
      nextDocIndex = selectedIndex + 1;
    } else {
      // previous
      nextCategoryIndex = currentCategoryIndex - 1;
      nextDocIndex = selectedIndex - 1;
    }

    if (nextDocIndex >= 0 && nextDocIndex < docsInCurrentCategory.length) {
      return docsInCurrentCategory[nextDocIndex];
    } else if (
      nextCategoryIndex >= 0 &&
      nextCategoryIndex < categories.length
    ) {
      const adjacentCategory = categories[nextCategoryIndex];
      const docsInAdjacentCategory =
        documentGroups[adjacentCategory as keyof typeof documentGroups];
      return direction === "next"
        ? docsInAdjacentCategory[0]
        : docsInAdjacentCategory[docsInAdjacentCategory.length - 1];
    }

    return null;
  };

  const goAdjacentDocument = (direction: Direction) => {
    const adjacentDoc = getAdjacentDocument(direction);
    if (adjacentDoc) {
      setSelectedDoc(adjacentDoc);
      setSelectedIndex(
        direction === "next"
          ? selectedIndex !== null
            ? selectedIndex + 1
            : 0
          : selectedIndex !== null
          ? selectedIndex - 1
          : 0,
      );
    }
  };
  return (
    <>
      <div
        className={`${styles.body} flex min-h-screen w-full items-start justify-start`}
      >
        <NavMenu
          onClickSetting={() => setMailModalShow(true)}
          onClickLogout={() => setSignoutModalShow(true)}
        />
        <div className={`${styles.dashBoard} relative`}>
          <div className={`${styles2.toolBar} ${styles.body}`}>
            <div></div>
            {user ? (
              <Alert severity="info">
                タップで詳細を確認することができます。
              </Alert>
            ) : (
              <Alert severity="info">
                こちらが使用例です。まずはこちらで動作をご覧ください。
                自分のアカウントで使用するにはログインしてください。
              </Alert>
            )}

            <Link href={"/pages/play-ground"}>
              <div className="flex pr-6">
                <AutorenewIcon />
                <p>Bモードに変更</p>
              </div>
            </Link>
          </div>
          {hasAccounts ? (
            <></>
          ) : (
            <div className={styles.noAccount}>
              <h3>あなたはまだメールアドレスを設定していません。</h3>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setMailModalShow(true)}
              >
                メールアカウントを設定
              </Button>
            </div>
          )}
          {hasAccounts?<div className={`${styles.tap}  ${yuseiMagic.className}`}>
            <p>↓タップで動作を確認！</p>
          </div>:<></>}

          {Object.keys(documentGroups).map((category) => (
            <div
              key={category}
              className="container-fluid ml-0"
              style={{ paddingLeft: "10px", paddingRight: "0" }}
            >
              <div className="row">
                {documentGroups[category as keyof typeof documentGroups]
                  .length !== 0 ? (
                  <h2>{category}</h2>
                ) : (
                  <></>
                )}
                {/* <div className={`col-xxl-3 ml-5 mr-5`} />
                <div className={`col-xxl-3 ml-5 mr-5`} /> */}

                {documentGroups[category as keyof typeof documentGroups].map(
                  (doc, index) => (
                   
                      <div className="col-xxl-3" key={doc.id}>
                        <ApproveCard
                          doc={doc}
                          key={doc.id}
                          actionType={convertActionType(doc.category)}
                          messageSummary={doc.mailSummary}
                          replySummary={doc.replySummary}
                          // messageSummary={doc.mSummary}
                          from={doc.fromAdress}
                          onClick={() => {
                            setSelectedDoc(doc);
                            setSelectedCategory(category);
                            setSelectedIndex(index);
                            setModalShow(true);
                          }}
                        />
                      </div>
                  
                  ),
                )}
              </div>
            </div>
          ))}
          <MyModal
            doc={selectedDoc}
            show={modalShow}
            onHide={() => setModalShow(false)}
            message={selectedDoc?.body}
            reply={selectedDoc?.reply}
            goNextDoc={() => goAdjacentDocument("next")}
            goPreviousDoc={() => goAdjacentDocument("previous")}
          />
          <FBModal show={showFBModals} onHide={() => setShowFBModals(false)} />
          <MailAuthModal
            show={mailModalShow}
            onHide={() => setMailModalShow(false)}
            onSuccess={() => setSubscribeSnackShow(true)}
          />
          <SignoutModal
            show={signoutModalShow}
            onHide={() => setSignoutModalShow(false)}
          />

          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={!user}
            message="You are in guest mode! Please sign in."
            key={"not logged in"}
            action={<LoginIcon color="primary" onClick={signIn} />}
            ContentProps={{
              sx: {
                background: "white",
                color: "black",
              },
            }}
          />
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={subscribeSnackShow}
            message="メールの読み込み設定が完了しました。現在、メールに対する応答の作成中です。20秒以上経っても表示されない場合、エラーの可能性があります。"
            key={"subscribed"}
            autoHideDuration={6000}
            action={
              <Button
                color="primary"
                onClick={() => setSubscribeSnackShow(false)}
              >
                OK
              </Button>
            }
            ContentProps={{
              sx: {
                background: "white",
                color: "black",
              },
            }}
          />
        </div>
      </div>
      {showFBs ? (
        <>
          <Meeting />
          <Questionnaire />
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
