import useSetText from "features/document/hooks/SetText";

function responseHandler(res: String) {
  // const re = /object\((.*?)\)/;
  // const match = res.match(re);
  // if (match && match[1]) {
  //   return match[1] ;
  // } else {
  //     return 'No Object';
  // }
}

export default function useSetDoc(text: string) {
  // useSetText('object',responseHandler(text))
  useSetText("object", "");
}
