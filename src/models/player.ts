import mongoose, { Schema, Document } from 'mongoose';

export interface PlayerDocument extends Document {
  name: string;
  position: string;
  dateOfBirth: Date;
  nationality: string;
}

const playerSchema: Schema = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  nationality: { type: String, required: true }
});

export default mongoose.model<PlayerDocument>('Player', playerSchema);