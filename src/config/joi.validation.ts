import * as Joi  from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB_URL: Joi.string().required(),
  PORT: Joi.number().default(3005),
  DEFAULT_LIMIT: Joi.number().default(6),
});