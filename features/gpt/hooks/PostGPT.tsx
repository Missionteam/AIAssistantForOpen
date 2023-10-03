import { Message } from "../../../types/custom";
import getResponse from "@/app/api/gpt/responseGPT";


export const useHandleSubmit = (
    setRes: React.Dispatch<React.SetStateAction<string>>,
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    return async (userMessage: string) => {
      try {
        setIsSubmitting(true);
        const response = await getResponse(userMessage);
        // if (response.status !== 200) {
        //   throw (
        //     response.error ||
        //     new Error(`Request failed with status ${response.status}`)
        //   );
        // }
        console.log(response.answer);
        setRes(response.answer);

      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    };
  };