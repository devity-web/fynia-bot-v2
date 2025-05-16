import {chatModel} from '../models/chat';
import {getMoneyFormat} from '../utils/money';

export const getChat = async (chatId: number) => {
  const chat = await chatModel.findOne({chatId});

  if (!chat) {
    throw new Error('Chat not found');
  }

  const moneyFormat = getMoneyFormat(chat);

  return {
    chat,
    moneyFormat,
  };
};
