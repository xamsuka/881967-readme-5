import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { usersConfigNamespace } from './users.config.namespace';

const DEFAULT_PORT = 27017;

export interface MongoConfig {
  name: string;
  username: string;
  password: string;
  host: string;
  port: number;
}

const validationSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  host: Joi.string().required(),
  port: Joi.number().port().default(DEFAULT_PORT),
});

function validateConfig(config: MongoConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(`[Mongo Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): MongoConfig {
  const config: MongoConfig = {
    name: process.env.MONGO_NAME,
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    host: process.env.MONGO_HOST,
    port: parseInt(process.env.MONGO_PORT ?? `${DEFAULT_PORT}`, 10),
  };

  validateConfig(config);
  return config;
}

export default registerAs(usersConfigNamespace.mongo, getConfig);
