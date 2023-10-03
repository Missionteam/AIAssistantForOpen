// "use client";
// import SearchBox from "@/components/page/mails/searchbox";
// import styles from "./mail.module.css";
// import DehazeIcon from "@mui/icons-material/Dehaze";
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
// import SettingsIcon from "@mui/icons-material/Settings";
// import AppsIcon from "@mui/icons-material/Apps";
// import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
// import InboxIcon from "@mui/icons-material/Inbox";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
// import ScheduleIcon from "@mui/icons-material/Schedule";
// import SendIcon from "@mui/icons-material/Send";
// import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
// import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
// import MailList from "@/components/page/mails/MailList";
// import Mail from "@/components/page/mails/Mail";
// import { useContext, useState } from "react";
// import { set } from "date-fns";
// import Description from "@/components/layout/Description";
// import Snackbar from "@mui/material/Snackbar";
// import { yuseiMagic } from "@/app/fonts";
// import Alert from "@mui/material/Alert";
// import { Button } from "@mui/material";
// import signIn from "features/signup/signIn";
// import { AuthContext, UserContextType } from "@/lib/firebase-auth/AuthContext";

// export default function Page() {
//   const [openMail, setOpenMail] = useState(false);
//   const [value, setValue] = useState(0);

//   const [selectedDoc, setSelectedDoc] = useState(null);
//   const [hideDescription, setHideDescription] = useState(false);
//   const [openMailSnackbar, setOpenMailSnackbar] = useState(true);
//   const [openTapSnackbar, setOpenTapSnackbar] = useState(true);
//   const user = useContext<UserContextType>(AuthContext);
//   const [isSelectProject, setSelectProject] = useState(false);
//   const [isSelectFrom, setSelectFrom] = useState(false);

//   return (
//     <>
//       <div className={`${styles.backGround}`}>
//         {/* ヘッダー */}
//         <div className={`${styles.header}`}>
//           <DehazeIcon />
//           <img src="/nav-menu/gmail.png" alt="" />
//           <h6>Mails</h6>
//           <SearchBox />
//           <div className={`${styles.icons}`}>
//             <HelpOutlineIcon />
//             <SettingsIcon />
//             <AppsIcon />
//           </div>
//         </div>

//         <div className={`flex h-full w-screen items-start`}>
//           <div className={`${styles.tools} ${styles.backGround}`}>
//             <div className={`${styles.write}`}>
//               <CreateOutlinedIcon />
//             </div>
//             <InboxIcon />
//             <StarBorderIcon />
//             <ScheduleIcon />
//             <SendIcon />
//             <InsertDriveFileOutlinedIcon />
//             <KeyboardArrowDownOutlinedIcon />
//             <div className={`${styles.add}`}>
//               <AddOutlinedIcon />
//             </div>
//           </div>
//           <div className={styles.mainBox}>
//             {user ? (
//               // <Alert severity="info" sx={{ width: "100%" }}>
//               // AI導入済み。メールを圧倒的に楽にする。
//               // </Alert>
//               <></>
//             ) : (
//               <div className={`${styles.forUse}`}>
//                 <p>こちらからサインインしてください→　</p>
//                 <Button variant="contained" onClick={signIn}>
//                   サインイン
//                 </Button>
//               </div>
//             )}

//             {openMail ? (
//               <Mail
//                 onBack={() => setOpenMail(false)}
//                 doc={selectedDoc}
//                 release
//               />
//             ) : (
//               <MailList
//                 release
//                 onTap={(doc: any) => {
//                   setSelectedDoc(doc);
//                   setOpenMail(true);
//                   setOpenTapSnackbar(false);
//                 }}
//                 value={value}
//                 setValue={setValue}
//                 isSelectFrom={isSelectFrom}
//                 setSelectFrom={setSelectFrom}
//                 isSelectProject={isSelectProject}
//                 setSelectProject={setSelectProject}
//               />
//             )}
//           </div>
//           <div className={`${styles.tools}`}>
//             <img src="/nav-menu/googleCalendar.png" alt="" />
//             <img src="/nav-menu/notion.png" alt="" />
//             <div className={`${styles.add}`}>
//               <AddOutlinedIcon />
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* <Snackbar
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//         open={!openMail && openTapSnackbar}
//         message={
//           hideDescription
//             ? "メールをタップして、AIの対応を見てみよう！"
//             : "説明を閉じ、使用を開始しましょう！"
//         }
//         key={"not logged in"}
//         // onClose={() => setOpenTapSnackbar(false)}

//         className={yuseiMagic.className}
//         ContentProps={{
//           sx: {
//             background: "white",
//             color: "black",
//             borderRadius: "10px",
//           },
//         }}
//       /> */}
//       <Snackbar
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//         open={openMail && openMailSnackbar}
//         // message={
//         //   <p>
//         //     このようにAIが下書きを自動で作成しておいてくれます！<br></br>
//         //     便利じゃありませんか？
//         //   </p>
//         // }
//         autoHideDuration={3000}
//         onClose={() => setOpenMailSnackbar(false)}
//         key={"not logged in"}
//         className={yuseiMagic.className}
//         // ContentProps={{
//         //   sx: {
//         //     background: "white",
//         //     color: "black",
//         //     borderRadius: "10px",
//         //   },
//         // }}
//       >
//         <Alert severity="success" sx={{ width: "100%" }}>
//           このようにAIが下書きを自動で作成しておいてくれます！<br></br>
//           便利じゃありませんか？
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }
