import { useEffect, useState } from 'react';
import { DocumentReference, collection, onSnapshot, query, doc,orderBy } from 'firebase/firestore';
import { app, db } from '@/lib/firebase/initialize';
import { AuthContext,UserContextType } from "@/lib/firebase-auth/AuthContext";
import { useContext } from 'react';
import { TaskItem, TaskList } from 'types/tasks';



const useFetchTasks = (collectionName: string) => {
  const user = useContext<UserContextType>(AuthContext);
  const [allTasks, setAllTasks] = useState<TaskList[]>([]); 

  useEffect(() => {
    let q = query(collection(db, collectionName));
    if(user){
      const userRef = doc(db, "users", user.id);
     q = query(collection(userRef, collectionName));
    }
    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        const newAllDocuments: TaskList[] = [];
        snapshot.forEach((doc) => {
          const data: TaskList = {...doc.data(), title:doc.data().title,tasks:doc.data().tasks as TaskItem[], id: doc.id, ref: doc.ref };
          newAllDocuments.push(data);
            // console.log(groups.reply)  
          });
        setAllTasks(newAllDocuments);
      },
      (error) => console.error(error) 
    );

    return () => unsubscribe();
  }, [collectionName,user]);

  return allTasks;
};

export default useFetchTasks;