import TokenModel from './../models/token';

export const createToken = async (token: string): Promise<void> => {
  try {
    const existingToken = await TokenModel.findOne({ token });
    if (!existingToken) {
      await TokenModel.create({ token });
      console.log(`Token initialized with zero requests`);
    }
    return;
  } catch (error) {
    console.error('Error creating token:', error);
    throw error;
  }
};

export const updateRequestCount = async (token: string, count: number): Promise<void> => {
  try {
    await TokenModel.findOneAndUpdate(
      { token },
      { $inc: { requestCount: count } }
    );
    return;
  } catch (error) {
    console.error('Error updating token:', error);
    throw error;
  }
};

export const getRequestCount = async (token: string): Promise<number> => {
  try {
    let tokenEntry = await TokenModel.findOne({ token });
    if (!tokenEntry) {
      await createToken(token);
      // Fetch the token entry again after creating it
      tokenEntry = await TokenModel.findOne({ token });
    }
    console.log('Request count:', tokenEntry.requestCount);
    return tokenEntry.requestCount;
  } catch (error) {
    console.error('Error getting request count:', error);
    throw error;
  }
};