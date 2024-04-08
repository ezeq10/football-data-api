import dotenv from 'dotenv';
dotenv.config();

export const { 
  MONGODB_URI,
  RATE_LIMIT_WINDOW_MS, 
  RATE_LIMIT_MAX_REQUESTS,
  API_URL,
} = process.env;
