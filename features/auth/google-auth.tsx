import axios from "axios";
import { Button } from "@mui/material";

export default function GoogleAuth() {
  const handleOnClick = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/auth/generate-google-oauth-url",
    );
    const { authorizeUrl } = response.data;

    // Google認証ページを別タブで開く
    window.open(authorizeUrl, "_blank");
  };

  return (
    <div>
      <Button
        onClick={handleOnClick}
        autoCapitalize="false"
        sx={{ textTransform: "none" }}
      >
        <img src="/nav-menu/googleCalendar.png" style={{ width: "18px" ,marginRight:"10px"}}></img>
        <p>Googleカレンダーと連携</p>
      </Button>
    </div>
  );
}
