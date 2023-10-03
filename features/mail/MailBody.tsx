import { mails } from "db/mails";
import styles from "./Mail.module.css";
import TextWithLineBreaks from "utils/text/LineBreaks";

export default function MailBody({ doc }: { doc: any }) {
  return (
    <>
      
        <div className={styles.mailBody}>
          <h3 className="" style={{ fontSize: "20px" }}>
            {doc?.subject}
          </h3>
          <div className="flex justify-start pt-2">
            <div
              className={styles.userIcon}
              style={{ borderRadius: "50%", width: "40px", height: "40px" }}
            >
              MS
            </div>
            <div>
              <h4 className="" style={{ fontSize: "18px" }}>
                {doc?.fromAdress}
              </h4>
              <p>{doc?.date.toDate().toISOString()}</p>
            </div>
          </div>
          <div>
            <p>宛先：{doc?.toAdress}</p>
          </div>
          <div className={styles.mailMain}>
            <p>
              <TextWithLineBreaks text={doc?.body}></TextWithLineBreaks>
            </p>
          </div>
        </div>
    </>
  );
}
