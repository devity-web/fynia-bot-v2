import pino from 'pino';
import {config} from './env';

const transport = {
  target: 'pino-pretty',
  options: {
    colorize: true,
  },
};

const base = {
  env: config.ENV,
};

export const logger = pino({
  level: 'info',
  ...(config.ENV === 'dev' ? {transport} : {base}),
});
