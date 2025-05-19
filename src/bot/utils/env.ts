import {z} from 'zod';

const envSchema = z.object({
  TELEGRAM_TOKEN: z.string(),
  OPENAI_TOKEN: z.string(),
  DEEPSEEK_TOKEN: z.string(),
  ENV: z.enum(['dev', 'prod']),
  MONGO_URI: z.string(),
  DATE_FORMAT: z.string().default('dd/MM/yyyy'),
});

export const config = envSchema.parse(process.env);
