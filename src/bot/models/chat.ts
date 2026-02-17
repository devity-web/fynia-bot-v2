import {
  type HydratedDocument,
  type InferSchemaType,
  Schema,
  model,
} from 'mongoose';

const chatSchema = new Schema(
  {
    chatId: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'EUR',
    },
    income: {
      type: Number,
      default: 0,
    },
  },
  {timestamps: true},
);

export type Chat = HydratedDocument<InferSchemaType<typeof chatSchema>>;

export const chatModel = model<Chat>('chats', chatSchema);
