import { useEffect, useState } from 'react';
import { DocumentReference, collection, onSnapshot, query, doc,orderBy } from 'firebase/firestore';
import { app, db } from '@/lib/firebase/initialize';
import { AuthContext,UserContextType } from "@/lib/firebase-auth/AuthContext";
import { useContext } from 'react';
import { TaskItem, TaskList } from 'types/tasks';



const useFetchDate = () => {
  const user = useContext<UserContextType>(AuthContext);
  const [alldates, setAllDates] = useState<any[]>([]); 

  useEffect(() => {
    let q = query(collection(db, "dates"),orderBy("start"));
    if(user){
      const userRef = doc(db, "users", user.id);
     q = query(collection(userRef, "dates"),orderBy("start"));
    }
    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        const newAllDocuments :any[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          console.log(data.start);
          const date = { ...data,title:data.title,start:data.start, id: doc.id, ref: doc.ref };
          newAllDocuments.push(date);

            // console.log(groups.reply)
          });
        setAllDates(newAllDocuments);
      },
      (error) => console.error(error)
    );

    return () => unsubscribe();
  }, [user]);

  return alldates;
};

export default useFetchDate;