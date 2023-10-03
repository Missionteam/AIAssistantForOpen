import { GoogleAuthProvider, signInWithPopup,signInWithRedirect } from "firebase/auth";
import { auth } from "@/lib/firebase/initialize";


const provider = new GoogleAuthProvider();
export default function signIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("logined");
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
        console.log("error");
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }