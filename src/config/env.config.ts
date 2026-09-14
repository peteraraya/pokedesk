
export const envConfig = () => ({
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3002,
  mongodbUrl: process.env.MONGODB_URL || '',
  defaultLimit: process.env.DEFAULT_LIMIT || 7,
});