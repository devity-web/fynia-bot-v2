import {
  type HydratedDocument,
  type InferSchemaType,
  model,
  Schema,
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
  },
  {timestamps: true},
);

export type Chat = HydratedDocument<InferSchemaType<typeof chatSchema>>;

export const chatModel = model<Chat>('chats', chatSchema);
