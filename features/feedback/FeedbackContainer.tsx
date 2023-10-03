import { useState,useContext } from "react";
import styles from "./Feedback.module.css";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { collection, addDoc } from "firebase/firestore";
import { db } from '@/lib/firebase/initialize';
import { AuthContext, UserContextType } from "@/lib/firebase-auth/AuthContext";
import Alert from "@mui/material/Alert";
import MinimizeIcon from '@mui/icons-material/Minimize';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

export default function FeedbackContainer({onClickMinimize,onClickMax}: {onClickMinimize:()=>void,onClickMax:()=>void}) {
  const [feedback, setFeedback] = useState(" ");
  const [showAlert, setShowAlert] = useState(false);
  const user = useContext<UserContextType>(AuthContext);

  const handleSubmit = async () => {
    await addDoc(collection(db, "feedback"), {
        feedback: feedback,
        user: user?.name ?? "",
      });
    setFeedback(" ");
    setShowAlert(true);
  };
  return (
    <>
      <div
        className={`${styles.feedbackContainer} fixed bottom-6 right-5 text-center`}
      >
        <div className={`${styles.header}`}>
          <p className="">フィードバックをお願いします</p>
          <MinimizeIcon className="ml-4 w-5" onClick={onClickMinimize} style={{color:"#9f9f9f"}}/>
          <OpenInFullIcon className="ml-1 w-3  mr-3" onClick={onClickMax} style={{color:"#9f9f9f"}}/>
        </div>
        <div className={`h-6`}></div>
        <div className="flex items-center justify-center pl-6 pr-4">
        <TextField
                    id="standard-basic"
                    multiline
                    label="フィードバック"
                    fullWidth 
                    defaultValue=" "
                    variant="standard"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
          <SendIcon
            className="ml-3"
            onClick={() => {
              handleSubmit();
            }}
          />
         
        </div>
        {showAlert?<Alert severity="success" className="mt-4 mr-4 ml-4 text-left" onClick={()=>{setShowAlert(false)}}>
            ありがとうございます！<br></br>本当に開発の助けになるので、沢山FB頂けると嬉しいです。
            </Alert>:<></>}
      </div>
    </>
  );
}
