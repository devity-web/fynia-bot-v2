import {
  type HydratedDocument,
  type InferSchemaType,
  model,
  Schema,
} from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    emoji: {
      type: String,
      required: true,
    },
  },
  {timestamps: true},
);

export type Category = HydratedDocument<InferSchemaType<typeof categorySchema>>;

export const categoryModel = model<Category>('categories', categorySchema);
