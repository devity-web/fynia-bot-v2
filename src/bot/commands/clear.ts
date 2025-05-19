import {expenseModel} from '../models/expense';
import {endOfMonth, startOfMonth} from 'date-fns';
import {sendMessage} from '../send';
import type {TelegramMessage} from '@/types/telegram';

export const handleClear = async (msg: TelegramMessage) => {
  const today = new Date();
  const start = startOfMonth(today);
  const end = endOfMonth(today);

  await expenseModel.deleteMany({
    chatId: msg.chat.id,
    createdAt: {
      $gte: start,
      $lt: end,
    },
  });

  await sendMessage(msg.chat.id, '🗑️ Your month expenses were cleared.');
};
