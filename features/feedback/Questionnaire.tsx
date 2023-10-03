import styles from "./Feedback.module.css";
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

export default function Questionnaire(){
    return(
        <>
            <a href="https://forms.gle/8VJWcRYcYAzTmLX39" target="_blank" rel="noopener noreferrer">
                <div className={`${styles.questionnaireCircle} fixed right-5 `}>
                    <RequestQuoteIcon/>
                    <p>アンケート</p>
                </div>
            </a>
        </>
    );
}