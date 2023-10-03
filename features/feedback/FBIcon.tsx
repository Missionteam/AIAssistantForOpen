import styles from "./Feedback.module.css";
import AddIcon from '@mui/icons-material/Add';

export default function FBIcon({onClick}:{onClick:()=>void}){
    return(
        <>
            
                <div className={`${styles.FBIcon} fixed right-5 `} onClick={onClick}>
                    <AddIcon/>
                    <p>FB</p>
                </div>
            
        </>
    );
}