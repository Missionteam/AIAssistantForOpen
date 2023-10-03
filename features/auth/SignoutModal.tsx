import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import styles from "../../components/ui/modal/Modal.module.css";
import { auth } from "@/lib/firebase/initialize";
import { useState } from "react";

export default function SignoutModal({
  show,
  onHide,
}: {
  show: boolean;
  onHide: () => void;
}) {

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title id="contained-modal-title-vcenter">
            <h5>メールの認証登録を行ってください。</h5>
          </Modal.Title>
        </Modal.Header> */}
        <Modal.Body
          style={{ width: "100%" }}
          className="flex flex-col items-center"
        >
          <div className="p-8">
            <h6>ログアウトします。</h6>
            
          </div>
        </Modal.Body>
        <Modal.Footer className="w-full">
            <Button
              variant="outlined"
              color="primary"
              className={styles.blue}
              onClick={onHide}
            >
              Cancel
            </Button>
          <div className={styles.blue}>
            <Button
              variant="contained"
              color="primary"
              className={styles.blue}
              onClick={()=>{auth.signOut();onHide()}}
            >
              OK
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
