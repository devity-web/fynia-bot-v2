import {
  type HydratedDocument,
  type InferSchemaType,
  model,
  Schema,
} from 'mongoose';
import type {Category} from './category';

const expenseSchema = new Schema(
  {
    value: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      required: true,
    },
    chatId: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export type Expense = HydratedDocument<
  InferSchemaType<typeof expenseSchema>
> & {
  category: Category;
};

export const expenseModel = model<Expense>('expenses', expenseSchema);
