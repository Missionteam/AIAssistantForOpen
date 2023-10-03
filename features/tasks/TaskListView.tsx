import  Button  from '@mui/material/Button';
import { DocumentReference } from '@firebase/firestore-types'; 
import styles from './tasks.module.css';
import { TaskList } from 'types/tasks';


export default function TaskListView({tasks,hasDetailButton,onClick}: {tasks:TaskList,hasDetailButton?:boolean,onClick?:()=>void}){

  return (
    <div>
      <div className="mt-3 flex items-center justify-start">
      <input type="checkbox" style={{margin:"4px"}}/>

        <h5 className={styles.taskTitle}>{tasks.title}</h5>
        {/* <p>from:{otherProps.fromAddress}</p> */}
        {hasDetailButton ? <Button
          variant="text"
          color="primary"
          size="small"
          onClick={() => {
            // モーダル関連のロジックをここに追加
            if(onClick)
            onClick();
            
            
          }}
        >
          詳細
        </Button>:<></>}
        
      </div>
      <p className={styles.deadline}>締切: {formatDate(tasks.tasks[0].deadline)}</p>
      {/* {tasks.tasks.map((task, index) => (
        <div key={index} className={styles.taskContainer}>
          <input type="checkbox" />
          <div>
            <h6>{task.taskName}</h6>
            {hasDetailButton?<p>description: {task.detail}</p>:<></>}
            <p>締切: {formatDate(task.deadline)}</p>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export function formatDate(input: string) {
    const date = new Date(input);
  
    const month = date.getMonth() + 1;  // JavaScriptの月は0から始まるので1を加える
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
  
    return `${month}/${day} ${hour}:${minute.toString().padStart(2, '0')}`;
  }
  