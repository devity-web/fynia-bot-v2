export type TelegramMessage = {
  message_id: number;
  from: {
    id: number;
    is_bot: boolean;
    first_name: string;
    username: string;
  };
  chat: {
    id: number;
    first_name: string;
    username: string;
    type: string;
  };
  date: number;
  text: string;
};

export type TelegramCallback = {
  id: string;
  from: {
    id: number;
    is_bot: boolean;
    first_name: string;
    username: string;
  };
  message: TelegramMessage;
  data: string;
};

export type WebhookBody = {
  update_id: number;
  message: TelegramMessage;
  callback_query?: TelegramCallback;
};
