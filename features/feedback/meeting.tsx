import styles from "./Feedback.module.css";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

export default function Meeting(){
    return(
        <>
          <a href="https://timerex.net/s/terasawawaaa_7513/fe08cd20"  target="_blank" rel="noopener noreferrer">
                <div className={`${styles.meetingCircle} fixed right-5 `}>
                    <ConnectWithoutContactIcon/>
                    <p>Zoomで協力</p>
                </div>
          </a>
        </>
    );
}