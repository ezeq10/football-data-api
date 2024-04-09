import mongoose, { Schema, Document } from 'mongoose';

export interface PlayerDocument extends Document {
  name: string;
  position: string;
  dateOfBirth: Date | null;
  nationality: string;
  team: mongoose.Types.ObjectId[];
}

const playerSchema: Schema = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  dateOfBirth: { type: Date, required: false },
  nationality: { type: String, required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true }
});

export default mongoose.model<PlayerDocument>('Player', playerSchema);