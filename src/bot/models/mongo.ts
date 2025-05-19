import mongoose, {type Mongoose} from 'mongoose';
import {config} from '../utils/env';
import {logger} from '../utils/logger';

let conn: Promise<typeof mongoose> | null = null;

export const mongoConnect = async () => {
  if (conn == null) {
    logger.info('MongoDB connection is null, creating a new connection...');
    conn = mongoose
      .connect(config.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
      })
      .then(() => mongoose);

    await conn;
  }

  logger.info('MongoDB connection is established');

  return conn;
};
