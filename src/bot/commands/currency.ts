import type {TelegramMessage} from '@/types/telegram';
import {sendMessage} from '../send';

export const handleCurrency = async (msg: TelegramMessage) => {
  await sendMessage(msg.chat.id, 'Choose an option:', [
    {text: 'EUR', callback_data: 'eur'},
    {text: 'GBP', callback_data: 'gbp'},
    {text: 'USD', callback_data: 'usd'},
    {text: 'BRL', callback_data: 'brl'},
  ]);
};
