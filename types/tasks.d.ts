import { DocumentReference} from 'firebase/firestore';

export type TaskItem = {
    taskName: string;
    detail: string;
    number: number;
    deadline: string;
  }

export type TaskList = {
  title: string;
  tasks: TaskItem[];
  id: string;
  ref: DocumentReference?;
  [x: string]: any;
}