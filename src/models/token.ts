import { Schema, model, Document } from 'mongoose';

interface TokenDocument extends Document {
  token: string;
  requestCount: number;
}

const tokenSchema = new Schema<TokenDocument>({
  token: { type: String, required: true },
  requestCount: { type: Number, default: 0 }
});

const TokenModel = model<TokenDocument>('Token', tokenSchema);

export default TokenModel;