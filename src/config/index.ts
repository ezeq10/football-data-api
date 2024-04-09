import dotenv from 'dotenv';
dotenv.config();

export const { 
  MONGODB_URI,
  API_URL,
  API_TOKEN,
  ALLOWED_API_REQUESTS_PER_DAY,
} = process.env;
