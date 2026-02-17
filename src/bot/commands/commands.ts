import type {TelegramMessage} from '@/types/telegram';
import {handleClear} from './clear';
import {handleCurrency} from './currency';
import {handleHistory} from './history';
import {handleIncome} from './income';
import {handleSummary} from './summary';

interface Command {
  cmd: string;
  handle: (cmd: TelegramMessage, args?: string[]) => Promise<void>;
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
  {
    cmd: 'income',
    handle: handleIncome,
    description: 'Set your current income',
  },
];
