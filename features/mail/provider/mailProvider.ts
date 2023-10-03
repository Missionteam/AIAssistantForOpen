import { useEffect, useState } from "react";
import {
  DocumentReference,
  collection,
  onSnapshot,
  query,
  doc,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { app, db } from "@/lib/firebase/initialize";
import { AuthContext, UserContextType } from "@/lib/firebase-auth/AuthContext";
import { useContext } from "react";

export interface DocumentData {
  id: string;
  [x: string]: any;
  ref: DocumentReference;
}

export type DocumentGroups = {
  important: DocumentData[];
  reply: DocumentData[];
  task: DocumentData[];
  date: DocumentData[];
  schedule: DocumentData[];
  information: DocumentData[];
  noreply: DocumentData[];
  delete: DocumentData[];
  approved: DocumentData[];
};
export type CategoryA = {
  A: DocumentData[];
  B: DocumentData[];
  C: DocumentData[];
  
};
export type CategoryB = {
  A: DocumentData[];
  B: DocumentData[];
  C: DocumentData[];
}


const useFetchMails = (collectionName: string) => {
  const user = useContext<UserContextType>(AuthContext);
  const [allDocuments, setAllDocuments] = useState<DocumentData[]>([]);
  const [documentGroups, setDocumentGroups] = useState<DocumentGroups>({
    important: [],
    task: [],
    date: [],
    schedule: [],
    reply: [],
    information: [],
    noreply: [],
    delete: [],
    approved: [],
  });
  const [categoryA, setCategoryA] = useState<CategoryA>({
    A: [],
    B: [],
    C: [],
  });
  const [categoryB, setCategoryB] = useState<CategoryB>({
    A: [],
    B: [],
    C: [],
  });
  useEffect(() => {
    let q = query(collection(db, collectionName), orderBy("date"));
    if (user) {
      const userRef = doc(db, "users", user.id);
      q = query(collection(userRef, collectionName), orderBy("date"));
      console.log(userRef);
    } else {
      console.log("no user");
      console.log(user);
    }
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newAllDocuments: DocumentData[] = [];

        let groups: DocumentGroups = {
          important: [],
          task: [],
          date: [],
          schedule: [],
          reply: [],
          information: [],
          noreply: [],
          delete: [],
          approved: [],
        };
        let categoryA: CategoryA = {
          A: [],
          B: [],
          C: [],
        };
        let categoryB: CategoryB = {
          A: [],
          B: [],
          C: [],
        };
        snapshot.forEach((doc) => {
          const rawData = doc.data();
          // console.log(rawData);
          // 指定されたフィールドをデコード
          rawData.body = decryptField(rawData.body);
          rawData.mailSummary = decryptField(rawData.mailSummary);
          rawData.replySummary = decryptField(rawData.replySummary);
          rawData.reply = decryptField(rawData.reply);
          rawData.toAdress = decryptField(rawData.toAdress);
          rawData.fromAdress = decryptField(rawData.fromAdress);
          rawData.subject = decryptField(rawData.subject);
          // const strings = ["A_A", "A_B", "A_C"];
          // const strings2 = [ "B_A", "B_B", "B_C"];
          // const prioritys =["high","middle","low"];
          // const status =["unread","progress","done"];
          // const randomIndex = Math.floor(Math.random() * strings.length);
          // const randomIndex2 = Math.floor(Math.random() * strings2.length);
          // const randomIndex3 = Math.floor(Math.random() * prioritys.length);
          // const randomIndex4 = Math.floor(Math.random() * status.length);
          // const category =strings[randomIndex];
          // const category2 =strings2[randomIndex2];
          // updateDoc(doc.ref, {"tag":[category,category2],"priority":prioritys[randomIndex3],"status":status[randomIndex4]},);
          
          const data: DocumentData = {
            ...rawData,
            id: doc.id,
            ref: doc.ref,
            doc:doc,
          };
          newAllDocuments.push(data);
          if (data.approved === true) {
            groups["approved"].push(data);
            // console.log(data.approved)
          } else if (data.category in groups) {
            groups[data.category as keyof DocumentGroups].push(data);
            if (data.category === "task") {
              console.log(data.category);
            }
            // console.log(groups.reply)
          }
          if(data.tag.includes("A_A")){
            categoryA["A"].push(data);
          }else if(data.tag.includes("A_B")){
            categoryA["B"].push(data);
          }else if(data.tag.includes("A_C")){
            categoryA["C"].push(data);
          }
          if(data.tag.includes("B_A")){
            categoryB["A"].push(data);
          }else if(data.tag.includes("B_B")){
            categoryB["B"].push(data);
          }
          else if(data.tag.includes("B_C")){
            categoryB["C"].push(data);
          }

        });
        
        setDocumentGroups(groups);
        setCategoryA(categoryA);
        setCategoryB(categoryB);
        setAllDocuments(newAllDocuments);
      },
      (error) => console.error(error),
    );

    return () => unsubscribe();
  }, [collectionName, user]);

  return { documentGroups, allDocuments,categoryA,categoryB };
};

export default useFetchMails;


const CryptoJS = require("crypto-js");

const key = CryptoJS.enc.Utf8.parse('UbxQoDiTVLuetNHf');  // UTF8で鍵をパース

function decryptField(encryptedData:any) {
  try {
      const rawData = CryptoJS.enc.Base64.parse(encryptedData);
      const iv = rawData.words.slice(0, 4);  // IVを取得
      const encryptedMessage = rawData.words.slice(4);  // 暗号化されたメッセージを取得

      const cipherParams = CryptoJS.lib.CipherParams.create({
          ciphertext: CryptoJS.lib.WordArray.create(encryptedMessage)
      });

      const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
          iv: CryptoJS.lib.WordArray.create(iv),
          mode: CryptoJS.mode.CBC
      });

      return decrypted.toString(CryptoJS.enc.Utf8).trim();
  } catch (e) {
      // 復号化の試みが失敗した場合、元の文字列をそのまま返す
      console.log(e);
      return encryptedData;
  }
}
