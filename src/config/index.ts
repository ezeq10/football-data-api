import dotenv from 'dotenv';
dotenv.config();

export const API_URL = "https://api.football-data.org/v4";
export const ALLOWED_API_REQUESTS_PER_DAY = 20;

export const { 
  MONGODB_URI,
  API_TOKEN,
} = process.env;
