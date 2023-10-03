import { mails } from "db/mails";
import styles from "./Mail.module.css";
import TextWithLineBreaks from "utils/text/LineBreaks";

export default function MailBody({doc}:{doc:any}) {
  return (
    <>
      <div className={styles.mailHeader}></div>
      <div className={styles.mailBody}>
        <h3 className="" style={{ fontSize: "20px" }}>
        Re:{doc?.subject}
        </h3>
        <div className="flex pt-2 justify-start">
          <div
            className={styles.myIcon}
            style={{ borderRadius: "50%", width: "40px", height: "40px" }}
          >
            Ai
          </div>
          <div>
          <h4 className="" style={{fontSize:"18px"}}>{doc?.toAdress}</h4>
          <p>{doc?.date.toDate().toISOString()}</p>
          </div>          
        </div>
        <div><p>宛先：{doc?.fromAdress}</p></div>
        <div className={styles.mailMain}>
            <p>
              <TextWithLineBreaks text={doc?.reply}></TextWithLineBreaks>
              </p>
        </div>
      </div>
    </>
  );
}
