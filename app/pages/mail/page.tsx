"use client";
import SearchBox from "@/components/page/mails/searchbox";
import styles from "./mail.module.css";
import DehazeIcon from "@mui/icons-material/Dehaze";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import AppsIcon from "@mui/icons-material/Apps";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import InboxIcon from "@mui/icons-material/Inbox";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SendIcon from "@mui/icons-material/Send";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import MailList from "@/components/page/mails/MailList";
import Mail from "@/components/page/mails/Mail";
import { useState,useEffect } from "react";
import { set } from "date-fns";
import Description from "@/components/layout/Description";
import Snackbar from "@mui/material/Snackbar";
import { yuseiMagic } from "@/app/fonts";
import Alert from "@mui/material/Alert";
import Drawer from "@mui/material/Drawer";
import IconWithText from "@/components/ui/iconButton/IconWithText";
import LabelWithText from "@/components/ui/iconButton/LabelWithText";
import LabelIcon from "@mui/icons-material/Label";
import useFetchMails from "features/mail/provider/mailProvider";

export default function Page() {
  const [value, setValue] = useState(0);
  const [openMail, setOpenMail] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [hideDescription, setHideDescription] = useState(false);
  const [openMailSnackbar, setOpenMailSnackbar] = useState(true);
  const [openTapSnackbar, setOpenTapSnackbar] = useState(true);
  const [isSelectProject, setSelectProject] = useState(false);
  const [isSelectFrom, setSelectFrom] = useState(false);
  const { documentGroups, allDocuments, categoryA, categoryB } =
  useFetchMails("mails_imapclient");
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>,newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={`${styles.backGround}`}>
        {/* ヘッダー */}
        <div
          className={`${styles.header} ${styles.backGround} relative`}
          style={{ zIndex: "1202" }}
        >
          <DehazeIcon />
          <img src="/nav-menu/gmail.png" alt="" />
          <h6>Mails</h6>
          <SearchBox />
          <div className={`${styles.icons}`}>
            <HelpOutlineIcon />
            <SettingsIcon />
            <AppsIcon />
          </div>
        </div>

        <div className={`flex h-full w-screen items-start`}>
          <div className="relative w-20">
            <Drawer
              variant="permanent"
              open={openDrawer}
              transitionDuration={2000}
              onMouseEnter={() => setOpenDrawer(true)}
              onMouseLeave={() => setOpenDrawer(false)}
            >
              <div className={`${styles.tools} ${styles.backGround}`}>
                <div className={`h-16`}></div>
                <div className={`${styles.write}`}>
                  <CreateOutlinedIcon />
                  {openDrawer ? <p className={styles.text}>作成</p> : <></>}
                </div>
                <IconWithText
                  icon={<InboxIcon />}
                  text="受信トレイ　　　　7216"
                  styles={styles}
                  open={openDrawer}
                  selected={true}
                />
                <IconWithText
                  icon={<StarBorderIcon />}
                  text="スター付き"
                  styles={styles}
                  open={openDrawer}
                  selected={false}
                />
                <IconWithText
                  icon={<ScheduleIcon />}
                  text="スヌーズ中"
                  styles={styles}
                  selected={false}
                  open={openDrawer}
                />
                <IconWithText
                  icon={<SendIcon />}
                  text="送信済み"
                  styles={styles}
                  selected={false}
                  open={openDrawer}
                />
                <IconWithText
                  icon={<InsertDriveFileOutlinedIcon />}
                  text="下書き"
                  styles={styles}
                  selected={false}
                  open={openDrawer}
                />
                <IconWithText
                  icon={<KeyboardArrowDownOutlinedIcon />}
                  text="もっと見る"
                  styles={styles}
                  selected={false}
                  open={openDrawer}
                />

                <div className={`${styles.add}`}>
                  {openDrawer ? <p className={styles.text}>ラベル</p> : <></>}
                  <AddOutlinedIcon />
                </div>
                <LabelWithText
                  icon={<LabelIcon color="secondary" />}
                  text="プロジェクト"
                  styles={styles}
                  selected={false}
                  open={openDrawer}
                />
                <div
                  className={`${openDrawer ? styles.subLabel : styles.hidden}`}
                >
                  <LabelWithText
                    icon={<LabelIcon color="inherit" />}
                    text="プロジェクトA"
                    styles={styles}
                    selected={false}
                    open={openDrawer}
                    onClick={() => {setValue(1);setSelectProject(true);setSelectFrom(false)}}
                  />
                  <LabelWithText
                    icon={<LabelIcon color="inherit" />}
                    text="プロジェクトB"
                    styles={styles}
                    selected={false}
                    open={openDrawer}
                    onClick={() => {setValue(2);setSelectProject(true);setSelectFrom(false)}}
                  />
                  <LabelWithText
                    icon={<LabelIcon color="inherit" />}
                    text="プロジェクトC"
                    styles={styles}
                    selected={false}
                    open={openDrawer}
                    onClick={() => {setValue(3);setSelectProject(true);setSelectFrom(false)}}
                  />
                </div>
                <LabelWithText
                  icon={<LabelIcon color="secondary" />}
                  text="人"
                  styles={styles}
                  selected={false}
                  open={openDrawer}
                />
                <div
                  className={`${openDrawer ? styles.subLabel : styles.hidden}`}
                >
                  <LabelWithText
                    icon={<LabelIcon color="inherit" />}
                    text="社内"
                    styles={styles}
                    selected={false}
                    open={openDrawer}
                    onClick={() => {setValue(1);setSelectProject(false);setSelectFrom(true)}}
                  />
                  <LabelWithText
                    icon={<LabelIcon color="inherit" />}
                    text="A社"
                    styles={styles}
                    selected={false}
                    open={openDrawer}
                    onClick={() => {setValue(2);setSelectProject(false);setSelectFrom(true)}}
                  />
                  <LabelWithText
                    icon={<LabelIcon color="inherit" />}
                    text="B社"
                    styles={styles}
                    selected={false}
                    open={openDrawer}
                    onClick={() => {setValue(3);setSelectProject(false);setSelectFrom(true)}}
                  />
                  <LabelWithText
                    icon={<LabelIcon color="inherit" />}
                    text="C社"
                    styles={styles}
                    selected={false}
                    open={openDrawer}
                    onClick={() => {setValue(4);setSelectProject(false);setSelectFrom(true)}}
                  />
                  <LabelWithText
                    icon={<LabelIcon color="inherit" />}
                    text="D社"
                    styles={styles}
                    selected={false}
                    open={openDrawer}
                  />
                </div>
              </div>
            </Drawer>
          </div>
          <div className={styles.mainBox}>
            {hideDescription ? (
              // <Alert severity="info" sx={{ width: "100%" }}>
              // AI導入済み。メールを圧倒的に楽にする。
              // </Alert>
              <></>
            ) : (
              <Description hide={() => setHideDescription(true)} />
            )}

            {openMail ? (
              <Mail onBack={() => setOpenMail(false)} doc={selectedDoc} />
            ) : (
              <MailList
                onTap={(doc: any) => {
                  setSelectedDoc(doc);
                  setOpenMail(true);
                  setOpenTapSnackbar(false);
                }}
                value={value}
                setValue={handleChange}
                isSelectProject={isSelectProject}
                setSelectProject={setSelectProject}
                isSelectFrom={isSelectFrom}
                setSelectFrom={setSelectFrom}
                categoryA={categoryA}
                categoryB={categoryB}
                documentGroups={documentGroups}
              />
            )}
          </div>
          <div className={`${styles.tools}`}>
            <img src="/nav-menu/googleCalendar.png" alt="" />
            <img src="/nav-menu/notion.png" alt="" />
            <div className={`${styles.add}`}>
              <AddOutlinedIcon />
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={!openMail && openTapSnackbar}
        message={
          hideDescription
            ? "メールをタップして、AIの対応を見てみよう！"
            : "説明を閉じ、使用を開始しましょう！"
        }
        // onClose={() => setOpenTapSnackbar(false)}

        className={yuseiMagic.className}
        ContentProps={{
          sx: {
            background: "white",
            color: "black",
            borderRadius: "10px",
          },
        }}
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openMail && openMailSnackbar}
        // message={
        //   <p>
        //     このようにAIが下書きを自動で作成しておいてくれます！<br></br>
        //     便利じゃありませんか？
        //   </p>
        // }
        autoHideDuration={3000}
        onClose={() => setOpenMailSnackbar(false)}
        key={"not logged in"}
        className={yuseiMagic.className}
        // ContentProps={{
        //   sx: {
        //     background: "white",
        //     color: "black",
        //     borderRadius: "10px",
        //   },
        // }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          このようにAIが下書きを自動で作成しておいてくれます！<br></br>
          便利じゃありませんか？
        </Alert>
      </Snackbar>
    </>
  );
}
