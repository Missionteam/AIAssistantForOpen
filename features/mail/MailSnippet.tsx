import styles  from "./Mail.module.css"
export default function MailSnippet({doc,onTap}:{doc:any,onTap:()=>void}){
    const date = doc?.date.toDate()
    const formattedString = `${date?.getUTCMonth() + 1}月${date?.getUTCDate()}日`;
    return(
        <>
        <div onClick={onTap} className={styles.clickable}>
            <div className={styles.mailSnippetDate}>
                  <p className="px-2 py-2 m-0">{formattedString}</p>
              </div>
              <div className={styles.mailSnippetMainBox}>
                  <p className="p-2">{doc.subject}</p>
              </div>
        </div>
        </>
    );
}
