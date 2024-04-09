import { getRequestCount, updateRequestCount } from './../services/token';
import { 
  API_TOKEN,
  ALLOWED_API_REQUESTS_PER_DAY,
} from '../config';

export const validateRequest = async () => {
  try {
    const requestCount = await getRequestCount(API_TOKEN);
    if (requestCount >= Number(ALLOWED_API_REQUESTS_PER_DAY)) {
      throw new Error('Request limit reached for token');
    }
    // If request limit not reached, update request count for the token
    await updateRequestCount(API_TOKEN, 1);
  } catch (error) {
    console.error('Error validating request limit:', error);
    throw error;
  }
};
