import mongoose, { Schema, Document } from 'mongoose';

export interface CoachDocument extends Document {
  name: string;
  dateOfBirth: Date | null;
  nationality: string;
  team: mongoose.Types.ObjectId[];
}

const coachSchema: Schema = new Schema({
  name: { type: String, required: false },
  dateOfBirth: { type: Date, required: false },
  nationality: { type: String, required: false },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true }
});

export default mongoose.model<CoachDocument>('Coach', coachSchema);