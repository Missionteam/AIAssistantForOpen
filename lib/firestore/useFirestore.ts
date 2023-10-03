import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/initialize';

interface DocumentData {
  id: string;
  [x: string]: any;
}

const useFirestore = (collectionName: string) => {
  const [documents, setDocuments] = useState<DocumentData[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, collectionName),
      (snapshot) => {
        let docs: DocumentData[] = [];
        snapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(docs);
      },
      (error) => console.error(error)
    );

    return () => unsubscribe();
  }, [collectionName]);

  return documents;
};

export default useFirestore;
