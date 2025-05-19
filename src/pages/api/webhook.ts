import {handleCallback} from '@/bot/callback';
import {commands} from '@/bot/commands/commands';
import {handleDefault} from '@/bot/commands/default';
import {mongoConnect} from '@/bot/models/mongo';
import {sendMessage} from '@/bot/send';
import {logger} from '@/bot/utils/logger';
import type {WebhookBody} from '@/types/telegram';
import type {NextApiRequest, NextApiResponse} from 'next';

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({message: 'Method not allowed'});
  }

  const body = req.body as WebhookBody;
  const msg = body.message;

  logger.info('Received message from webhook');
  logger.info(JSON.stringify(body));

  try {
    await mongoConnect();

    if (body.callback_query) {
      await handleCallback(body.callback_query);

      return res.status(200).json({message: 'ok'});
    }

    const handler = commands.find(cmd =>
      msg.text?.toLowerCase().startsWith(`/${cmd.cmd}`),
    );

    if (handler) {
      const args = msg.text?.split(' ').slice(1);
      await handler.handle(msg, args);

      return res.status(200).json({message: 'ok'});
    }

    await handleDefault(msg);

    return res.status(200).json({message: 'ok'});
  } catch (error) {
    logger.error(error);
    await sendMessage(
      msg.chat.id,
      'An error occurred while processing your request. Please try again later.',
    );
    return res.status(200).json({message: 'ok'});
  }
}
