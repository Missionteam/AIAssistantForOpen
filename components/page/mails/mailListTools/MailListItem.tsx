import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { getRandomSenderName } from "../MailList";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import { DocumentData } from "features/mail/provider/mailProvider";

export default function MailListItem({
  docs,
  getRandomBoolean,
  onTap,
  release,
  styles,
  getCategoryText,
}: {
  docs: DocumentData[];
  getRandomBoolean: any;
  onTap: any;
  release: boolean;
  styles: any;
  getCategoryText: any;
}) {
  return (
    <>
      {docs.map((doc, index) => {
        const selected = getRandomBoolean();
        return (
          <ListItem
            disablePadding
            divider
            className={`${styles.list}`}
            key={index}
          >
            <ListItemButton
              selected={selected}
              dense
              onClick={() => onTap(doc)}
            >
              <ListItemIcon>
                <Checkbox sx={{ padding: "0" }} />
                <StarBorderIcon />
                <div
                  className={`${styles.priority} ${styles[doc.priority]}`}
                ></div>
              </ListItemIcon>

              <p className={`${selected ? "" : styles.heavy} ${styles.from} ${selected? styles[doc.status]:""}`}>
                {release
                  ? doc.fromAdress.replace(/<.*?>/g, "")
                  : getRandomSenderName()}
              </p>
              <p className={`${selected ? "" : styles.heavy} ${selected? styles[doc.status]:""}`}>{doc.subject}-</p>
              <p className={`${styles.mailText} ${selected? styles[doc.status]:""}`}>{doc.body}</p>
              <p className={styles.commingDate}>{`${
                doc?.date.toDate().getUTCMonth() + 1
              }/${doc?.date.toDate().getUTCDate()}/23`}</p>
              <div className={`${styles.tagContainer}`}>
                <div
                  className={`${styles.tag}  ${
                    doc.approved ? styles.approved : styles[doc.category]
                  }`}
                >
                  {getCategoryText(doc?.category)}
                </div>
              </div>
              {/* <div className={`${styles.ai}`}>
                            {selected ? (
                              <img src="/assistant-logo.png" alt="" />
                            ) : (
                              <DownloadDoneIcon />
                            )}

                            {selected ? <p>AIが対応済</p> : <p>完了</p>}
                          </div> */}
              <p className={styles.commingDate}>{`12/12/23`}</p>
            </ListItemButton>
          </ListItem>
        );
      })}
    </>
  );
}
