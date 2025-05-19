import {endOfMonth, format, startOfMonth} from 'date-fns';
import {categoryModel} from '../models/category';
import {expenseModel} from '../models/expense';
import {getChat} from '../use-case/get-chat';
import {getMonth} from '../use-case/get-month';
import {config} from '../utils/env';
import type {TelegramMessage} from '@/types/telegram';
import {sendMessage} from '../send';

export const handleSummary = async (msg: TelegramMessage) => {
  const chat = await getChat(msg.chat.id);

  const categories = await categoryModel.find();

  const {start, end} = getMonth();

  const expenses = await expenseModel
    .find({
      chatId: msg.chat.id,
      createdAt: {$gte: start, $lt: end},
    })
    .populate('category');

  const total = expenses.reduce((acc, expense) => acc + expense.value, 0);
  const group = categories.map(category => {
    const categoryExpenses = expenses.filter(expense =>
      expense.category._id.equals(category._id),
    );

    const value = categoryExpenses.reduce(
      (acc, expense) => acc + expense.value,
      0,
    );

    return {
      name: category.name,
      emoji: category.emoji,
      value,
    };
  });

  const summary = group
    .map(
      item =>
        `${item.emoji} ${item.name}: ${chat.moneyFormat.format(item.value)}`,
    )
    .join('\n');

  await sendMessage(
    msg.chat.id,
    `💸 Esse é o seu resumo de gastos.
    \n\n🗓️ ${format(start, config.DATE_FORMAT)} até ${format(end, config.DATE_FORMAT)}
    \n💰${chat.moneyFormat.format(total)}\n\n${summary}
    `,
  );
};
