import type {TelegramMessage} from '@/types/telegram';
import {categoryModel} from '../models/category';
import {expenseModel} from '../models/expense';
import {getCategoryAndValue} from '../openai';
import {sendMessage} from '../send';
import {getChat} from '../use-case/get-chat';

export const handleDefault = async (msg: TelegramMessage) => {
  const chat = await getChat(msg.chat.id);

  const categoryAndValue = await getCategoryAndValue(msg.text ?? '');

  if (categoryAndValue.value <= 0) {
    throw new Error('Valor deve ser maior que 0');
  }

  const category = await categoryModel.findOne({
    name: categoryAndValue.category,
  });

  if (!category) {
    throw new Error(`Categoria ${categoryAndValue.category} não encontrada`);
  }

  await expenseModel.create({
    value: categoryAndValue.value,
    category: {
      _id: category._id,
    },
    description: categoryAndValue.description,
    chatId: msg.chat.id,
  });

  await sendMessage(
    msg.chat.id,
    `💸 Seu gasto foi registrado com sucesso.
        \n\n${categoryAndValue.description}\n💰 ${chat.moneyFormat.format(categoryAndValue.value)}\n${category.emoji} ${category.name}
        `,
  );
};
