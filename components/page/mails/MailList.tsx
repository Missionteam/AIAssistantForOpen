"use client";
import Checkbox from "@mui/material/Checkbox";
import styles from "./MailList.module.css";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import "./local.css";
import InboxIcon from "@mui/icons-material/Inbox";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import DraftsIcon from "@mui/icons-material/Drafts";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import useFetchMails, { CategoryA, CategoryB, DocumentGroups } from "features/mail/provider/mailProvider";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import { yuseiMagic } from "@/app/fonts";
import useFetchAccounts from "features/mail/provider/accountsProvider";
import { AuthContext, UserContextType } from "@/lib/firebase-auth/AuthContext";
import Button from "@mui/material/Button";
import MailAuthModal from "features/auth/MailAuthModal";
import ButtonGroup from "@mui/material/ButtonGroup";
import Snackbar from "@mui/material/Snackbar";
import MailTabs from "./mailListTools/MailTabs";
import { is } from "date-fns/locale";
import MailListItem from "./mailListTools/MailListItem";
import { DocumentData } from "firebase/firestore";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function MailList({
  onTap,
  release,
  value,
  setValue,
  isSelectProject,
  setSelectProject,
  isSelectFrom,
  setSelectFrom,
  documentGroups,
  categoryA,
  categoryB,
}: {
  onTap: (doc: any) => void;
  release?: boolean;
  value: number;
  setValue: any;
  isSelectProject: boolean;
  setSelectProject: any;
  isSelectFrom: boolean;
  setSelectFrom: any;
  documentGroups: DocumentGroups;
  categoryA: CategoryA;
  categoryB: CategoryB;
}) {
 
  const [hasAccounts, setHasAccounts] = useState(false);
  const user = useContext<UserContextType>(AuthContext);
  const [mailModalShow, setMailModalShow] = useState(false);
  const [subscribeSnackShow, setSubscribeSnackShow] = useState(false);
  useEffect(() => {
    console.log('Value has changed:', categoryA);
  }, [categoryA]);


  const accounts = useFetchAccounts("accounts");
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

  
  function getCategoryText(category: string) {
    if (category === "task") {
      return "至急";
    } else if (category === "date") {
      return "日程調整";
    } else if (category === "reply") {
      return "タスク";
    } else if (category === "information") {
      return "返信不要";
    } else if (category === "important") {
      return "重要";
    } else if (category === "delete") {
      return "削除";
    } else if(category === "schedule"){
      return "トラブル対応"
    }
    
    else return category;
  }

  return (
    <>
      <div className={`${styles.sheet}`}>
        <div className={`${styles.tools}`}>
          <div>
            <Checkbox sx={{ padding: "0" }} />
            <ArrowDropDownOutlinedIcon />
          </div>
          <RefreshOutlinedIcon onClick={()=>console.log(`value:${value}`)}/>
          <MoreVertOutlinedIcon />
          <Button variant="outlined" color="inherit" style={{ margin: "20px" }}>
            優先度でソート
          </Button>
          <Button variant="outlined" color="inherit" style={{ margin: "20px" }}>
            対応済みは非表示
          </Button>
          <div
            className={`${styles.folderButton}  ${
              isSelectProject
                ? styles.folderButtonSelect
                : styles.folderButtonUnselect
            }`}
            onClick={(e) => {
              setSelectProject(!isSelectProject);
              isSelectProject ? setValue(e,0) : setValue(e,1);
              setSelectFrom(false);
            }}
          >
            プロジェクトで分類
          </div>
          <div
            className={`${styles.folderButton}  ${
              isSelectFrom
                ? styles.folderButtonSelect
                : styles.folderButtonUnselect
            }`}
            onClick={(e) => {
              setSelectFrom(!isSelectFrom);
              isSelectFrom ? setValue(e,0) : setValue(e,1);
              setSelectProject(false);
            }}
          >
            人で分類
          </div>
          <div className={`${styles.rightTools}`}>
            <p>1~50行/8462件</p>
            <KeyboardArrowLeftOutlinedIcon />
            <KeyboardArrowRightOutlinedIcon />
          </div>
        </div>

        <Box
          sx={{ borderBottom: 1, borderColor: "divider", position: "relative" }}
        >
          <MailTabs
            value={value}
            handleChange={setValue}
            a11yProps={a11yProps}
            styles={styles}
            tabs={
              isSelectProject
                ? [
                    { value: 0, title1: " All ", icon: <InboxIcon /> },
                    {
                      value: 1,
                      title1: " Project A ",
                      icon: <PeopleOutlinedIcon />,
                    },
                    {
                      value: 2,
                      title1: " Project B ",
                      icon: <PeopleOutlinedIcon />,
                    },
                    {
                      value: 3,
                      title1: " Project C ",
                      icon: <PeopleOutlinedIcon />,
                    },
                  ]
                : isSelectFrom
                ? [
                    { value: 0, title1: " All ", icon: <InboxIcon /> },
                    {
                      value: 1,
                      title1: " 社内 ",
                      icon: <PeopleOutlinedIcon />,
                    },
                    { value: 2, title1: " A社 ", icon: <PeopleOutlinedIcon /> },
                    { value: 3, title1: " B社 ", icon: <PeopleOutlinedIcon /> },
                  ]
                : [
                    { value: 0, title1: " メイン ", icon: <InboxIcon /> },
                    {
                      value: 1,
                      title1: " プロモーション ",
                      icon: <SellOutlinedIcon />,
                    },
                    {
                      value: 2,
                      title1: " ソーシャル ",
                      icon: <PeopleOutlinedIcon />,
                    },
                  ]
            }
          />
          {/* <p
            className={`${yuseiMagic.className}    absolute bottom-0 ${styles.draftExp}`}
          >
            {" "}
            ↓下書き作成済み
          </p>
          <p
            className={`${yuseiMagic.className}    absolute bottom-0 right-8 ${styles.sortExp}`}
          >
            {" "}
            分類分け済み↓
          </p> */}
        </Box>
        <CustomTabPanel value={value} index={0}>
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
          <List className="relative">
            {Object.keys(documentGroups).map((category) => (
              <div key={category}>
                <MailListItem
                  docs={documentGroups[category as keyof typeof documentGroups]}
                  getRandomBoolean={getRandomBoolean}
                  onTap={onTap}
                  release={release ?? false}
                  styles={styles}
                  getCategoryText={getCategoryText}
                />
              </div>
            ))}
          </List>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {isSelectProject ? (
            <MailListItem
              docs={categoryA.A}
              getRandomBoolean={getRandomBoolean}
              onTap={onTap}
              release={release ?? false}
              styles={styles}
              getCategoryText={getCategoryText}
            />
          ) : isSelectFrom ? (
            <MailListItem
              docs={categoryB.A}
              getRandomBoolean={getRandomBoolean}
              onTap={onTap}
              release={release ?? false}
              styles={styles}
              getCategoryText={getCategoryText}
            />
          ) : (
            <> Item Two</>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {isSelectProject ? (
            <MailListItem
              docs={categoryA.B}
              getRandomBoolean={getRandomBoolean}
              onTap={onTap}
              release={release ?? false}
              styles={styles}
              getCategoryText={getCategoryText}
            />
          ) : isSelectFrom ? (
            <MailListItem
              docs={categoryB.B}
              getRandomBoolean={getRandomBoolean}
              onTap={onTap}
              release={release ?? false}
              styles={styles}
              getCategoryText={getCategoryText}
            />
          ) : (
            <> Item Three</>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          {isSelectProject ? (
            <MailListItem
              docs={categoryA.C}
              getRandomBoolean={getRandomBoolean}
              onTap={onTap}
              release={release ?? false}
              styles={styles}
              getCategoryText={getCategoryText}
            />
          ) : isSelectFrom ? (
            <MailListItem
              docs={categoryB.C}
              getRandomBoolean={getRandomBoolean}
              onTap={onTap}
              release={release ?? false}
              styles={styles}
              getCategoryText={getCategoryText}
            />
          ) : (
            <> Item Four</>
          )}
        </CustomTabPanel>
      </div>
      <MailAuthModal
        show={mailModalShow}
        onHide={() => setMailModalShow(false)}
        onSuccess={() => setSubscribeSnackShow(true)}
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={subscribeSnackShow}
        message="メールの読み込み設定が完了しました。現在、メールに対する応答の作成中です。20秒以上経っても表示されない場合、エラーの可能性があります。"
        key={"subscribed"}
        autoHideDuration={6000}
        action={
          <Button color="primary" onClick={() => setSubscribeSnackShow(false)}>
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
    </>
  );
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const senderNames = [
  "山田 太郎",
  "佐藤 次郎",
  "鈴木 三郎",
  "田中 四郎",
  "高橋 五郎",
  "田村 六郎",
  "Michael Johnson",
  "Sarah Smith",
  "John Doe",
  "Emily Davis",
  "Robert Wilson",
];

export function getRandomSenderName(): string {
  const randomIndex = Math.floor(Math.random() * senderNames.length);
  return senderNames[randomIndex];
}

function getRandomBoolean(): boolean {
  return Math.random() < 0.5;
}
