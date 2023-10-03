export enum ActionType {
    Reply = 'Reply',
    Delete = 'Delete',
    Important = 'Important',
    Date = 'date',
    Information = 'information'
  }


 export const actionData: Record<ActionType, { title: string, imagePath: string }> = {
    [ActionType.Reply]: {
        title: 'Reply the Message',
        imagePath: '/approve-card/mailchimp.png',
    },
    [ActionType.Delete]: {
        title: 'Delete the Spam mail',
        imagePath: '/approve-card/delete.png',
    },
    [ActionType.Important]: {
        title: 'Important mail',
        imagePath: '/approve-card/stripe.png',
    },
    [ActionType.Date]: {
        title: 'Scheduling the Date',
        imagePath: '/approve-card/stripe.png',
    },
    [ActionType.Information]: {
        title: 'Information',
        imagePath: '/approve-card/stripe.png',
    },
  };


  