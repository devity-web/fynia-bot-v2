import OpenAI from 'openai';
import {config} from './utils/env';
import {logger} from './utils/logger';

const openAi = new OpenAI({
  apiKey: config.DEEPSEEK_TOKEN,
  baseURL: 'https://api.deepseek.com/v1',
});

interface ClassifyResponse {
  value: number;
  category: string;
  description: string;
}

export const getCategoryAndValue = async (
  text: string,
): Promise<ClassifyResponse> => {
  logger.info('Received request to classify text');

  const createCompletion = await openAi.chat.completions.create({
    model: 'deepseek-chat',
    stream: false,
    messages: [
      {
        role: 'system',
        content: `Você é um agente de organização financeira.
                  Vou te enviar um texto com uma breve descrição de um gasto junto com o valor em EUROS.
                  Sua tarefa é classificar dentro da categoria que mais faz sentido, se não souber, escolha a opção "Outros".
                  As possiveis categorias são:
                  - Assinaturas
                  - Contas
                  - Moradia
                  - Mercado
                  - Saúde
                  - Lazer
                  - PETs
                  - Restaurantes e Delivery
                  - Outros
                  Responder no seguinte formato:
                  Formatar a descrição em uma frase curta capitalizando.
                  {"value": <valor gasto>, "category": <categoria>, "description": <descrição>}
                  `,
      },
      {
        role: 'user',
        content: text,
      },
    ],
  });

  const content = createCompletion.choices[0].message?.content;

  logger.info('Received response from openai');

  if (!content) {
    throw new Error('No content returned from OpenAI');
  }

  return JSON.parse(content.replace('```json', '').replace('```', ''));
};
