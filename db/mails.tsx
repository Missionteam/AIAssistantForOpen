import { ReactNode } from "react";
import { ActionType } from "types/actionType";

const mainText = "最近、Microsoft アカウント te**r@outlook.jp にサインインしました。お客様の安全を確保するために、詳細の一部を示します。    国/地域: 日本    日付: 2023/06/13 14:48 (GMT)    サービス: Link to Windows    IP アドレス: 124.110.36.189    お客様がこれを実行した場合は、このメールを無視しても問題ありません。    これを実行した覚えがない場合、悪意のあるユーザーによってセキュリティ情報にアクセスされる恐れがあります。以下に示すご自身の情報を確認して変更できます。    アカウント アクティビティの確認    オプトアウト することも、セキュリティ通知を受け取る場所を変更することもできます。    サービスのご利用ありがとうございます。    Microsoft アカウント チーム";
const mainTextHiroki = "IVS Sandboxご参加の皆さま、\nお世話になっております。IVS Sandbox企画プロデューサーの中村です。\nいよいよIVS2023 KYOTO開催まで3日となりました！IVS Sandboxに当選となった皆さまに改めて直前のご連絡をさせていただきます。\n\n【IVS Sandbox参加者 事前確認事項】\n①当日の集合について\n今回のIVSは「みやこめっせ」「京都ロームシアター」の隣り合った施設2ヶ所を使用しての開催となっています。IVS Sandboxはロームシアターの3F 会議室2を3日間の拠点として活動いたします。\n初日の集合は【6/28 12:00@ロームシアター3F 会議室2】となります。以下の注意点をご確認の上、お気をつけてお越しください。\n万が一遅れる場合、②のSlackチャンネルにて早めのご連絡をいただだければと思います。\nよろしくお願いいたします。\n\n[入場時の注意]\n・パスの受け取りはみやこめっせにて初日は【6/28 11:30】より開始いたします。パスを受け取ってからロームシアターの会議室にお越しいただくようお願いいたします。\n・京都駅からは公共交通機関で40分程度を見越して早めの移動をお願いいたします。\n\n②事前の連絡用Slackへのご参加のお願い\n私の所属しているスタジオとなるStudio ENTREの「Studio ENTREコミュニティ」Slackにて、当日のご連絡などさせていただければと思います。\n1.以下のURLより登録ください。";

const mainTextKai = "p5,p6の皆様、\n\n休日ですが、失礼いたします。現在進行している前期実験ゼミについて、ゼミで発表してもらう内容と担当（全員）、及びレポートの内容（P6の方のみ）を若干変更することになりました。\n変更内容を反映したガイダンス資料を添付しますので、各自ご確認ください。特に、ゼミ課題、同スケジュール、レポートについての記載をよく確認してください。\n質問や、わかりにくいところ、変更によって困ること、また資料内におかしな所があった場合には、遠慮なく僕（松永）にメールしてください。\n急な途中変更でご迷惑をおかけしますが、よろしくお願いします。";

const mainTextNoriko = 
"寺沢遼太郎　様\n\n理学部宇宙物理学教室図書室です。\n以下の図書の貸出期限が過ぎていますので、至急返却願います。\n以前、お電話でも連絡しております。\n図書室が閉室時は入口前の返却ボックスをご利用ください。\n\nGravitational-wave physics and astronomy : an introduction to theory, experiment and data analysis\n請求記号：III-31||C||10\n返却期限日：2022年10月25日\n--\n**---------\n京都大学理学研究科\n宇宙物理学教室図書室\n075-753-3900\nastosho@kusastro.kyoto-u.ac.jp\n伊藤典子\nnitoh@kusastro.kyoto-u.ac.jp\n---------**";

export const mails: Mail[] = [
  {
    id:0,
    title:"ご使用の Microsoftアカウントで新しいサインインが検出されました",
    to: "test1@outlook.jp",
    date:"2023/07/01 23:48",
    from:"noreply@microsoft.com",
    main: mainText,
    snippet:"ご使用のマイクロソフトアカウントで新しいサインインが検出されました。Microsoftアカウントに",
    reply:"Here are reply",
    replySummery:"Here are reply summery",
    actionType:ActionType.Delete,
  },
  {
    id:1,
    title:"【IVS Sandbox】IVS2023 KYOTO直前のご案内",
    to: "terasawawaaa@gmail.com",
    date:"2023/06/26 0:48",
    from:"test2@startup-studio.jp",
    main: mainTextHiroki,
    snippet:"【IVS Sandbox】IVS2023 KYOTO直前のご案内　IVSSandboxご参加の皆さま お世話になっております。",
    reply:"Here are reply",
    replySummery:"Here are reply summery",
    actionType:ActionType.Reply,
  },
  {
    id:2,
    title:"[P5-2022] 進捗mtgの内容について",
    to: "test2@tap.scphys.kyoto-u.ac.jp; p6@cr.scphys.kyoto-u.ac.jp; 高田淳史; Uchida Hiroyuki ",
    date:"2023/06/28 23:48",
    from:"test2@-st.kyoto-u.ac.jp",
    main: mainTextKai,
    snippet:"[P5-2022] 進捗mtgの内容について p5,p6の皆様、休日ですが失礼いたします。現在、",
    reply:"Here are reply",
    replySummery:"Here are reply summery",
    actionType:ActionType.Reply,
  },
  {
    id:3,
    title:"再送【督促】貸出図書返却のお願い",
    to: "terasawar@outlook.jp",
    date:"2023/05/28 23:48",
    from:"test2@kusastro.kyoto-u.ac.jp",
    main: mainTextNoriko,
    snippet:"再送【督促】貸出図書返却のお願い  寺沢遼太郎　様\n\n理学部宇宙物理学教室図書室です。",
    reply:"Here are reply",
    replySummery:"Here are reply summery",
    actionType:ActionType.Important,
  },
];



export type Mail = {
  id: number;
  title: string;
  to: string;
  date: string;
  from: string;
  main: string;
  snippet:string;
  reply:string;
  replySummery:string;
  actionType:ActionType;
};
