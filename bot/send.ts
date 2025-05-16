import {config} from './utils/env';

interface SendMessageOptions {
  text: string;
  callback_data: string;
}

export const sendMessage = async (
  chatId: number,
  text: string,
  opts: SendMessageOptions[] = [],
) => {
  const url = `https://api.telegram.org/bot${config.TELEGRAM_TOKEN}/sendMessage`;
  const body = {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [[...opts]],
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }
};
