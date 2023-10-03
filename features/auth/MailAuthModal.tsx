import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import styles from "../../components/ui/modal/Modal.module.css";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { AuthContext, UserContextType } from "@/lib/firebase-auth/AuthContext";
import { error } from "console";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { el } from "date-fns/locale";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function MailAuthModal({
  show,
  onHide,
  onSuccess,
}: {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
}) {
  const [showProgress, setShowProgress] = useState(false);
  const [showPassForm, setShowPassForm] = useState(false);
  const [imapserver, setImapserver] = useState<String | null>();
  const [providerName, setProviderName] = useState(""); // ["gmail", "yahoo", "outlook"
  const [showAlert, setShowAlert] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const user = useContext<UserContextType>(AuthContext);
  const handleEmailSubmit = async () => {
    setShowProgress(true);
    const resOfGetServer = await axios.post(
      "http://128.199.89.163:8000/gpt/getImapServer",
      // "http://localhost:8000/gpt/getImapServer",
      {
        email: email,
      },
    );
    setShowProgress(false);
    setImapserver(resOfGetServer.data.imapServer);
  };
  useEffect(() => {
    if (imapserver === "imap.gmail.com") {
      setShowAlert(false);
      setShowPassForm(true);
    } else if (imapserver === "imap.outlook.office365.com") {
      setShowAlert(false);
      setShowPassForm(true);
    } else if (imapserver) {
      setShowAlert(false);
      setShowPassForm(true);
    }
  }, [imapserver]);
  const handlePassSubmit = async () => {
    try {
      //   const response = await axios.post("/api/process_password", { password });
      //   console.log(response.data.message);
      setShowProgress(true);
      if (!user) {
        console.log("user is null");
        return;
      }
      const res = await axios.post(
        "http://128.199.89.163:8000/gpt/save-password",
        // "http://localhost:8000/gpt/save-password",
        {
          uid: user?.id,
          email: email,
          password: password,
          host: imapserver,
        },
      );
      if (res.status !== 200 || res.data.accountId === null) {
        console.log(res);
        return;
      }
      const subscribeRes = await axios.post(
        "http://128.199.89.163:8000/gpt/subscribe-mails",
        //  "http://localhost:8000/gpt/subscribe-mails",
        {
          uid: user?.id,
          accountId: res.data.accountId,
          host: imapserver,
        },
      );
      // const fetchMailsRes = await axios.post(
      //   "http://128.199.89.163:8000/gpt/fetch-mails",
      //   // "http://localhost:8000/gpt/fetch-mails",
      //   {
      //     uid: user?.id,
      //     accountId: res.data.accountId,
      //     host: imapserver,
      //   },
      // );
      if (
        // fetchMailsRes.status  === 200||
        subscribeRes.status === 200
      ) {
        console.log("subscribe success");
        // console.log(fetchMailsRes);
        setShowProgress(false);
        onHide();
        onSuccess();
      } else {
        setShowProgress(false);
        setShowAlert(true);
      }
    } catch (error) {
      console.error(error);
      setShowProgress(false);
      setShowAlert(true);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title id="contained-modal-title-vcenter">
            <h5>メールの認証登録を行ってください。</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ width: "100%" }}
          className="relative flex flex-col items-center "
        >
          <div className="absolute left-3 top-3">
            {showPassForm ? (
              <ArrowBackIcon
                onClick={() => {
                  setShowPassForm(false);
                  setImapserver(null);
                }}
                color="inherit"
              />
            ) : (
              <></>
            )}
          </div>
          {showProgress ? (
            <CircularProgress className="absolute top-3" />
          ) : (
            <></>
          )}
          <div className="p-8">
            {!showPassForm ? (
              <div>
                <p className="mb-2">メールアドレス</p>
                <TextField
                  id="outlined-mail-input"
                  label="mail address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            ) : imapserver == "imap.gmail.com" ? (
              <div className="flex flex-col items-center">
                <p className="mb-2 text-center">{email}</p>
                <Alert severity="success">
                  Gmailの認証には、「アプリパスワード」というものが必要です。
                </Alert>
                <div
                  className={`mb-4 ml-16 mr-16 mt-4 p-4 ${styles.informationBox}`}
                >
                  <h6 className="mb-2">Gmailのアプリパスワードの生成方法</h6>
                  <p>
                    1.{" "}
                    <a
                      href="https://myaccount.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Googleアカウント
                    </a>
                    に移動します。
                  </p>
                  <p>2. {"[セキュリティ]を選択します。"}</p>
                  <p>
                    3.{" "}
                    {
                      "[Google にログインする方法] で [2 段階認証プロセス] を選択します。"
                    }
                  </p>
                  <p>
                    4. {"ページの下部にある [アプリ パスワード] を選択します。"}
                  </p>
                  <p>
                    5.「アプリを選択」で「その他 (名前を入力) 」を選択し、「AI
                    Assistant」など任意の名前をつけてください。
                  </p>
                  <p>6. {"[生成] を選択します。"}</p>
                  <p>7. 表示されたパスワードを、以下に入力してください。</p>
                </div>

                <div>
                  <p className="mb-2">アプリパスワード</p>

                  <TextField
                    id="outlined-password-input"
                    label="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center">
                  <p className="mb-2 text-center">{email}</p>
                  {!showAlert ? (
                    <Alert severity="success">
                      outlook等のメールアドレスでは、パスワードを入力後、一度認証が否認される場合があります。その際は、outlookのメールボックスに、Microsoftから認証を許可するか尋ねる旨のメールが送信されている場合がありますので、そちらから認証を許可してください。
                    </Alert>
                  ) : (
                    <></>
                  )}

                  <div>
                    <p className="mb-2">アプリパスワード</p>

                    <TextField
                      id="outlined-password-input"
                      label="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                {showAlert ? (
                  <>
                    <Alert severity="success">
                      outlookのメールボックスにセキュリティ通知のメールが届いていないか確認してください。<br></br>
                      届いていた場合は、メールの記載通りに対応後、もう一度、登録ボタンを押してください。<br></br>
                      届いておらず認証できなかった場合は、ヒアリング時に確認いたしますので、試験運用無しでヒアリングにお越しいただいても大丈夫です。
                    </Alert>
                    <div className={`h-3`}>
                        
                    </div>
                    <Alert severity="warning">
                      また、どうもログインできなさそうな様子でしたら、ヒアリングをキャンセルし試験運用代500円を受け取って頂くこともできますので、ご検討下さい。
                    </Alert>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>

          {/* {showAlert ? (
            <Alert severity="warning">
              申し訳ございません。このメールアドレスは現在対応しておりません。
              <br></br>もしよろしければ、FB
              Boxから送信出来なかったアドレスをお教え頂けましたらとてもありがたいです…！
            </Alert>
          ) : (
            <></>
          )} */}
        </Modal.Body>
        <Modal.Footer className="w-full">
          <div className={styles.blue}>
            {!showPassForm ? (
              <Button
                variant="contained"
                color="primary"
                className={styles.blue}
                disabled={showProgress}
                onClick={handleEmailSubmit}
              >
                {showProgress ? "Loading..." : "次へ"}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                className={styles.blue}
                disabled={showProgress}
                onClick={handlePassSubmit}
              >
                {showProgress ? "Loading..." : "登録"}
              </Button>
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
