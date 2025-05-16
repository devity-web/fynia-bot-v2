import type {TelegramCallback} from '@/types/telegram';
import {chatModel} from './models/chat';
import {sendMessage} from './send';

export const handleCallback = async (callback: TelegramCallback) => {
  const msg = callback.message;
  const data = callback.data;

  if (!msg || !data) {
    return;
  }

  const chatId = msg.chat.id;

  const chat = await chatModel.findOne({
    chatId,
  });

  if (!chat) {
    await chatModel.create({
      chatId,
      currency: data.toUpperCase(),
    });
  } else {
    await chatModel.updateOne(
      {
        chatId,
      },
      {
        currency: data.toUpperCase(),
      },
    );
  }

  sendMessage(chatId, `⚙️ Moeda alterada para ${data.toUpperCase()}`);
};
