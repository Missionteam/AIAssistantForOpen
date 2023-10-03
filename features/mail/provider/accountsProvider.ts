import { useEffect, useState } from "react";
import {
  DocumentReference,
  collection,
  onSnapshot,
  query,
  doc,
} from "firebase/firestore";
import { app, db } from "@/lib/firebase/initialize";
import { AuthContext, UserContextType } from "@/lib/firebase-auth/AuthContext";
import { useContext } from "react";

interface DocumentData {
  id: string;
  [x: string]: any;
  ref: DocumentReference;
}

const useFetchAccounts = (collectionName: string) => {
  const user = useContext<UserContextType>(AuthContext);
  const [hasDocuments, setHasDocuments] = useState<boolean>(true); // [x: string]: DocumentData[
  const [documents, setDocuments] = useState<DocumentData[]>([]);

  useEffect(() => {
    let q = query(collection(db, collectionName));
    if (user) {
      const userRef = doc(db, "users", user.id);
      q = query(collection(userRef, collectionName));
    } else {
      console.log("no user");
      console.log(user);
    }
    const unsubscribe = onSnapshot(q, (snapshot) => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          setHasDocuments(false);
            // return null;
          }else{
            setHasDocuments(true);
          }
      snapshot.forEach((doc) => {
        const data: DocumentData = { ...doc.data(), id: doc.id, ref: doc.ref };
        documents.push(data);
      });
    },
    (error) => console.error(error)
    );
    return () => unsubscribe();
  }, [collectionName, user]);
  if(!hasDocuments){
    return null;}
  return documents;
};

export default useFetchAccounts;
