import { Schema, model, Document } from 'mongoose';
import moment from 'moment';
interface TokenDocument extends Document {
  token: string;
  requestCount: number;
  expireAt: Date;
}

const tokenSchema = new Schema<TokenDocument>({
  token: { type: String, required: true },
  requestCount: { type: Number, default: 0 },
  expireAt: { type: Date, default: () => moment().endOf('day').toDate() } // Set expireAt to end of current day by default
});

const TokenModel = model<TokenDocument>('Token', tokenSchema);

export default TokenModel;