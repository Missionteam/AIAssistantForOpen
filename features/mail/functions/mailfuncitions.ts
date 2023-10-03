import {updateDoc} from "firebase/firestore";

export async function approve(doc:any) {
    await updateDoc(doc.ref, {
      approved: true,
    });
  }