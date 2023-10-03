import Modal from "react-bootstrap/Modal";
import styles from "./Modal.module.css";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import "./local.css";
import TextWithLineBreaks from "utils/text/LineBreaks";
export default function MailBodyModal({
  doc,
  message,
  subject,
  fromAdress,
  show,
  onHide,
}: {
  doc?: any;
  message: string;
  subject: string;
  fromAdress: string;
  show: boolean;
  onHide?: () => void;
  goNextDoc?:()=>void;
  goPreviousDoc?:()=>void;
  
}) {
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="mailBodyModal"
      >
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title id="contained-modal-title-vcenter">
            {/* <h5>以下の内容で対応しました。</h5> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "0"}}>
          <div className={`${styles.main}`}>
            <div className="flex flex-col">
              <div className={styles.mailContainer}>
                {subject ? subject : "件名なし"} 
              </div>
              <div className={styles.mailContainer}>{fromAdress}</div>
              <div
                className={`${styles.mailContainer} flex-grow`}
                style={{ flexGrow: "1" }}
              >
                <TextWithLineBreaks text={message} />
              </div>
            </div>
           
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
