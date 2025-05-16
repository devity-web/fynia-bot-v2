import {expenseModel} from '../models/expense';
import {format} from 'date-fns';
import {categoryModel} from '../models/category';
import {getChat} from '../use-case/get-chat';
import {getMonth} from '../use-case/get-month';
import {config} from '../utils/env';
import type {TelegramMessage} from '@/types/telegram';
import {sendMessage} from '../send';

export const handleHistory = async (msg: TelegramMessage, args?: string[]) => {
  const chat = await getChat(msg.chat.id);

  const {start, end} = getMonth();

  const categories =
    args && args.length > 0
      ? await categoryModel.find({
          name: new RegExp(`^${args[0]}`, 'i'),
        })
      : await categoryModel.find();

  const expenses = await expenseModel
    .find({
      chatId: msg.chat.id,
      createdAt: {$gte: start, $lt: end},
    })
    .sort({createdAt: -1});

  const group = categories.map(category => {
    const categoryExpenses = expenses.filter(expense =>
      expense.category._id.equals(category._id),
    );

    return {
      name: category.name,
      emoji: category.emoji,
      expenses: categoryExpenses,
    };
  });

  const summary = group
    .map(
      item =>
        `${item.emoji} ${item.name}\n\n${item.expenses.map(expense => `[${[format(expense.createdAt, 'dd/MM/yyyy HH:mm')]}] ${expense.description}: ${chat.moneyFormat.format(expense.value)}`).join('\n')}`,
    )
    .join('\n\n');

  sendMessage(
    msg.chat.id,
    `💰 Seu histórico de gastos:
      \n\n🗓️ ${format(start, config.DATE_FORMAT)} até ${format(end, config.DATE_FORMAT)}
      \n\n${summary}
      `,
  );
};
