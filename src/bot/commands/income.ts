import type {TelegramMessage} from '@/types/telegram';
import {chatModel} from '../models/chat';
import {sendMessage} from '../send';
import {getChat} from '../use-case/get-chat';

export const handleIncome = async (msg: TelegramMessage) => {
  const chat = await getChat(msg.chat.id);
  const income = Number.parseInt(msg.text.trim().split(' ')[1], 10);

  await chatModel.updateOne(
    {chatId: msg.chat.id},
    {
      $set: {
        income,
      },
    },
  );

  await sendMessage(msg.chat.id, 'Sua receita foi atualizada com sucesso.');
};
