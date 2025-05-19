import type {Chat} from '../models/chat';

const eurFormat = new Intl.NumberFormat('pt-PT', {
  style: 'currency',
  currency: 'EUR',
});

const brlFormat = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const usdFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const gbpFormat = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
});

const formats = {
  EUR: eurFormat,
  BRL: brlFormat,
  USD: usdFormat,
  GBP: gbpFormat,
};

export const getMoneyFormat = (chat: Chat) => {
  const format = formats[chat.currency as keyof typeof formats];

  if (!format) {
    throw new Error(`Formato de moeda ${chat.currency} não encontrado`);
  }

  return format;
};
