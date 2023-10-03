import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import { useState, useContext } from "react";
import styles from "./Feedback.module.css";

import TextField from "@mui/material/TextField";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/initialize";
import { AuthContext, UserContextType } from "@/lib/firebase-auth/AuthContext";
import Alert from "@mui/material/Alert";
import { fontSize } from "@mui/system";

export default function FBModal({
  show,
  onHide,
}: {
  show: boolean;
  onHide: () => void;
}) {
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
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        
      >
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
            {/* <h5>以下の内容で対応しました。</h5> */}
            <p style={{fontSize:"16px"}}>フィードバック</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ width: "100%", overflow: "visible", padding: "0" }}
        >
          <div
            className={`${styles.feedbackModal}`}
          >
            
            <div className="flex items-center justify-center pl-6 pr-4">
              <TextField
                id="standard-basic"
                multiline
                label="フィードバック"
                fullWidth
                rows={3}
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
            {showAlert ? (
              <Alert
                severity="success"
                className="ml-4 mr-4 mt-4 text-left"
                onClick={() => {
                  setShowAlert(false);
                }}
              >
                ありがとうございます！<br></br>
                本当に開発の助けになるので、沢山のFBを頂けると嬉しいです。
              </Alert>
            ) : (
              <></>
            )}
          </div>
        </Modal.Body>
        {/* <Modal.Footer className="w-full">
          
        </Modal.Footer> */}
      </Modal>
    </>
  );
}
