import GoogleButton from "react-google-button";
import signIn from "../../../features/signup/signIn";

export default function MyGoogleButton() { 
 
  return (
    <>
      <GoogleButton type="light" onClick={signIn} />
    </>
  );
}

