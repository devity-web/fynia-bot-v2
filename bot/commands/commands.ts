import type TelegramBot from 'node-telegram-bot-api';
import {handleCurrency} from './currency';
import {handleHistory} from './history';
import {handleSummary} from './summary';
import {handleClear} from './clear';

interface Command {
  cmd: string;
  handle: (cmd: TelegramBot.Message, args?: string[]) => Promise<void>;
  description: string;
}

export const commands: Command[] = [
  {
    cmd: 'summary',
    handle: handleSummary,
    description: 'Show the summary of your month expenses',
  },
  {
    cmd: 'setup',
    handle: handleCurrency,
    description: 'Change your default currency',
  },
  {
    cmd: 'history',
    handle: handleHistory,
    description: 'Show the history of your expenses',
  },
  {
    cmd: 'clear',
    handle: handleClear,
    description: 'Clear your month expenses',
  },
];
